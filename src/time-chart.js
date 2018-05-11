import * as d3 from 'd3'
import * as domains from './utilities/data/domains'
import * as colors from './utilities/colors'
import { XAxisDate } from './components/common/axis-x'
import { YAxis } from './components/common/axis-y'
import ControlPanel from './components/common/control-panel'
import Actual from './components/time-chart/actual'
import Baseline from './components/time-chart/baseline'
import HistoricalLines from './components/time-chart/historical-lines'
import Observed from './components/time-chart/observed'
import Overlay from './components/time-chart/overlay'
import Prediction from './components/time-chart/prediction'
import TimeRect from './components/time-chart/timerect'
import Chart from './chart'
import { verifyTimeChartData } from './utilities/data/verify'
import { getTimeChartDataConfig } from './utilities/data/config'
import { filterActivePredictions } from './utilities/misc'
import * as ev from './events'

/**
 * Return points where the predictions were made
 * This is used as the first point in prediction marker
 */
function getPredictionInitPoints (observed) {
  return observed.map(d => {
    // Handle zero length values
    try {
      if (d.length !== 0) {
        return d.find(ld => ld.lag === 0).value
      } else {
        return null
      }
    } catch (e) {
      return null
    }
  })
}

export default class TimeChart extends Chart {
  constructor (element, options = {}) {
    let defaultConfig = {
      baseline: {
        text: 'Baseline',
        description: 'Baseline value',
        url: '#'
      },
      pointType: 'week',
      confidenceIntervals: []
    }

    let selection = d3.select(element)
        .attr('class', 'd3f-chart d3f-time-chart')
    super(selection, Object.assign({}, defaultConfig, options))

    // Initialize scales
    this.xScale = d3.scaleLinear().range([0, this.width])
    this.xScaleDate = d3.scaleTime().range([0, this.width])
    this.xScalePoint = d3.scalePoint().range([0, this.width])
    this.yScale = d3.scaleLinear().range([this.height, 0])

    this.yAxis = this.append(new YAxis(this.layout, {
      ...this.config.axes.y,
      tooltip: this.tooltip
    }))

    this.xAxis = this.append(new XAxisDate(this.layout, {
      ...this.config.axes.x,
      tooltip: this.tooltip
    }))

    this.timerect = this.append(new TimeRect(this.layout))
    this.overlay = this.append(new Overlay(this.layout, { tooltip: this.tooltip, uuid: this.uuid }))
    this.history = this.append(new HistoricalLines({ tooltip: this.tooltip }))
    this.baseline = this.append(new Baseline(this.layout, { ...this.config.baseline, tooltip: this.tooltip }))
    this.actual = this.append(new Actual())
    this.observed = this.append(new Observed())
    this.predictions = []
    this.cid = this.config.confidenceIntervals.length - 1

    let panelConfig = {
      ci: this.cid === -1 ? false : {
        idx: this.cid,
        values: this.config.confidenceIntervals
      },
      tooltip: this.tooltip,
      uuid: this.uuid
    }

    // Control panel
    this.controlPanel = new ControlPanel(panelConfig)
    this.selection.append(() => this.controlPanel.node)

    // Event subscriptions for control panel
    ev.addSub(this.uuid, ev.PANEL_MOVE_NEXT, (msg, data) => {
      let oldIdx = this.currentIdx
      this.moveForward()
      if (this.currentIdx !== oldIdx) {
        ev.publish(this.uuid, ev.JUMP_TO_INDEX, this.currentIdx)
      }
    })

    ev.addSub(this.uuid, ev.PANEL_MOVE_PREV, (msg, data) => {
      let oldIdx = this.currentIdx
      this.moveBackward()
      if (this.currentIdx !== oldIdx) {
        ev.publish(this.uuid, ev.JUMP_TO_INDEX, this.currentIdx)
      }
    })

    ev.addSub(this.uuid, ev.JUMP_TO_INDEX_INTERNAL, (msg, idx) => {
      let oldIdx = this.currentIdx
      this.update(idx)
      if (this.currentIdx !== oldIdx) {
        ev.publish(this.uuid, ev.JUMP_TO_INDEX, idx)
      }
    })

    ev.addSub(this.uuid, ev.LEGEND_ITEM, (msg, { id, state }) => {
      if (id === 'History') {
        this.history.hidden = !this.history.hidden
      } else if (id === 'Actual') {
        this.actual.hidden = !this.actual.hidden
      } else if (id === 'Observed') {
        this.observed.hidden = !this.observed.hidden
      } else {
        let predMarker = this.predictions.find(p => p.id === id)
        if (predMarker) {
          predMarker.hidden = !state
        }
      }
    })

    ev.addSub(this.uuid, ev.LEGEND_CI, (msg, { idx }) => {
      this.predictions.forEach(p => {
        this.cid = p.cid = idx
        p.update(this.currentIdx)
      })
    })
  }

  // plot data
  plot (data) {
    verifyTimeChartData(data)
    this.dataConfig = getTimeChartDataConfig(data, this.config)
    this.ticks = this.dataConfig.ticks

    if (this.config.axes.y.domain) {
      this.yScale.domain(this.config.axes.y.domain)
    } else {
      this.yScale.domain(domains.y(data, this.dataConfig))
    }
    this.xScale.domain(domains.x(data, this.dataConfig))
    this.xScaleDate.domain(domains.xDate(data, this.dataConfig))
    this.xScalePoint.domain(domains.xPoint(data, this.dataConfig))

    this.xAxis.plot(this.scales)
    this.yAxis.plot(this.scales)

    this.timerect.plot(this.scales)
    this.baseline.hidden = !this.dataConfig.baseline
    if (this.dataConfig.baseline) {
      this.baseline.plot(this.scales, data.baseline)
    }
    if (this.dataConfig.actual) {
      this.actual.plot(this.scales, data.actual)
    }
    if (this.dataConfig.observed) {
      this.observed.plot(this.scales, data.observed)
    }
    if (this.dataConfig.history) {
      this.history.plot(this.scales, data.history)
    }

    let totalModels = data.models.length
    let onsetDiff = (this.onsetHeight - 2) / (totalModels + 1)

    // Setup colors
    this.colors = colors.getColorMap(data.models.length)

    // Clear markers not needed
    this.predictions = filterActivePredictions(this.predictions, data.models)

    // Generate markers for predictions if not already there
    // Assume unique model ids
    data.models.forEach((m, idx) => {
      let predMarker
      let markerIndex = this.predictions.findIndex(p => p.id === m.id)
      if (markerIndex === -1) {
        // The marker is not present from previous calls to plot
        predMarker = new Prediction({
          id: m.id,
          meta: m.meta,
          color: this.colors[idx],
          onsetY: (idx + 1) * onsetDiff + this.height + 1,
          cid: this.cid,
          tooltip: this.tooltip,
          ...this.dataConfig.predictions
        })
        this.append(predMarker)
        this.predictions.push(predMarker)
      } else {
        predMarker = this.predictions[markerIndex]
      }
      // Find the starting points
      let initPoints = data.observed ? getPredictionInitPoints(data.observed) : null
      predMarker.plot(this.scales, m.predictions, initPoints)
    })

    this.controlPanel.plot(this.predictions, this.dataConfig)
    this.overlay.plot(this.scales, [this.actual, this.observed, ...this.predictions])

    // Hot start the chart
    this.currentIdx = 0
    this.update(this.currentIdx)
  }

  /**
   * Update marker position
   */
  update (idx) {
    if (idx !== this.currentIdx) {
      this.currentIdx = idx
      this.timerect.update(idx)
      this.predictions.forEach(p => { p.update(idx) })
      this.overlay.update(this.predictions)
      if (this.dataConfig.observed) {
        this.observed.update(idx)
      }
      this.controlPanel.update(this.predictions)
    }
  }

  /**
   * Move chart one step ahead
   */
  moveForward () {
    this.update(this.deltaIndex(1))
  }

  /**
   * Move chart one step back
   */
  moveBackward () {
    this.update(this.deltaIndex(-1))
  }
}
