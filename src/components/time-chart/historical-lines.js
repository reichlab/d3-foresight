import * as d3 from 'd3'
import * as tt from '../../utilities/tooltip'

/**
 * Historical lines
 */
export default class HistoricalLines {
  constructor (parent) {
    this.group = parent.svg.append('g')
      .attr('class', 'history-group')
    this.tooltip = parent.tooltip
  }

  plot (parent, historicalData) {
    this.clear()
    let tooltip = this.tooltip

    let line = d3.line()
        .x(d => parent.xScale(d.x))
        .y(d => parent.yScale(d.y))

    historicalData.map(hd => {
      let plottingData = hd.actual.map((data, idx) => {
        return {
          x: idx,
          y: data
        }
      })

      let path = this.group.append('path')
          .attr('class', 'line-history')
          .attr('id', hd.id + '-history')

      path.datum(plottingData)
        .transition()
        .duration(200)
        .attr('d', line)

      path.on('mouseover', function () {
        d3.select('.line-history.highlight')
          .datum(plottingData)
          .attr('d', line)
        tooltip.hidden = false
      }).on('mouseout', function () {
        d3.select('.line-history.highlight')
          .datum([])
          .attr('d', line)
        tooltip.hidden = true
      }).on('mousemove', function (event) {
        tooltip.render(tt.parseText({ text: hd.id }))
        tt.moveTooltip(tooltip, d3.select('.overlay'))
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
