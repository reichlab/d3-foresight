import * as d3 from 'd3'

/**
 * Historical lines
 */
export default class HistoricalLines {
  constructor (parent) {
    this.group = parent.svg.append('g')
      .attr('class', 'history-group')
    this.chartTooltip = parent.chartTooltip
  }

  plot (parent, data) {
    this.clear()
    let chartTooltip = this.chartTooltip

    let line = d3.line()
        .x(d => parent.xScale(d.week % 100))
        .y(d => parent.yScale(d.data))

    data.map(d => {
      let path = this.group.append('path')
          .attr('class', 'line-history')
          .attr('id', d.id + '-history')

      path.datum(d.actual)
        .transition()
        .duration(200)
        .attr('d', line)

      path.on('mouseover', function () {
        d3.select('.line-history.highlight')
          .datum(d.actual)
          .attr('d', line)
        chartTooltip.show()
      }).on('mouseout', function () {
        d3.select('.line-history.highlight')
          .datum([])
          .attr('d', line)
        chartTooltip.hide()
      }).on('mousemove', () => {
        chartTooltip.renderText(d.id)
        chartTooltip.move({
          x: d3.event.pageX,
          y: d3.event.pageY
        })
      })
    })

    // Add highlight overlay
    this.group.append('path')
      .attr('class', 'line-history highlight')
  }

  get hidden () {
    return this.group.style('visibility') === 'hidden'
  }

  set hidden (value) {
    this.group.style('visibility', value ? 'hidden' : null)
  }

  clear () {
    this.group.selectAll('*')
      .transition()
      .duration(200).remove()
  }
}
