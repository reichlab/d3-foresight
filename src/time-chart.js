// Chart plotting functions

import * as d3 from 'd3'
import * as mmwr from 'mmwr-week'
import * as utils from './utilities'
import * as commonComponents from './components/common'
import * as timeChartComponents from './components/time-chart'

export default class TimeChart {
  constructor (element, options = {}) {
    let defaultConfig = {
      baseline: {
        text: 'Baseline',
        description: 'Baseline value',
        url: '#'
      },
      axes: {
        x: {
          title: 'X',
          description: 'X axis',
          url: '#'
        },
        y: {
          title: 'Y',
          description: 'Y axis',
          url: '#'
        }
      }
    }
    this.config = Object.assign({}, defaultConfig, options)

    // Get div dimensions
    let elementSelection = d3.select(element)
        .attr('class', 'd3-foresight-timechart')

    let chartBB = elementSelection.node().getBoundingClientRect()
    let divWidth = chartBB.width
    let divHeight = 500

    // Height of onset panel above x axis
    let onsetHeight = 30

    // Create blank chart
    let margin = {
      top: 5, right: 50, bottom: 70 + onsetHeight, left: 40
    }
    let width = divWidth - margin.left - margin.right
    let height = divHeight - margin.top - margin.bottom

    // Initialize scales
    // This is the underlying continous scale. xScale wraps around this
    let _xScale = d3.scaleLinear()
        .range([0, width])
    let xScale
    // This is the main time scale
    let xScaleDate = d3.scaleTime()
        .range([0, width])
    // For ticks. Takes in discrete time points (not time indices)
    let xScalePoint = d3.scalePoint()
        .range([0, width])
    // The only linear yscale
    let yScale = d3.scaleLinear()
        .range([height, 0])

    // Add svg
    let svg = elementSelection.append('svg')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        .append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`)

    // Add tooltips
    this.chartTooltip = new commonComponents.ChartTooltip(elementSelection)
    this.infoTooltip = new commonComponents.InfoTooltip(elementSelection)

    // Save variables
    this.elementSelection = elementSelection
    this.svg = svg
    this._xScale = _xScale
    this.xScale = xScale
    this.xScaleDate = xScaleDate
    this.xScalePoint = xScalePoint
    this.yScale = yScale
    this.height = height
    this.width = width
    this.onsetHeight = onsetHeight
    this.eventHooks = []

    // Axes markers
    this.yAxis = new commonComponents.YAxis(this)
    this.xAxis = new commonComponents.XAxisDate(this)

    this.timerect = new timeChartComponents.TimeRect(this)
    this.overlay = new timeChartComponents.Overlay(this)

    this.history = new timeChartComponents.HistoricalLines(this)
    this.baseline = new timeChartComponents.Baseline(this)
    this.actual = new timeChartComponents.Actual(this)
    this.observed = new timeChartComponents.Observed(this)
    this.predictions = []

    this.confidenceIntervals = ['90%', '50%']
    this.cid = 1 // Use 50% as default

    this.predictionsShow = {}

    // Control panel
    this.controlPanel = new commonComponents.ControlPanel(this, (event, payload) => {
      if (event === 'legend:history') {
        // On history toggle action
        this.history.hidden = !this.history.hidden
      } else if (event === 'legend:ci') {
        // On ci change events
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

    // Update domains
    // TODO will need a fix when the structure changes
    yScale.domain([0, Math.min(13, utils.getYMax(data))])
    _xScale.domain([0, timePoints.length - 1])

    // TODO rely on the values being null
    let actualIndices = data.actual
        .filter(d => d.data !== -1)
        .map(d => timePoints.indexOf(d.week % 100))

    // Setup a discrete scale for ticks
    xScalePoint.domain(timePoints)

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

    // Week to date parser
    // TODO this will also work without actual
    xScaleDate.domain(d3.extent(data.actual.map(d => {
      let year = Math.floor(d.week / 100)
      let week = d.week % 100
      let mdate = new mmwr.MMWRDate(year, week)
      return mdate.toMomentDate()
    })))

    this.xAxis.plot(this)
    this.yAxis.plot(this)

    // TODO Simplify this
    let showNowLine = false
    // Use actualIndices as indicator of whether the season is current
    if (actualIndices.length < timePoints.length) {
      // Start at the latest prediction
      // TODO move this in utils
      this.currentIdx = Math
        .max(...data.models
             .map(m => {
               if (m.predictions.length === 0) return 0
               else {
                 return timePoints
                   .indexOf(m.predictions[m.predictions.length - 1].week % 100)
               }
             }))
      showNowLine = true
    } else {
      // Start at the oldest prediction
      let modelPredictions = data.models
          .map(m => {
            if (m.predictions.length === 0) return -1
            else {
              return timePoints.indexOf(m.predictions[0].week % 100)
            }
          }).filter(d => d !== -1)

      if (modelPredictions.length === 0) {
        // Start at the most recent actual data
        this.currentIdx = actualIndices[actualIndices.length - 1]
      } else {
        this.currentIdx = Math.min(...modelPredictions)
      }
    }

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

    // Prediction thing
    let totalModels = data.models.length
    let onsetDiff = (this.onsetHeight - 2) / (totalModels + 1)

    if (totalModels > 10) {
      this.colors = d3.schemeCategory20
    } else {
      this.colors = d3.schemeCategory10
    }

    // Filter markers not needed
    let currentPredictionIds = data.models.map(m => m.id)
    this.predictions = this.predictions.filter(p => {
      if (currentPredictionIds.indexOf(p.id) === -1) {
        p.clear()
        return false
      } else {
        return true
      }
    })

    // Collect values with zero lags
    // This is used as the first point of the prediction curves
    let zeroLagData = data.observed.map(d => {
      let dataToReturn = -1
      // Handle zero length values
      if (d.data.length !== 0) {
        dataToReturn = d.data.filter(ld => ld.lag === 0)[0].value
      }
      return {
        week: d.week,
        data: dataToReturn
      }
    })

    data.models.forEach((m, idx) => {
      // Add marker if not present
      let predMarker
      let markerIndex = this.predictions.map(p => p.id).indexOf(m.id)
      if (markerIndex === -1) {
        let onsetYPos = (idx + 1) * onsetDiff + this.height + 1
        predMarker = new timeChartComponents.Prediction(
          this,
          m.id,
          m.meta,
          this.colors[idx],
          onsetYPos
        )
        this.predictions.push(predMarker)

        if (!(m.id in this.predictionsShow)) this.predictionsShow[m.id] = true
      } else {
        predMarker = this.predictions[markerIndex]
      }
      predMarker.plot(this, m.predictions, zeroLagData)
      predMarker.hideMarkers()
    })

    // Update submission entries shown in control panel
    this.controlPanel.plot(this, (event, payload) => {
      // On prediction toggle action
      // payload is the value of `hide`
      let pred = this.predictions[this.predictions.map(p => p.id).indexOf(event)]
      this.predictionsShow[event] = !payload
      pred.legendHidden = payload

      if (payload) pred.hideMarkers()
      else pred.showMarkers()
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
