import * as errors from './utilities/errors'
import Tooltip from './components/common/tooltip'
import { Event } from './interfaces'
import * as ev from './events'

/**
 * Chart superclass
 */
export default class Chart {
  config: any
  width: number
  height: number
  svg: any
  tooltip: Tooltip
  selection: any
  onsetHeight: number
  hooks: { [name: string]: any[] }

  constructor (selection, onsetHeight, options = {}) {
    let defaultConfig = {
      axes: {
        x: {
          title: 'X',
          description: 'X axis',
          url: '#'
        },
        y: {
          title: 'Y',
          description: 'Y axis',
          url: '#'
        }
      },
      margin: {
        top: 5,
        right: 50,
        bottom: 70 + onsetHeight,
        left: 55
      }
    }
    this.config = (<any>Object).assign({}, defaultConfig, options)

    let chartBB = selection.node().getBoundingClientRect()
    let divWidth = chartBB.width
    let divHeight = 480

    // Create blank chart
    this.width = divWidth - this.config.margin.left - this.config.margin.right
    this.height = divHeight - this.config.margin.top - this.config.margin.bottom

    // Add svg
    this.svg = selection.append('svg')
      .attr('width', this.width + this.config.margin.left + this.config.margin.right)
      .attr('height', this.height + this.config.margin.top + this.config.margin.bottom)
      .append('g')
      .attr('transform', `translate(${this.config.margin.left},${this.config.margin.top})`)

    this.tooltip = new Tooltip()
    selection.append(() => this.tooltip.node)

    this.selection = selection
    this.onsetHeight = onsetHeight
  }

  plot (data) {}

  update (idx) {}

  /**
   * Append hook function if the hookName is supported and return subId
   */
  addHook (hookName: Event, fn): number {
    return ev.addSub(this, hookName, (msg, data) => fn(data))
  }

  /**
   * Remove specified subscription
   */
  removeHook (hookName: Event, subId: number) {
    ev.removeSub(this, hookName, subId)
  }

  /**
   * Append another component to svg
   */
  append (component) {
    this.svg.append(() => component.node)
    return component
  }
}
