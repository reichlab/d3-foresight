import * as commonComponents from './components/common'
import * as errors from './utilities/errors'

/**
 * Chart superclass
 */
export default class Chart {
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
      statsMeta: [],
      margin: {
        top: 5,
        right: 50,
        bottom: 70 + onsetHeight,
        left: 55
      }
    }
    this.config = Object.assign({}, defaultConfig, options)

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

    this.infoTooltip = new commonComponents.InfoTooltip(elementSelection)
    this.elementSelection = elementSelection
    this.onsetHeight = onsetHeight

    // Supported event hooks
    this.hooks = {
      'jump-to-index': [],
      'forward-index': [],
      'backward-index': []
    }
  }

  plot (data) {}

  update (idx) {}

  /**
   * Dispatch a hook
   */
  dispatchHook (hookName, data) {
    this.hooks[hookName].forEach(hf => hf(data))
  }

  /**
   * Append hook function if the hookName is supported
   */
  addHook (hookName, hookFunction) {
    if (hookName in this.hooks) {
      this.hooks[hookName].push(hookFunction)
    } else {
      throw new errors.HookNotUnderstoodException()
    }
    this.hooks[hookName] = this.hooks[hookName] || []
  }
}
