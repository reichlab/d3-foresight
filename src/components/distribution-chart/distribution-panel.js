import * as d3 from 'd3'
import { XAxis } from '../common/axis-x'
import { YAxis } from '../common/axis-y'
import Prediction from './prediction'
import * as utils from '../../utilities/distribution-chart'
import Overlay from './overlay'
import NoPredText from './no-pred-text'
import * as colors from '../../utilities/colors'

/**
 * A panel displaying distributions for one curve
 */
export default class DistributionPanel {
  constructor (svg, width, height, tooltip) {
    this.xScale = d3.scalePoint().range([0, width])
    this.yScale = d3.scaleLinear().range([height, 0])

    this.xAxis = new XAxis(
      svg,
      width,
      height,
      0,
      {},
      tooltip
    )
    this.yAxis = new YAxis(
      svg,
      height,
      0,
      {
        title: 'Probability',
        description: 'Probability assigned to x-axis bins'
      },
      tooltip
    )

    this.svg = svg
    this.height = height
    this.width = width
    this.predictions = []
    this.selectedCurveIdx = null
    this.tooltip = tooltip
    this.overlay = new Overlay(this)
    this.noPredText = new NoPredText(this)
  }

  plot (data, yLimits) {
    this.xScale.domain(utils.getXDomain(data, this.selectedCurveIdx))
    this.yScale.domain([0, yLimits[this.selectedCurveIdx]])

    this.xAxis.plot(this.xScale, 10)
    this.yAxis.plot(this.yScale, 5)

    // Setup colormap
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
      let markerIndex = this.predictions.map(p => p.id).indexOf(m.id)
      if (markerIndex === -1) {
        // The marker is not present from previous calls to plot
        predMarker = new Prediction(
          this.svg, m.id, m.meta, this.colors[idx]
        )
        this.predictions.push(predMarker)
      } else {
        predMarker = this.predictions[markerIndex]
      }
      predMarker.plot(this, m.curves[this.selectedCurveIdx])
    })

    // Check if all markers have noData. That means we can show NA text.
    this.noPredText.hidden = (this.predictions.filter(p => p.noData).length !== this.predictions.length)
  }
}
