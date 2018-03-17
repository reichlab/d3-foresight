/**
 * Row class in control panel
 */

/**
 * Doc guard
 */
import * as d3 from 'd3'
import { moveTooltipTo } from '../../../utilities/mouse'
import Component from '../../component'

/**
 * An item in the legend drawer.
 */
export default class DrawerRow extends Component {
  constructor (name, color) {
    super()

    this.id = name
    this.selection.attr('class', `item legend-item-${this.id}`)

    this.icon = this.selection.append('i')
      .style('color', color)
      .style('margin-right', '3px')

    this.selection.append('span')
      .attr('class', 'item-title')
      .text(name)
  }

  get active () {
    return this.icon.classed('icon-circle')
  }

  /**
   * Activate the row. Expected outcome is that the corresponding item
   * will be visible now.
   */
  set active (state) {
    this.icon.classed('icon-circle', state)
    this.icon.classed('icon-circle-empty', !state)
  }

  get na () {
    this.selection.classed('na')
  }

  /**
   * Not applicable, there is no data to show. The row is grayed out.
   */
  set na (state) {
    this.selection.classed('na', state)
  }

  addLink (url, tooltip) {
    this.urlIcon = this.selection.append('a')
      .attr('href', url)
      .attr('target', '_blank')
      .classed('item-url', true)
      .classed('icon-link-ext', true)

    this.urlIcon
      .on('mousemove', function () {
        d3.event.stopPropagation()
        tooltip.renderText({ text: 'Show details' })
        moveTooltipTo(tooltip, d3.select(this), 'left')
      })
      .on('click', () => d3.event.stopPropagation())
  }

  addOnClick (fn) {
    super.addOnClick()
    this.selection.on('click', () => {
      this.active = !this.active
      fn({ id: this.id, state: this.active })
    })
  }

  click () {
    this.selection.on('click')()
  }
}
