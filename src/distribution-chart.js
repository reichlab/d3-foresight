// Probability distribution chart

import * as d3 from 'd3'
// import * as distributionComponents from './components/distribution-chart'
import * as commonComponents from './components/common'

export default class DistributionChart {
  constructor (element, options = {}) {
    let defaultConfig = {
      title: 'Chart title',
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
        .attr('class', 'd3-foresight-distribution-chart')

    let chartBB = elementSelection.node().getBoundingClientRect()
    let divWidth = chartBB.width
    let divHeight = 500

    // Create blank chart
    let margin = {
      top: 5, right: 50, bottom: 70, left: 40
    }
    let width = divWidth - margin.left - margin.right
    let height = divHeight - margin.top - margin.bottom

    // Initialize scales
    let xScale = d3.scaleLinear()
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
    this.infoTooltip = new commonComponents.InfoTooltip(elementSelection)

    // Save variables
    this.elementSelection = elementSelection
    this.svg = svg
    this.xScale = xScale
    this.yScale = yScale
    this.height = height
    this.width = width

    // Axes markers
    this.yAxis = new commonComponents.YAxis(this)
    this.xAxis = new commonComponents.XAxis(this)

    this.predictions = []
    // Legend toggle state
    this.predictionsShow = {}

    // Control panel
    this.controlPanel = new commonComponents.ControlPanel(this, (event, payload) => {
      if (event === 'btn:next') {
        this.forward()
      } else if (event === 'btn:back') {
        this.backward()
      }
    })
  }

  /**
   * Plot the given distributions.
   * Takes in `actual` and `models` (a list of predictions)
   */
  plot (data) {
    let xScale = this.xScale
    let yScale = this.yScale

    let minX = Math.min(...data.models[0].x)
    let maxX = Math.max(...data.models[0].x)

    // Update domains
    // TODO Change the domain dynamically
    yScale.domain([0, 1])
    xScale.domain([minX, maxX])

    this.xAxis.plot(this)
    this.yAxis.plot(this)

    // Get meta data and statistics
    this.modelStats = data.models.map(m => m.stats)

    // Prediction thing
    let totalModels = data.models.length
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

    data.models.forEach((m, idx) => {
      // Add marker if not present
      let predMarker
      let markerIndex = this.predictions.map(p => p.id).indexOf(m.id)
      if (markerIndex === -1) {
        // TODO component for distribution chart
        // predMarker = new component
        this.predictions.push(predMarker)

        if (!(m.id in this.predictionsShow)) this.predictionsShow[m.id] = true
      } else {
        predMarker = this.predictions[markerIndex]
      }
      predMarker.plot()
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
}
