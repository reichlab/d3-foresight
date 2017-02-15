import * as util from './utils/timechart'
import * as marker from './markers/timechart/'
import textures from 'textures'
import * as mmwr from 'mmwr-week'
import * as d3 from 'd3'
import stringDefaults from './string-defaults.json'

export default class TimeChart {
  constructor (element, dataStore, options = {}) {
    this.config = Object.assign({}, stringDefaults, options)
    this.config.margin = Object.assign({}, {
      top: 5, right: 50, bottom: 70, left: 40
    }, options.margin)
    this.onsetHeight = 30
    this.config.margin.bottom = this.config.margin.bottom + this.onsetHeight
    this.data = dataStore
    this.container = d3.select(element)
        .attr('class', 'd3-foresight-timechart')
    this.setupDimentions()
    this.setupScales()
    this.setupSvg()
    this.setupTooltips()
    this.setupEmptyText()
    this.setupControlPanel()
    this.setupAxes()
    this.timerect = new marker.TimeRect(this)
    this.setupOnsetTexture()
    this.paintOnsetPanelOffset()
    this.setupOverlay()
    this.setupReverseAxis()
    this.history = new marker.HistoricalLines(this)
    this.baseline = new marker.Baseline(this)
    this.actual = new marker.Actual(this)
    this.observed = new marker.Observed(this)
    this.predictions = []
    this.weekHooks = []
    this.historyShow = true
    this.predictionsShow = {}
  }

  setupDimentions () {
    let divWidth = this.container.node().getBoundingClientRect().width
    let divHeight = 500
    this.height = divHeight - this.config.margin.top - this.config.margin.bottom
    this.width = divWidth - this.config.margin.left - this.config.margin.right
  }

  setupOnsetTexture () {
    this.onsetTexture = textures.lines()
      .lighter()
      .strokeWidth(0.5)
      .size(8)
      .stroke('#ccc')
    this.svg.call(this.onsetTexture)
  }

  setupSvg () {
    this.svg = this.container.append('svg')
        .attr('width', this.width + this.config.margin.left + this.config.margin.right)
        .attr('height', this.height + this.config.margin.top + this.config.margin.bottom)
        .append('g')
        .attr('transform', `translate(${this.config.margin.left},${this.config.margin.top})`)
  }

  setupScales () {
    this.xScale = d3.scaleLinear()
        .range([0, this.width])
    this.yScale = d3.scaleLinear()
        .range([this.height, 0])
    this.xScaleDate = d3.scaleTime()
        .range([0, this.width])
  }

  setupEmptyText () {
    this.noPredText = this.container.append('div')
      .attr('class', 'no-pred-text')
      .html(this.config.noPredText)
  }

  setupTooltips () {
    this.btnTooltip = this.container.append('div')
      .attr('class', 'd3-foresight-tooltip d3-foresight-btn-tooltip')
      .style('display', 'none')
    this.chartTooltip = this.container.append('div')
      .attr('class', 'd3-foresight-tooltip d3-foresight-chart-tooltip')
      .style('display', 'none')
    this.legendTooltip = this.container.append('div')
      .attr('class', 'd3-foresight-tooltip d3-foresight-legend-tooltip')
      .style('display', 'none')
    this.infoTooltip = this.container.append('div')
      .attr('class', 'd3-foresight-tooltip d3-foresight-info-tooltip')
      .style('display', 'none')
  }

  setupConfidenceIntervals () {
    this.confidenceIntervals = ['90%', '50%']
    this.cid = 1
  }

  setupControlPanel () {
    this.setupConfidenceIntervals()
    this.controlPanel = new marker.ControlPanel(this, (event, payload) => {
      if (event === 'legend:history') {
        this.historyShow = !this.historyShow
        if (this.historyShow) this.history.show()
        else {
          this.history.hide()
        }
      } else if (event === 'legend:ci') {
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

  setupAxes () {
    let svg = this.svg
    let width = this.width
    let height = this.height
    let onsetHeight = this.onsetHeight
    let config = this.config
    let infoTooltip = this.infoTooltip

    // Keep onset panel between xaxis and plot
    let xAxisPos = height + onsetHeight

    // Main axis with ticks below the onset panel
    svg.append('g')
      .attr('class', 'axis axis-x')
      .attr('transform', `translate(0,${xAxisPos})`)

    let axisXDate = svg.append('g')
        .attr('class', 'axis axis-x-date')
        .attr('transform', `translate(0,${xAxisPos + 25})`)

    let xText = axisXDate
        .append('text')
        .attr('class', 'title')
        .attr('text-anchor', 'start')
        .attr('transform', `translate(${width + 10},-15)`)

    xText.append('tspan')
      .text('Epidemic')
      .attr('x', 0)
    xText.append('tspan')
      .text('Week')
      .attr('x', 0)
      .attr('dy', '1em')

    xText.style('cursor', 'pointer')
      .on('mouseover', function () {
        infoTooltip
          .style('display', null)
      })
      .on('mouseout', function () {
        infoTooltip
          .style('display', 'none')
      })
      .on('mousemove', function () {
        infoTooltip
          .style('top', (d3.event.pageY - 15) + 'px')
          .style('left', (d3.event.pageX - 150 - 15) + 'px')
          .html(config.axesDesc.x)
      })
      .on('click', function () {
        window.open(config.axesUrl.x, '_blank')
      })

    svg.append('g')
      .attr('class', 'axis axis-y')
      .append('text')
      .attr('class', 'title')
      .attr('transform', `translate(-40 , ${height / 2}) rotate(-90)`)
      .attr('dy', '.71em')
      .style('text-anchor', 'middle')
      .text('Weighted ILI (%)')
      .style('cursor', 'pointer')
      .on('mouseover', function () {
        infoTooltip
          .style('display', null)
      })
      .on('mouseout', function () {
        infoTooltip
          .style('display', 'none')
      })
      .on('mousemove', function () {
        infoTooltip
          .style('top', d3.event.pageY + 'px')
          .style('left', (d3.event.pageX + 15) + 'px')
          .html(config.axesDesc.y)
      })
      .on('click', function () {
        window.open(config.axesUrl.y, '_blank')
      })
  }

  /**
   * Add x axis with only ticks above the onset panel
   */
  setupReverseAxis () {
    // Clone of axis above onset panel, without text
    this.svg.append('g')
      .attr('class', 'axis axis-x-ticks')
      .attr('transform', `translate(0, ${this.height})`)
  }

  /**
   * Setup overlay for mouse events
   */
  setupOverlay () {
    let svg = this.svg
    let height = this.height
    let onsetHeight = this.onsetHeight
    let width = this.width
    let tooltip = this.chartTooltip

    let chartHeight = height + onsetHeight

    // Add vertical line
    let line = svg.append('line')
        .attr('class', 'hover-line')
        .attr('x1', 0)
        .attr('y1', 0)
        .attr('x2', 0)
        .attr('y2', chartHeight)
        .style('display', 'none')

    // Add now line
    let nowGroup = svg.append('g')
        .attr('class', 'now-group')

    nowGroup.append('line')
      .attr('class', 'now-line')
      .attr('x1', 0)
      .attr('y1', 0)
      .attr('x2', 0)
      .attr('y2', chartHeight)
    nowGroup.append('text')
      .attr('class', 'now-text')
      .attr('transform', 'translate(15, 10) rotate(-90)')
      .style('text-anchor', 'end')
      .text('Today')

    this.nowGroup = nowGroup
    svg.append('rect')
      .attr('class', 'overlay')
      .attr('height', chartHeight)
      .attr('width', width)
      .on('mouseover', () => {
        line.style('display', null)
        tooltip.style('display', null)
      })
      .on('mouseout', () => {
        line.style('display', 'none')
        tooltip.style('display', 'none')
      })
  }

  paintOnsetPanelOffset () {
    this.svg.append('rect')
      .attr('class', 'onset-texture')
      .attr('height', this.onsetHeight)
      .attr('width', this.width)
      .attr('x', 0)
      .attr('y', this.height)
      .style('fill', this.onsetTexture.url())
  }

  plot () {
    let svg = this.svg
    let xScale = this.xScale
    let yScale = this.yScale
    let xScaleDate = this.xScaleDate
    let tooltip = this.chartTooltip
    let weekHooks = this.weekHooks

    // Reset scales and axes
    yScale.domain([0, Math.min(13, util.getYMax(this.data))])
    // Assuming actual data has all the weeks
    let weeks = this.data.actual.map(d => d.week % 100)

    let actualIndices = this.data.actual
        .filter(d => d.data !== -1)
        .map(d => weeks.indexOf(d.week % 100))
    xScale.domain([0, weeks.length - 1])

    // Setup a scale for ticks
    let xScalePoint = d3.scalePoint()
        .domain(weeks)
        .range([0, this.width])

    // Week domain scale for easy mapping
    let xScaleWeek = (d) => {
      let dInt = Math.floor(d)
      let dFloat = d % 1
      // [0, 1) point fix without changing the scale
      if (dInt === 0) dInt = Math.max(...weeks)
      if (dInt === 53) dInt = 1
      if (dInt === 29) dFloat = 0
      return xScale(weeks.indexOf(dInt) + dFloat)
    }

    // Week to date parser
    xScaleDate.domain(d3.extent(this.data.actual.map(d => {
      let year = Math.floor(d.week / 100)
      let week = d.week % 100
      return mmwr.MMWRWeekToDate(year, week).toDate()
    })))

    let xAxis = d3.axisBottom(xScalePoint)
        .tickValues(xScalePoint.domain().filter((d, i) => !(i % 2)))

    let xAxisReverseTick = d3.axisTop(xScalePoint)
        .tickValues(xScalePoint.domain().filter((d, i) => !(i % 2)))

    let xAxisDate = d3.axisBottom(xScaleDate)
        .ticks(d3.timeMonth)
        .tickFormat(d3.timeFormat('%b %y'))

    // Mobile view fix
    if (this.width < 420) {
      xAxisDate.ticks(2)
      xAxis.tickValues(xScalePoint.domain().filter((d, i) => !(i % 10)))
    }

    let yAxis = d3.axisLeft(yScale)

    svg.select('.axis-x')
      .transition().duration(200).call(xAxis)

    // Copy over ticks above the onsetpanel
    let tickOnlyAxis = svg.select('.axis-x-ticks')
        .transition().duration(200).call(xAxisReverseTick)

    tickOnlyAxis.selectAll('text').remove()

    svg.select('.axis-x-date')
      .transition().duration(200).call(xAxisDate)

    svg.select('.axis-y')
      .transition().duration(200).call(yAxis)

    // Save
    this.weeks = weeks
    this.actualIndices = actualIndices
    this.xScaleWeek = xScaleWeek

    // Use actualIndices as indicator of whether the season is current
    if (actualIndices.length < weeks.length) {
      // Start at the latest prediction
      this.weekIdx = Math
        .max(...this.data.models
             .map(m => {
               if (m.predictions.length === 0) return 0
               else {
                 return weeks
                   .indexOf(m.predictions[m.predictions.length - 1].week % 100)
               }
             }))

      // Display now line
      let nowPos = this.xScaleDate(new Date())
      this.nowGroup.select('.now-line')
        .attr('x1', nowPos)
        .attr('x2', nowPos)

      this.nowGroup.select('.now-text')
        .attr('dy', nowPos)

      this.nowGroup
        .style('display', null)
    } else {
      // Start at the oldest prediction
      let modelPredictions = this.data.models
          .map(m => {
            if (m.predictions.length === 0) return -1
            else {
              return weeks.indexOf(m.predictions[0].week % 100)
            }
          }).filter(d => d !== -1)

      if (modelPredictions.length === 0) {
        // Start at the most recent actual data
        this.weekIdx = this.actualIndices[this.actualIndices.length - 1]
      } else {
        this.weekIdx = Math.min(...modelPredictions)
      }

      this.nowGroup
        .style('display', 'none')
    }
    this.handleHook(weekHooks, this.weekIdx)
    this.timerect.plot(this, this.data.actual)
    this.baseline.plot(this, this.data.baseline)
    this.actual.plot(this, this.data.actual)
    this.observed.plot(this, this.data.observed)

    // Reset history lines
    this.history.plot(this, this.data.history)

    // Get meta data and statistics
    this.modelStats = this.data.models.map(m => m.stats)

    // Reset predictions
    let colors = d3.schemeCategory10

    let totalModels = this.data.models.length
    let onsetDiff = (this.onsetHeight - 2) / (totalModels + 1)

    // Filter markers not needed
    let currentPredictionIds = this.data.models.map(m => m.id)
    this.predictions = this.predictions.filter(p => {
      if (currentPredictionIds.indexOf(p.id) === -1) {
        p.clear()
        return false
      } else {
        return true
      }
    })

    // Collect values with zero lags for starting point of prediction markers
    let zeroLagData = this.data.observed.map(d => {
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

    this.data.models.forEach((m, idx) => {
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

    let that = this
    // Add mouse move and click events
    d3.select('.overlay')
      .on('mousemove', function () {
        let mouse = d3.mouse(this)
        // Snap x to nearest tick
        let index = Math.round(xScale.invert(mouse[0]))
        let snappedX = xScale(index)
        d3.select('.hover-line')
          .transition()
          .duration(50)
          .attr('x1', snappedX)
          .attr('x2', snappedX)
        tooltip
          .style('top', (d3.event.pageY + 15) + 'px')
          .style('left', (d3.event.pageX + 15) + 'px')
          .html(util.chartTooltip(that, index, mouse[1]))
      })
      .on('click', function () {
        that.handleHook(weekHooks, Math.round(xScale.invert(d3.mouse(this)[0])))
      })
  }

  /**
   * Helper method to call all functions of a hook
   */
  handleHook () {
    let hookArray = Array.prototype.shift.apply(arguments)
    hookArray.forEach((handler) => {
      handler.apply(null, arguments)
    })
  }

  /**
   * Update marker position
   */
  update (idx) {
    this.weekIdx = idx
    this.timerect.update(idx)
    this.predictions.forEach(p => {
      p.update(idx)
    })
    this.changePredictionTextVisibility()
    this.observed.update(idx)
    this.controlPanel.update(this.predictions)
  }

  changePredictionTextVisibility () {
    if (this.predictions.filter(p => p.hidden).length !== 0) {
      this.noPredText
        .transition()
        .duration(100)
        .style('display', null)
    } else {
      this.noPredText
        .transition()
        .duration(100)
        .style('display', 'none')
    }
  }
}
