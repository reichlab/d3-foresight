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
      }
    }
    this.config = Object.assign({}, defaultConfig, options)

    let chartBB = elementSelection.node().getBoundingClientRect()
    let divWidth = chartBB.width
    let divHeight = 500

    // Create blank chart
    let margin = {
      top: 5, right: 50, bottom: 70 + onsetHeight, left: 40
    }
    this.width = divWidth - margin.left - margin.right
    this.height = divHeight - margin.top - margin.bottom

    // Add svg
    this.svg = elementSelection.append('svg')
      .attr('width', this.width + margin.left + margin.right)
      .attr('height', this.height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`)

    this.infoTooltip = new commonComponents.InfoTooltip(elementSelection)
    this.elementSelection = elementSelection
    this.onsetHeight = onsetHeight
  }

  plot (data) {
  }

  update (idx) {
  }
}
