import * as d3 from 'd3'
import * as commonComponents from './components/common'
import * as distributionChartComponents from './components/distribution-chart'
import * as utils from './utilities/distribution-chart'
import Chart from './chart'

export default class DistributionChart extends Chart {
  constructor (element, options = {}) {
    let elementSelection = d3.select(element)
        .attr('class', 'd3-foresight-chart d3-foresight-distribution-chart')
    super(elementSelection, 0, options)

    // Initialize scales
    this.xScale = d3.scaleLinear().range([0, this.width])
    this.yScale = d3.scaleLinear().range([this.height, 0])

    this.yAxis = new commonComponents.YAxis(this)
    this.xAxis = new commonComponents.XAxis(this)

    this.actual = new distributionChartComponents.Actual(this)
    this.predictions = []

    let showStats = this.config.statsMeta.length > 0
    let panelConfig = {
      actual: true,
      observed: false,
      history: false,
      ci: false,
      stats: showStats
    }

    // Control panel
    this.controlPanel = new commonComponents.ControlPanel(
      this, panelConfig,
      (event, payload) => {
        if (event === 'btn:next') {
          this.forward()
        } else if (event === 'btn:back') {
          this.backward()
        }
      }
    )
  }

  // plot data
  plot (data) {
    this.xScale.domain(utils.getXDomain(data))
    this.yScale.domain(utils.getYDomain(data))

    this.xAxis.plot(this)
    this.yAxis.plot(this)

    // Update markers with data
    this.actual.plot(this, data.actual)

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
          this, m.id, m.meta, m.stats, this.colors[idx]
        )
        this.predictions.push(predMarker)
      } else {
        predMarker = this.predictions[markerIndex]
      }
      predMarker.plot(this, m.predictions)
    })

    // Update models shown in control panel
    this.controlPanel.plot(this.predictions, (predictionId, hidePrediction) => {
      let predMarker = this.predictions[this.predictions.map(p => p.id).indexOf(predictionId)]
      predMarker.hidden = hidePrediction
    })
  }
}
