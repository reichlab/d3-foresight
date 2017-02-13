import * as d3 from 'd3'

/**
 * Historical lines
 */
export class HistoricalLines {
  constructor (parent) {
    this.group = parent.svg.append('g')
      .attr('class', 'history-group')
    this.tooltip = parent.chartTooltip
  }

  plot (parent, data) {
    this.clear()
    if (parent.historyShow) this.show()
    else this.hide()

    let tooltip = this.tooltip

    let line = d3.line()
        .x(d => parent.xScaleWeek(d.week % 100))
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
        tooltip
          .style('display', null)
      }).on('mouseout', function () {
        d3.select('.line-history.highlight')
          .datum([])
          .attr('d', line)
        tooltip
          .style('display', 'none')
      }).on('mousemove', function () {
        tooltip
          .style('top', (d3.event.pageY + 15) + 'px')
          .style('left', (d3.event.pageX + 15) + 'px')
          .html(`<div class="point">${d.id}</div>`)
      })
    })
    this.addHighlightOverlay()
  }

  addHighlightOverlay () {
    this.group.append('path')
      .attr('class', 'line-history highlight')
  }

  hide () {
    this.group
      .style('visibility', 'hidden')
  }

  show () {
    this.group
      .style('visibility', null)
  }

  clear () {
    this.group.selectAll('*')
      .transition()
      .duration(200).remove()
  }
}
