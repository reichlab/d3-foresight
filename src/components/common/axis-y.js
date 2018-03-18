import * as d3 from 'd3'
import * as tt from '../../utilities/tooltip'

/**
 * Simple linear Y axis with informative label
 */
export class YAxis {
  constructor (svg, height, xOffset, axisConfig, tooltip) {
    let axis = svg.append('g')
        .attr('class', 'axis axis-y')
        .attr('transform', `translate(${xOffset}, 0)`)

    axis.append('text')
      .attr('transform', `translate(-45 , ${height / 2}) rotate(-90)`)
      .attr('dy', '.71em')
      .style('text-anchor', 'middle')
      .text(axisConfig.title)
      .style('cursor', 'pointer')
      .on('mouseover', () => { tooltip.hidden = false })
      .on('mouseout', () => { tooltip.hidden = true })
      .on('mousemove', function () {
        tooltip.render(tt.parseText({ text: axisConfig.description }))
        tt.moveTooltip(tooltip, d3.select('.overlay'))
      })
      .on('click', () => {
        window.open(axisConfig.url, '_blank')
      })

    this.svg = svg
  }

  plot (yScale, maxTicks) {
    let yAxis = d3.axisLeft(yScale).tickFormat(d3.format('.2f'))
    if (maxTicks) yAxis.ticks(maxTicks)
    this.svg.select('.axis-y')
      .transition().duration(200).call(yAxis)
  }
}
