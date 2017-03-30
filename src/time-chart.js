import * as d3 from 'd3'
import * as utils from './utilities/time-chart'
import * as commonComponents from './components/common'
import * as timeChartComponents from './components/time-chart'
import Chart from './chart'

export default class TimeChart extends Chart {
  constructor (element, options = {}) {
    let defaultConfig = {
      baseline: {
        text: 'Baseline',
        description: 'Baseline value',
        utl: '#'
      }
    }

    let elementSelection = d3.select(element)
        .attr('class', 'd3-foresight-chart d3-foresight-time-chart')
    super(elementSelection, 30, Object.assign({}, defaultConfig, options))

    // Initialize scales
    // This is the underlying continous scale. xScale wraps around this
    this._xScale = d3.scaleLinear().range([0, this.width])
    this.xScale = null
    // This is the main time scale
    this.xScaleDate = d3.scaleTime().range([0, this.width])
    // For ticks. Takes in discrete time points (not time indices)
    this.xScalePoint = d3.scalePoint().range([0, this.width])
    this.yScale = d3.scaleLinear().range([this.height, 0])

    this.yAxis = new commonComponents.YAxis(this)
    this.xAxis = new commonComponents.XAxisDate(this)

    this.timeChartTooltip = new commonComponents.TimeChartTooltip(elementSelection)
    this.timerect = new timeChartComponents.TimeRect(this)
    this.overlay = new timeChartComponents.Overlay(this)
    this.history = new timeChartComponents.HistoricalLines(this)
    this.baseline = new timeChartComponents.Baseline(this)
    this.actual = new timeChartComponents.Actual(this)
    this.observed = new timeChartComponents.Observed(this)
    this.predictions = []
    this.eventHooks = []

    this.confidenceIntervals = ['90%', '50%']
    this.cid = 1 // Use 50% as default

    // Control panel
    this.controlPanel = new commonComponents.ControlPanel(this, (event, payload) => {
      if (event === 'legend:history') {
        this.history.hidden = !this.history.hidden
      } else if (event === 'legend:ci') {
        // payload is `cid`
        this.predictions.map(p => {
          this.cid = p.cid = payload
          p.update(this.currentIdx)
        })
      } else if (event === 'btn:next') {
        this.forward()
      } else if (event === 'btn:back') {
        this.backward()
      }
    })
  }

  // plot data
  plot (data) {
    let _xScale = this._xScale
    let xScaleDate = this.xScaleDate
    let xScalePoint = this.xScalePoint
    let yScale = this.yScale

    // Assuming actual data has all the weeks
    // TODO This could be taken from the non-actual data
    // Also, the name should be changed
    let timePoints = data.actual.map(d => d.week % 100)
    let actualIndices = data.actual.filter(d => d.data)
        .map(d => timePoints.indexOf(d.week % 100))

    // Update domains
    // TODO will need a fix when the structure changes
    yScale.domain(utils.getYDomain(data))
    _xScale.domain([0, timePoints.length - 1])

    // Setup a discrete scale for ticks
    xScalePoint.domain(utils.getXPointDomain(data))
    xScaleDate.domain(utils.getXDateDomain(data))

    // Wrapper around _xscale to handle edge cases
    this.xScale = d => {
      let dInt = Math.floor(d)
      let dFloat = d % 1
      // [0, 1) point fix without changing the scale
      if (dInt === 0) dInt = Math.max(...timePoints)
      if (dInt === 53) dInt = 1
      if (dInt === 29) dFloat = 0
      return _xScale(timePoints.indexOf(dInt) + dFloat)
    }

    this.xAxis.plot(this)
    this.yAxis.plot(this)

    // Check if it is live data
    let showNowLine = actualIndices.length < timePoints.length
    this.currentIdx = utils.getFirstPlottingIndex(data, showNowLine)
    this.overlay.plot(this, showNowLine)

    this.handleHook({
      type: 'positionUpdate',
      value: this.currentIdx
    })

    this.timePoints = timePoints
    this.actualIndices = actualIndices

    // Update markers with data
    this.timerect.plot(this, data.actual)
    this.baseline.plot(this, data.baseline)
    this.actual.plot(this, data.actual)
    this.observed.plot(this, data.observed)

    // Reset history lines
    this.history.plot(this, data.history)

    // Get meta data and statistics
    this.modelStats = data.models.map(m => m.stats)

    let totalModels = data.models.length
    let onsetDiff = (this.onsetHeight - 2) / (totalModels + 1)

    // Setup colors
    if (totalModels > 10) {
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
    this.controlPanel.plot(this, (predictionId, hidePrediction) => {
      let predMarker = this.predictions[this.predictions.map(p => p.id).indexOf(predictionId)]
      predMarker.hidden = hidePrediction
    })
  }

  /**
   * Helper method to call all hooks
   * @param data dictionary with event type key `type` and corresponding
   * value `value`
   */
  handleHook (data) {
    this.eventHooks.forEach(hook => hook(data))
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
  forward () {
    this.update(Math.min(this.currentIdx + 1, this.actualIndices[this.actualIndices.length - 1]))
  }

  /**
   * Move chart one step back
   */
  backward () {
    this.update(Math.max(this.currentIdx - 1, this.actualIndices[0]))
  }
}
