import * as d3 from 'd3'

/**
 * Observed (at the time of prediction) line
 */
export default class Observed {
  constructor (parent) {
    let group = parent.svg.append('g')
        .attr('class', 'observed-group')

    group.append('path')
      .attr('class', 'line-observed')

    this.group = group
  }

  plot (parent, observedData) {
    // Save data for queries and updates
    this.observedData = observedData
    this.xScale = parent.xScale
    this.yScale = parent.yScale
  }

  update (idx) {
    let filteredData = []

    try {
      for (let i = 0; i <= idx; i++) {
        let yLags = this.observedData[idx - i].slice().filter(d => d.lag <= i)
        filteredData.push({
          x: idx - i,
          y: yLags.sort((a, b) => (b.lag - a.lag))[0].value
        })
      }
    } catch (e) {
      filteredData = []
    }

    let circles = this.group.selectAll('.point-observed')
        .data(filteredData)

    circles.exit().remove()

    circles.enter().append('circle')
      .merge(circles)
      .attr('class', 'point-observed')
      .transition()
      .duration(200)
      .ease(d3.easeQuadOut)
      .attr('cx', d => this.xScale(d.x))
      .attr('cy', d => this.yScale(d.y))
      .attr('r', 2)

    let line = d3.line()
        .x(d => this.xScale(d.x))
        .y(d => this.yScale(d.y))

    this.group.select('.line-observed')
      .datum(filteredData)
      .transition()
      .duration(200)
      .attr('d', line)

    filteredData.reverse()
    this.filteredData = filteredData
  }

  query (idx) {
    try {
      return this.filteredData[idx].y
    } catch (e) {
      return false
    }
  }
}
