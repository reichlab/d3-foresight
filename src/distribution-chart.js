import * as d3 from 'd3'
import * as commonComponents from './components/common'
import * as distributionChartComponents from './components/distribution-chart'

export default class DistributionChart {
  constructor (element, options = {}) {
    let defaultConfig = {
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
        .attr('class', 'd3-foresight-chart d3-foresight-distribution-chart')

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
    let yScale = d3.scaleLinear()
        .range([height, 0])

    // Add svg
    let svg = elementSelection.append('svg')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        .append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`)

    // Add tooltips
    this.timeChartTooltip = new commonComponents.TimeChartTooltip(elementSelection)
    this.infoTooltip = new commonComponents.InfoTooltip(elementSelection)

    // Save variables
    this.elementSelection = elementSelection
    this.svg = svg
    this.xScale = xScale
    this.yScale = yScale
    this.height = height
    this.width = width

    this.yAxis = new commonComponents.YAxis(this)
    this.xAxis = new commonComponents.XAxis(this)

    this.overlay = new distributionChartComponents.Overlay(this)
    this.actual = new distributionChartComponents.Actual(this)
    this.predictions = []

    // Control panel
    this.controlPanel = new commonComponents.ControlPanel(this, (event, payload) => {
      if (event === 'btn:next') {
        console.log(event)
      } else if (event === 'btn:back') {
        console.log(event)
      }
    })
  }

  // plot data
  plot (data) {
    // TODO Setup domains

    this.xAxis.plot(this)
    this.yAxis.plot(this)

    // Update markers with data
    this.actual.plot(this, data.actual)

    // Get meta data and statistics
    this.modelStats = data.models.map(m => m.stats)

    // Setup colors
    if (data.models.length > 10) {
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
        predMarker = new distributionChartComponents.Prediction(
          this, m.id, m.meta, this.colors[idx]
        )
        this.predictions.push(predMarker)
      } else {
        predMarker = this.predictions[markerIndex]
      }
      predMarker.plot(this, m.data)
    })

    // Update models shown in control panel
    this.controlPanel.plot(this, (predictionId, hidePrediction) => {
      let predMarker = this.predictions[this.predictions.map(p => p.id).indexOf(predictionId)]
      predMarker.hidden = hidePrediction
    })
  }
}
