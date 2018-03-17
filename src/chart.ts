import * as errors from './utilities/errors'
import { InfoTooltip } from './components/common'
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
  infoTooltip: InfoTooltip
  elementSelection: any
  onsetHeight: number
  hooks: { [name: string]: any[] }

  constructor (elementSelection, onsetHeight, options = {}) {
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

    let chartBB = elementSelection.node().getBoundingClientRect()
    let divWidth = chartBB.width
    let divHeight = 480

    // Create blank chart
    this.width = divWidth - this.config.margin.left - this.config.margin.right
    this.height = divHeight - this.config.margin.top - this.config.margin.bottom

    // Add svg
    this.svg = elementSelection.append('svg')
      .attr('width', this.width + this.config.margin.left + this.config.margin.right)
      .attr('height', this.height + this.config.margin.top + this.config.margin.bottom)
      .append('g')
      .attr('transform', `translate(${this.config.margin.left},${this.config.margin.top})`)

    this.infoTooltip = new InfoTooltip(elementSelection)
    this.elementSelection = elementSelection
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
}
