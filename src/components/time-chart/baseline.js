import * as d3 from 'd3'
import * as tt from '../../utilities/tooltip'

/**
 * Baseline
 */
export default class Baseline {
  constructor (parent) {
    let config = parent.config
    let tooltip = parent.tooltip

    let group = parent.svg.append('g')
      .attr('class', 'baseline-group')

    group.append('line')
      .attr('x1', 0)
      .attr('y1', parent.height)
      .attr('x2', parent.width)
      .attr('y2', parent.height)
      .attr('class', 'baseline')

    let text = group.append('text')
        .attr('transform', `translate(${parent.width + 10}, 0)`)

    // Setup multiline text
    let baselineText = config.baseline.text
    if (Array.isArray(baselineText)) {
      text.append('tspan')
        .text(baselineText[0])
        .attr('x', 0)
      baselineText.slice(1).forEach(txt => {
        text.append('tspan')
          .text(txt)
          .attr('x', 0)
          .attr('dy', '1em')
      })
    } else {
      text.append('tspan')
        .text(baselineText)
        .attr('x', 0)
    }

    text.style('cursor', 'pointer')
      .on('mouseover', () => { tooltip.hidden = false })
      .on('mouseout', () => { tooltip.hidden = true })
      .on('mousemove', () => {
        tooltip.render(tt.parseText({ text: config.baseline.description }))
        tt.moveTooltip(tooltip, d3.select('.overlay'), 'left')
      })
      .on('click', () => {
        window.open(config.baseline.url, '_blank')
      })

    this.group = group
  }

  plot (parent, baselineData) {
    if (baselineData) this.show()
    else {
      this.hide()
      return
    }

    this.group.select('.baseline')
      .transition()
      .duration(200)
      .attr('y1', parent.yScale(baselineData))
      .attr('y2', parent.yScale(baselineData))

    this.group.select('text')
      .transition()
      .duration(200)
      .attr('dy', parent.yScale(baselineData))
  }

  // Hide baseline
  hide () {
    this.group
      .style('visibility', 'hidden')
  }

  // Show baseline
  show () {
    this.group
      .style('visibility', null)
  }
}
