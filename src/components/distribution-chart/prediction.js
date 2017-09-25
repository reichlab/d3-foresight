import * as d3 from 'd3'

/**
 * Prediction marker for distribution chart
 */
export default class Prediction {
  constructor (svg, id, meta, color) {
    // Prediction group
    let predictionGroup = svg.append('g')
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

  plot (parent, curveData) {
    if (curveData.data === null) {
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

      let line = d3.line()
          .x(d => parent.xScale(d[0]))
          .y(d => parent.yScale(d[1]))

      this.predictionGroup.select('.line-prediction')
        .datum(curveData.data)
        .transition()
        .duration(200)
        .attr('d', line)

      let area = d3.area()
          .x(d => parent.xScale(d[0]))
          .y1(d => parent.yScale(0))
          .y0(d => parent.yScale(d[1]))

      this.predictionGroup.select('.area-prediction')
        .datum(curveData.data)
        .transition()
        .duration(200)
        .attr('d', area)
    }
    this.displayedData = curveData.data
  }

  query (index) {
    return (!this.noData && !this.hidden && this.displayedData[index])
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
}
