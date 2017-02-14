import * as d3 from 'd3'

/**
 * Actual line
 */
export default class Actual {
  constructor (parent) {
    this.group = parent.svg.append('g')
        .attr('class', 'actual-group')
    this.group.append('path')
      .attr('class', 'line-actual')
  }

  plot (parent, data) {
    let line = d3.line()
        .x(d => parent.xScaleWeek(d.week % 100))
        .y(d => parent.yScale(d.data))
    this.data = data
    this.group.select('.line-actual')
      .datum(this.data.filter(d => d.data !== -1))
      .transition()
      .duration(200)
      .attr('d', line)
    let circles = this.group.selectAll('.point-actual')
        .data(this.data.filter(d => d.data !== -1))
    circles.exit().remove()
    circles.enter().append('circle')
      .merge(circles)
      .attr('class', 'point-actual')
      .transition(200)
      .ease(d3.easeQuadOut)
      .attr('cx', d => parent.xScaleWeek(d.week % 100))
      .attr('cy', d => parent.yScale(d.data))
      .attr('r', 2)
  }

  query (idx) {
    return this.data[idx].data
  }
}

