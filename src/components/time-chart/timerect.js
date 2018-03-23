import SComponent from '../s-component'

/**
 * Time rectangle for navigation guidance
 */
export default class TimeRect extends SComponent {
  constructor () {
    super()
    this.rect = this.selection.append('rect')
      .attr('x', 0)
      .attr('y', 0)
      .attr('width', 0)
      .attr('height', 0)
      .attr('class', 'timerect')
  }

  plot (parent) {
    this.xScale = parent.xScale
    this.rect.attr('height', parent.height)
  }

  update (idx) {
    this.rect
      .transition()
      .duration(200)
      .attr('width', this.xScale(idx))
  }
}
