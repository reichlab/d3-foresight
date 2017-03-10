// Chart plotting functions

import * as util from './utils'
import * as mmwr from 'mmwr-week'
import * as d3 from 'd3'
import * as marker from './markers'

export default class TimeChart {
  constructor (element, options = {}) {
    // Parse config passed
    // TODO: Improve style considering markers @lepisma
    let defaults = {
      axesDesc: {
        x: `Week of the calendar year, as measured by the CDC.
            <br><br><em>Click to know more</em>`,
        y: `Percentage of outpatient doctor visits for influenza-like
            illness, weighted by state population.<br><br><em>Click to know
            more</em>`
      },
      axesUrl: {
        x: 'https://wwwn.cdc.gov/nndss/document/MMWR_Week_overview.pdf',
        y: 'http://www.cdc.gov/flu/weekly/overview.htm'
      },
      noPredText: 'Predictions not available <br> for selected week'
    }
    this.config = Object.assign({}, defaults, options)

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
    let xScale = d3.scaleLinear()
        .range([0, width])
    let xScaleDate = d3.scaleTime()
        .range([0, width])
    let yScale = d3.scaleLinear()
        .range([height, 0])

    // Add svg
    let svg = elementSelection.append('svg')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        .append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`)

    // Add tooltips
    // TODO: Merge separate tooltips
    this.chartTooltip = elementSelection.append('div')
      .attr('class', 'd3-foresight-tooltip d3-foresight-chart-tooltip')
      .style('display', 'none')

    this.legendTooltip = elementSelection.append('div')
      .attr('class', 'd3-foresight-tooltip d3-foresight-legend-tooltip')
      .style('display', 'none')

    this.infoTooltip = elementSelection.append('div')
      .attr('class', 'd3-foresight-tooltip d3-foresight-info-tooltip')
      .style('display', 'none')

    this.btnTooltip = elementSelection.append('div')
      .attr('class', 'd3-foresight-tooltip d3-foresight-btn-tooltip')
      .style('display', 'none')

    // Save variables
    this.elementSelection = elementSelection
    this.svg = svg
    this.xScale = xScale
    this.xScaleDate = xScaleDate
    this.yScale = yScale
    this.height = height
    this.width = width
    this.onsetHeight = onsetHeight
    this.eventHooks = []

    // Add marker primitives
    this.timerect = new marker.TimeRect(this)

    // Axes markers
    this.yAxis = new marker.YAxis(this)
    this.xAxis = new marker.XAxis(this)

    this.overlay = new marker.Overlay(this)

    this.history = new marker.HistoricalLines(this)
    this.baseline = new marker.Baseline(this)
    this.actual = new marker.Actual(this)
    this.observed = new marker.Observed(this)
    this.predictions = []
    // Hard coding confidence values as of now
    // This and currently selected id should ideally go in the vuex store
    this.confidenceIntervals = ['90%', '50%']
    this.cid = 1 // Use 50% as default

    // Legend toggle state
    this.historyShow = true
    this.predictionsShow = {}

    // Control panel
    this.controlPanel = new marker.ControlPanel(this, (event, payload) => {
      if (event === 'legend:history') {
        // On history toggle action
        // payload is `hide`
        this.historyShow = !this.historyShow
        if (this.historyShow) this.history.show()
        else this.history.hide()
      } else if (event === 'legend:ci') {
        // On ci change events
        // payload is `cid`
        this.predictions.map(p => {
          this.cid = p.cid = payload
          p.update(this.weekIdx)
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
    let xScale = this.xScale
    let xScaleDate = this.xScaleDate
    let yScale = this.yScale

    // Assuming actual data has all the weeks
    let weeks = data.actual.map(d => d.week % 100)

    // Update domains
    yScale.domain([0, Math.min(13, util.getYMax(data))])

    let actualIndices = data.actual
        .filter(d => d.data !== -1)
        .map(d => weeks.indexOf(d.week % 100))
    xScale.domain([0, weeks.length - 1])

    // Setup a scale for ticks
    this.xScalePoint = d3.scalePoint()
      .domain(weeks)
      .range([0, this.width])

    // Week domain scale for easy mapping
    this.xScaleWeek = d => {
      let dInt = Math.floor(d)
      let dFloat = d % 1
      // [0, 1) point fix without changing the scale
      if (dInt === 0) dInt = Math.max(...weeks)
      if (dInt === 53) dInt = 1
      if (dInt === 29) dFloat = 0
      return xScale(weeks.indexOf(dInt) + dFloat)
    }

    // Week to date parser
    xScaleDate.domain(d3.extent(data.actual.map(d => {
      let year = Math.floor(d.week / 100)
      let week = d.week % 100
      return mmwr.MMWRWeekToDate(year, week).toDate()
    })))

    this.xAxis.plot(this)
    this.yAxis.plot(this)

    let showNowLine = false
    // Use actualIndices as indicator of whether the season is current
    if (actualIndices.length < weeks.length) {
      // Start at the latest prediction
      this.weekIdx = Math
        .max(...data.models
             .map(m => {
               if (m.predictions.length === 0) return 0
               else {
                 return weeks
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
              return weeks.indexOf(m.predictions[0].week % 100)
            }
          }).filter(d => d !== -1)

      if (modelPredictions.length === 0) {
        // Start at the most recent actual data
        this.weekIdx = actualIndices[actualIndices.length - 1]
      } else {
        this.weekIdx = Math.min(...modelPredictions)
      }
    }

    this.overlay.plot(this, showNowLine)

    // TODO
    this.handleHook({
      type: 'weekUpdate',
      value: this.weekIdx
    })

    this.weeks = weeks
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

    // Reset predictions
    let colors = d3.schemeCategory10

    let totalModels = data.models.length
    let onsetDiff = (this.onsetHeight - 2) / (totalModels + 1)

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

    // Collect values with zero lags for starting point of prediction markers
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
        predMarker = new marker.Prediction(
          this,
          m.id,
          m.meta,
          colors[idx],
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
    // Change self index
    this.weekIdx = idx
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
   * TODO implement this for control panel
   */
  forward () {
  }

  /**
   * Move chart one step back
   */
  backward () {
  }
}
