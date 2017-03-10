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

  plot (parent, data) {
    // Save data for queries and updates
    // TODO replace with something simpler in the timechart end
    this.data = data
    this.xScale = parent.xScaleWeek
    this.yScale = parent.yScale
    this.weeks = parent.weeks
  }

  query (idx) {
    try {
      return this.filteredData[idx].data
    } catch (e) {
      return false
    }
  }

  update (idx) {
    let filteredData = []

    for (let i = 0; i <= idx; i++) {
      filteredData.push({
        week: this.data[idx - i].week,
        data: this.data[idx - i].data.filter(d => d.lag === i)[0].value
      })
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
      .attr('cx', d => this.xScale(d.week % 100))
      .attr('cy', d => this.yScale(d.data))
      .attr('r', 2)

    let line = d3.line()
        .x(d => this.xScale(d.week % 100))
        .y(d => this.yScale(d.data))

    this.group.select('.line-observed')
      .datum(filteredData)
      .transition()
      .duration(200)
      .attr('d', line)

    filteredData.reverse()
    this.filteredData = filteredData
  }
}
