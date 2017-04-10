import * as d3 from 'd3'
import * as commonComponents from '../common'
// import Actual from './actual'
import Prediction from './prediction'
import * as utils from '../../utilities/distribution-chart'

/**
 * A panel displaying distributions for one target
 */
export default class DistributionPanel {
  constructor (svg, width, height, infoTooltip) {
    this.xScale = d3.scaleLinear().range([0, width])
    this.yScale = d3.scaleLinear().range([height, 0])

    this.xAxis = new commonComponents.XAxis(
      svg,
      width,
      height,
      0,
      {},
      infoTooltip
    )
    this.yAxis = new commonComponents.YAxis(
      svg,
      height,
      0,
      {},
      infoTooltip
    )

    // this.actual = new Actual(this)
    this.predictions = []
    // List of targets to display
    this.targets = []
    this.selectedTargetIdx = 0
  }

  plot (data) {
    // Populate list of targets using the first model
    this.targets = data.models[0].targets.map(t => t.name)

    this.xScale.domain(utils.getXDomain(data), this.selectedTargetIdx)
    this.yScale.domain(utils.getYDomain(data), this.selectedTargetIdx)

    this.xAxis.plot(this.xScale)
    this.yAxis.plot(this.yScale)

    // Update markers with data
    // this.actual.plot(this, data.actual)

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
        predMarker = new Prediction(
          this, m.id, m.meta, m.stats, this.colors[idx]
        )
        this.predictions.push(predMarker)
      } else {
        predMarker = this.predictions[markerIndex]
      }
      predMarker.plot(this, m.predictions)
    })
  }
}
