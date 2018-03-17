import * as d3 from 'd3'
import { moveTooltipTo } from '../utilities/mouse'

/**
 * Generic class for a component
 */
export default class Component {
  constructor () {
    this.div = d3.select(document.createElement('div'))
  }

  /**
   * Return d3 selection for main div
   */
  get selection () {
    return this.div
  }

  /**
   * Return HTML node for d3.append
   */
  get node () {
    return this.selection.node()
  }

  /**
   * General css display based hidden prop
   */
  get hidden () {
    return this.selection.style('display') === 'none'
  }

  set hidden (state) {
    this.selection.style('display', state ? 'none' : null)
  }

  /**
   * Add an on hover tooltip
   */
  addTooltip (data, tooltip, direction = 'right') {
    this.selection
      .on('mouseover', () => tooltip.show())
      .on('mouseout', () => tooltip.hide())
      .on('mousemove', function () {
        tooltip.renderText(data)
        moveTooltipTo(tooltip, d3.select(this), direction)
      })
  }

  /**
   * Make pointer cursor. Rest is handled by subclasses.
   */
  addOnClick () {
    this.selection.style('cursor', 'pointer')
  }
}
