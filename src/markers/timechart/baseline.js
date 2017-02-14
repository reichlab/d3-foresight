/**
 * Baseline
 */
export default class Baseline {
  constructor (parent) {
    this.group = parent.svg.append('g')
      .attr('class', 'baseline-group')

    this.group.append('line')
      .attr('x1', 0)
      .attr('y1', parent.height)
      .attr('x2', parent.width)
      .attr('y2', parent.height)
      .attr('class', 'baseline')

    let text = this.group.append('text')
        .attr('class', 'title')
        .attr('transform', `translate(${parent.width + 10}, 0)`)
    text.append('tspan')
      .text('CDC')
      .attr('x', 0)
    text.append('tspan')
      .text('Baseline')
      .attr('x', 0)
      .attr('dy', '1em')
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

  hide () {
    this.group.style('visibility', 'hidden')
  }

  show () {
    this.group.style('visibility', null)
  }
}
