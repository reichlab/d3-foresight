/**
 * Row class in control panel
 */

/**
 * Doc guard
 */
import * as d3 from 'd3'
import { moveTooltipTo } from '../../../utilities/mouse'

/**
 * An item in the legend drawer.
 */
export default class DrawerRow {
  constructor (name, color) {
    this.id = name

    this.div = d3.select(document.createElement("div"))
      .attr('class', `item legend-item-${this.id}`)

    this.icon = this.div.append('i')
      .style('color', color)
      .text('●')

    this.div.append('span')
      .attr('class', 'item-title')
      .text(name)
  }

  get node () {
    return this.div.node()
  }

  get selection () {
    return this.div
  }

  get active () {
    return this.icon.text() === '●'
  }

  set active (state) {
    this.icon.text(state ? '●' : '○')
  }

  get hidden () {
    return this.selection.style('display') === 'none'
  }

  set hidden (state) {
    this.selection.style('display', state ? 'none' : null)
  }

  addTooltip (data, tooltip) {
    this.selection
      .on('mouseover', () => tooltip.show())
      .on('mouseout', () => tooltip.hide())
      .on('mousemove', function () {
        tooltip.renderText(data)
        moveTooltipTo(tooltip, d3.select(this), 'left')
      })
  }

  addLink (url, tooltip) {
    this.urlIcon = this.selection.append('a')
      .attr('href', url)
      .attr('target', '_blank')
      .attr('class', 'item-url')
      .text('🔗')

    this.urlIcon
      .on('mousemove', function () {
        d3.event.stopPropagation()
        tooltip.renderText({ text: 'Show details' })
        moveTooltipTo(tooltip, d3.select(this), 'left')
      })
      .on('click', () => d3.event.stopPropagation())
  }

  addToggle (fn) {
    this.selection.style('cursor', 'pointer')

    this.selection.on('click', () => {
      this.active = !this.active
      fn({ id: this.id, state: this.active })
    })
  }

  toggle () {
    this.selection.on('click')()
  }
}
