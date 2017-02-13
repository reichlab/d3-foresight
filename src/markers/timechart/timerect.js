/**
 * Time rectangle for navigation guidance
 */
export default class TimeRect {
  constructor (parent) {
    this.rect = parent.svg.append('rect')
      .attr('x', 0)
      .attr('y', 0)
      .attr('width', 0)
      .attr('height', parent.height)
      .attr('class', 'timerect')
  }

  plot (parent, data) {
    this.data = data
    this.scale = parent.xScaleWeek
  }

  update (idx) {
    this.rect
      .transition()
      .duration(200)
      .attr('width', this.scale(this.data[idx].week % 100))
  }
}
