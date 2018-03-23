import * as d3 from 'd3'
import * as tt from '../../utilities/tooltip'
import SComponent from '../s-component'

/**
 * Baseline
 */
export default class Baseline extends SComponent {
  constructor (config, tooltip) {
    super()
    this.selection.attr('class', 'baseline-group')

    this.line = this.selection.append('line')
      .attr('x1', 0)
      .attr('y1', 0)
      .attr('x2', 0)
      .attr('y2', 0)
      .attr('class', 'baseline')

    this.text = this.selection.append('text')

    // Setup multiline text
    if (Array.isArray(config.text)) {
      this.text.append('tspan')
        .text(config.text[0])
        .attr('x', 0)
      config.text.slice(1).forEach(txt => {
        this.text.append('tspan')
          .text(txt)
          .attr('x', 0)
          .attr('dy', '1em')
      })
    } else {
      this.text.append('tspan')
        .text(config.text)
        .attr('x', 0)
    }

    this.text.style('cursor', 'pointer')
      .on('mouseover', () => { tooltip.hidden = false })
      .on('mouseout', () => { tooltip.hidden = true })
      .on('mousemove', () => {
        tooltip.render(tt.parseText({ text: config.description }))
        tt.moveTooltip(tooltip, d3.select('.overlay'), 'left')
      })
      .on('click', () => {
        window.open(config.url, '_blank')
      })
  }

  plot (parent, baseline) {
    if (baseline) {
      this.hidden = false
    } else {
      this.hidden = true
      return
    }

    this.line
      .transition()
      .duration(200)
      .attr('y1', parent.yScale(baseline))
      .attr('x2', parent.width)
      .attr('y2', parent.yScale(baseline))

    this.text
      .transition()
      .duration(200)
      .attr('transform', `translate(${parent.width + 10}, 0)`)
      .attr('dy', parent.yScale(baseline))
  }
}
