import * as d3 from 'd3'

/**
 * Prediction marker with following components
 * - Area
 * - Line and dots
 * - Onset
 * - Peak
 */
export default class Prediction {
  constructor (parent, id, meta, color) {
    // Prediction group
    let predictionGroup = parent.svg.append('g')
        .attr('class', 'prediction-group')
        .attr('id', id + '-marker')

    predictionGroup.append('path')
      .attr('class', 'area-prediction')
      .style('fill', color)

    predictionGroup.append('path')
      .attr('class', 'line-prediction')
      .style('stroke', color)

    this.predictionGroup = predictionGroup

    this.color = color
    this.id = id
    this.meta = meta
    // Tells if the prediction is hidden by some other component
    this._hidden = false
    // Tells if data is available to be shown for current time
    this.noData = true
  }

  plot (parent, modelData) {
    if (modelData.x.length === null) {
      // There is no data for current point, hide the markers without
      // setting exposed hidden flag
      this.noData = true
      this.hideMarkers()
    } else {
      this.noData = false
      if (!this.hidden) {
        // No one is hiding me
        this.showMarkers()
      }

      let plottingData = modelData.x.map((px, idx) => {
        return {
          x: px,
          y: modelData.y[idx]
        }
      })

      let line = d3.line()
          .curve(d3.curveBasis)
          .x(d => parent.xScale(d.x))
          .y(d => parent.yScale(d.y))

      this.predictionGroup.select('.line-prediction')
        .datum(plottingData)
        .transition()
        .duration(200)
        .attr('d', line)

      let area = d3.area()
          .curve(d3.curveBasis)
          .x(d => parent.xScale(d.x))
          .y1(d => parent.yScale(0))
          .y0(d => parent.yScale(d.y))

      this.predictionGroup.select('.area-prediction')
        .datum(plottingData)
        .transition()
        .duration(200)
        .attr('d', area)
    }
  }

  /**
   * Check if we are hidden
   */
  get hidden () {
    return this._hidden
  }

  set hidden (hide) {
    if (hide) {
      this.hideMarkers()
    } else {
      if (!this.noData) {
        this.showMarkers()
      }
    }
    this._hidden = hide
  }

  hideMarkers () {
    this.predictionGroup.style('visibility', 'hidden')
  }

  showMarkers () {
    this.predictionGroup.style('visibility', null)
  }

  /**
   * Remove the markers
   */
  clear () {
    this.predictionGroup.remove()
  }

  /**
   * Ask if we have something to show at the index
   */
  query (idx) {
    // Don't show anything if predictions are hidden
    return (!this.noData && !this.hidden && this.displayedData[idx])
  }
}
