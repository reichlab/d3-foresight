import * as d3 from 'd3'

/**
 * Baseline
 */
export default class Baseline {
  constructor (parent) {
    let config = parent.config
    let infoTooltip = parent.infoTooltip

    let group = parent.svg.append('g')
      .attr('class', 'baseline-group')

    group.append('line')
      .attr('x1', 0)
      .attr('y1', parent.height)
      .attr('x2', parent.width)
      .attr('y2', parent.height)
      .attr('class', 'baseline')

    let text = group.append('text')
        .attr('class', 'title')
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
      .on('mouseover', () => infoTooltip.show())
      .on('mouseout', () => infoTooltip.hide())
      .on('mousemove', () => {
        infoTooltip.renderText({
          title: null,
          text: config.baseline.description
        })
        infoTooltip.move({
          x: d3.event.pageX,
          y: d3.event.pageY
        }, 'left')
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
      .duration(300)
      .attr('y1', parent.yScale(baselineData))
      .attr('y2', parent.yScale(baselineData))

    this.group.select('.title')
      .transition()
      .duration(300)
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
