import * as d3 from 'd3'
import * as utils from './utilities/time-chart'
import * as misc from './utilities/misc'
import * as errors from './utilities/errors'
import * as commonComponents from './components/common'
import * as timeChartComponents from './components/time-chart'
import Chart from './chart'

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

    let elementSelection = d3.select(element)
        .attr('class', 'd3-foresight-chart d3-foresight-time-chart')
    super(elementSelection, 30, Object.assign({}, defaultConfig, options))

    // Initialize scales
    this.xScale = d3.scaleLinear().range([0, this.width])
    this.xScaleDate = d3.scaleTime().range([0, this.width])
    this.xScalePoint = d3.scalePoint().range([0, this.width])
    this.yScale = d3.scaleLinear().range([this.height, 0])

    this.yAxis = new commonComponents.YAxis(
      this.svg,
      this.height,
      0,
      this.config.axes.y,
      this.infoTooltip
    )
    this.xAxis = new commonComponents.XAxisDate(
      this.svg,
      this.width,
      this.height,
      0,
      this.onsetHeight,
      this.config.axes.x,
      this.infoTooltip
    )

    this.timeChartTooltip = new commonComponents.TimeChartTooltip(elementSelection)
    this.timerect = new timeChartComponents.TimeRect(this)
    this.overlay = new timeChartComponents.Overlay(this)
    this.history = new timeChartComponents.HistoricalLines(this)
    this.baseline = new timeChartComponents.Baseline(this)
    this.actual = new timeChartComponents.Actual(this)
    this.observed = new timeChartComponents.Observed(this)
    this.predictions = []
    this.cid = this.config.confidenceIntervals.length - 1

    let showCi = this.cid !== -1
    let panelConfig = {
      actual: true,
      observed: true,
      history: true,
      ci: showCi
    }

    // Control panel
    this.controlPanel = new commonComponents.ControlPanel(
      this,
      panelConfig,
      (event, payload) => {
        if (event === 'legend:history') {
          this.history.hidden = !this.history.hidden
        } else if (event === 'legend:ci') {
          this.predictions.forEach(p => {
            this.cid = p.cid = payload
            p.update(this.currentIdx)
          })
        } else if (event === 'btn:next') {
          this.moveForward()
          this.dispatchHook('forward-index')
        } else if (event === 'btn:back') {
          this.moveBackward()
          this.dispatchHook('backward-index')
        }
      }
    )
  }

  // plot data
  plot (data) {
    this.timePoints = data.timePoints
    if (this.config.pointType.endsWith('-week')) {
      this.ticks = this.timePoints.map(tp => tp.week)
    } else {
      throw new errors.UnknownPointTypeException()
    }

    this.actualIndices = data.actual.map((d, idx) => {
      return (d ? idx : null)
    }).filter(d => d !== null)

    // Update domains
    this.yScale.domain(utils.getYDomain(data))
    this.xScale.domain(utils.getXDomain(this.timePoints))
    this.xScaleDate.domain(utils.getXDateDomain(this.timePoints, this.config.pointType))
    this.xScalePoint.domain(this.ticks)

    this.xAxis.plot(this.xScalePoint, this.xScaleDate)
    this.yAxis.plot(this.yScale)

    // Check if it is live data
    let showNowLine = this.actualIndices.length < this.timePoints.length
    this.overlay.plot(this, showNowLine)

    // Update markers with data
    this.timerect.plot(this)
    this.baseline.plot(this, data.baseline)
    this.actual.plot(this, data.actual)
    this.observed.plot(this, data.observed)

    // Reset history lines
    this.history.plot(this, data.history)

    let totalModels = data.models.length
    let onsetDiff = (this.onsetHeight - 2) / (totalModels + 1)

    // Setup colors
    if (data.models.length > 30) {
      this.colors = misc.colors50
    } else if (data.models.length > 20) {
      this.colors = misc.colors30
    } else if (data.models.length > 10) {
      this.colors = d3.schemeCategory20
    } else {
      this.colors = d3.schemeCategory10
    }

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
      let markerIndex = this.predictions.map(p => p.id).indexOf(m.id)
      if (markerIndex === -1) {
        // The marker is not present from previous calls to plot
        let onsetYPos = (idx + 1) * onsetDiff + this.height + 1
        predMarker = new timeChartComponents.Prediction(
          this, m.id, m.meta, this.colors[idx], onsetYPos
        )
        this.predictions.push(predMarker)
      } else {
        predMarker = this.predictions[markerIndex]
      }
      predMarker.plot(
        this,
        m.predictions,
        utils.getPredictionStartingPoints(data)
      )
    })

    // Update models shown in control panel
    this.controlPanel.plot(this.predictions, (predictionId, hidePrediction) => {
      let predMarker = this.predictions[this.predictions.map(p => p.id).indexOf(predictionId)]
      predMarker.hidden = hidePrediction
    })

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
    this.predictions.forEach(p => {
      p.update(idx)
    })
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
