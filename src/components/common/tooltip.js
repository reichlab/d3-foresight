import Component from '../component'

/**
 * Tooltip
 */
export default class Tooltip extends Component {
  constructor () {
    super()

    this.selection
      .attr('class', `d3-foresight-tooltip`)
      .style('display', 'none')

    this.offset = 15
  }

  get width () {
    return this.node.getBoundingClientRect().width
  }

  move (position, direction = 'right') {
    this.selection
      .style('top', (position.y + this.offset) + 'px')
      .style('left', (position.x + (direction === 'right' ? this.offset : -this.width - this.offset)) + 'px')
  }

  render (html) {
    this.selection.html(html)
  }
}
