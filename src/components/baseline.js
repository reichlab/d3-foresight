/**
 * Baseline
 */
export default class Baseline {
  constructor (parent) {
    // TODO take text
    let group = parent.svg.append('g')
      .attr('class', 'baseline-group')

    group.append('line')
      .attr('x1', 0)
      .attr('y1', parent.height)
      .attr('x2', parent.width)
      .attr('y2', parent.height)
      .attr('class', 'baseline')

    let text = group.append('text')
        .attr('class', 'title')
        .attr('transform', `translate(${parent.width + 10}, 0)`)
    text.append('tspan')
      .text('CDC')
      .attr('x', 0)
    text.append('tspan')
      .text('Baseline')
      .attr('x', 0)
      .attr('dy', '1em')

    this.group = group
  }

  plot (parent, data) {
    if (data) this.show()
    else {
      this.hide()
      return
    }

    this.group.select('.baseline')
      .transition()
      .duration(300)
      .attr('y1', parent.yScale(data))
      .attr('y2', parent.yScale(data))

    this.group.select('.title')
      .transition()
      .duration(300)
      .attr('dy', parent.yScale(data))
  }

  // Hide baseline
  hide () {
    this.group
      .style('visibility', 'hidden')
  }

  // Show baseline
  show () {
    this.group
      .style('visibility', null)
  }
}
