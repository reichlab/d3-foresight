export default class Actual {
  constructor (parent) {
    let group = parent.svg.append('g')
      .attr('class', 'actual-group')

    group.append('line')
      .attr('x1', 0)
      .attr('x2', 0)
      .attr('y1', 0)
      .attr('y2', parent.height)
      .attr('class', 'actual')

    this.group = group
  }

  plot (actualData, xScale) {
    if (actualData) this.show()
    else {
      this.hide()
      return
    }

    this.group.select('.actual')
      .transition()
      .duration(300)
      .attr('x1', xScale(actualData))
      .attr('x2', xScale(actualData))
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
