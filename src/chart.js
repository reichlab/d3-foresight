import * as commonComponents from './components/common'

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
  }

  plot (data) {
  }

  update (idx) {
  }
}
