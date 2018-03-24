import * as d3 from 'd3'
import * as utils from './utilities/time-chart'
import * as colors from './utilities/colors'
import * as errors from './utilities/errors'
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
import * as ev from './events'

export default class TimeChart extends Chart {
  constructor (element, options = {}) {
    let defaultConfig = {
      baseline: {
        text: 'Baseline',
        description: 'Baseline value',
        url: '#'
      },
      pointType: 'regular-week',
      confidenceIntervals: []
    }

    let selection = d3.select(element)
        .attr('class', 'd3-foresight-chart d3-foresight-time-chart')
    super(selection, 30, Object.assign({}, defaultConfig, options))

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
      actual: true,
      observed: true,
      history: true,
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
    ev.addSub(this.uuid, ev.MOVE_NEXT, (msg, data) => {
      this.moveForward()
      ev.publish(this.uuid, ev.FORWARD_INDEX)
    })

    ev.addSub(this.uuid, ev.MOVE_PREV, (msg, data) => {
      this.moveBackward()
      ev.publish(this.uuid, ev.BACKWARD_INDEX)
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

  /**
   * Return layout related parameters
   */
  get layout () {
    return {
      width: this.width,
      height: this.height,
      totalHeight: this.height + this.onsetHeight
    }
  }

  get scales () {
    return {
      xScale: this.xScale,
      xScaleDate: this.xScaleDate,
      xScalePoint: this.xScalePoint,
      ticks: this.ticks,
      yScale: this.yScale
    }
  }

  // plot data
  plot (data) {
    verifyTimeChartData(data)

    this.timePoints = data.timePoints
    if (this.config.pointType.endsWith('-week')) {
      this.ticks = this.timePoints.map(tp => tp.week)
    } else {
      throw new errors.UnknownPointType()
    }

    this.actualIndices = data.actual.map((d, idx) => {
      return (d ? idx : null)
    }).filter(d => d !== null)

    // Update domains
    this.yScale.domain(utils.getYDomain(data))
    this.xScale.domain(utils.getXDomain(this.timePoints))
    this.xScaleDate.domain(utils.getXDateDomain(this.timePoints, this.config.pointType))
    this.xScalePoint.domain(this.ticks)

    this.xAxis.plot(this.scales)
    this.yAxis.plot(this.scales)

    // Update markers with data
    this.timerect.plot(this.scales)
    this.baseline.plot(this.scales, data.baseline)
    this.actual.plot(this.scales, data.actual)
    this.observed.plot(this.scales, data.observed)

    // Reset history lines
    this.history.plot(this.scales, data.history)

    let totalModels = data.models.length
    let onsetDiff = (this.onsetHeight - 2) / (totalModels + 1)

    // Setup colors
    this.colors = colors.getColorMap(data.models.length)

    // Clear markers not needed
    let currentPredictionIds = data.models.map(m => m.id)
    this.predictions = this.predictions.filter(p => {
      if (currentPredictionIds.indexOf(p.id) === -1) {
        p.clear()
        return false
      } else {
        return true
      }
    })

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
          tooltip: this.tooltip
        })
        this.append(predMarker)
        this.predictions.push(predMarker)
      } else {
        predMarker = this.predictions[markerIndex]
      }
      predMarker.plot(this.scales, m.predictions, utils.getPredictionStartingPoints(data))
    })

    // Update models shown in control panel
    this.controlPanel.plot(this.predictions)

    // Check if it is live data
    let showNowLine = this.actualIndices.length < this.timePoints.length
    this.overlay.plot(this.scales, showNowLine, [this.actual, this.observed, ...this.predictions])

    // Hot start the chart
    this.currentIdx = 0
    this.update(this.currentIdx)
  }

  /**
   * Update marker position
   */
  update (idx) {
    this.currentIdx = idx
    this.timerect.update(idx)
    this.predictions.forEach(p => { p.update(idx) })
    this.overlay.update(this.predictions)
    this.observed.update(idx)
    this.controlPanel.update(this.predictions)
  }

  /**
   * Move chart one step ahead
   */
  moveForward () {
    this.update(Math.min(this.currentIdx + 1, this.actualIndices[this.actualIndices.length - 1]))
  }

  /**
   * Move chart one step back
   */
  moveBackward () {
    this.update(Math.max(this.currentIdx - 1, this.actualIndices[0]))
  }
}
