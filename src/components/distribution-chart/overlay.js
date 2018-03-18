import * as d3 from 'd3'
import * as tt from '../../utilities/tooltip'
import * as utils from '../../utilities/distribution-chart'

export default class Overlay {
  constructor (parent) {
    let svg = parent.svg
    let height = parent.height
    let width = parent.width
    let tooltip = parent.tooltip
    let xScale = parent.xScale

    // Add mouse hover line
    let line = svg.append('line')
        .attr('class', 'hover-line')
        .attr('x1', 0)
        .attr('y1', 0)
        .attr('x2', 0)
        .attr('y2', height)
        .style('display', 'none')

    svg.append('rect')
      .attr('class', 'overlay')
      .attr('height', height)
      .attr('width', width)
      .on('mouseover', () => {
        line.style('display', null)
        tooltip.hidden = false
      })
      .on('mouseout', () => {
        line.style('display', 'none')
        tooltip.hidden = true
      })
      .on('mousemove', function () {
        let mouse = d3.mouse(this)
        // Snap x to nearest tick
        let index = Math.round(mouse[0] / xScale.range()[1] * xScale.domain().length)
        let snappedX = xScale(xScale.domain()[index])

        // Move the cursor
        line
          .transition()
          .duration(50)
          .attr('x1', snappedX)
          .attr('x2', snappedX)

        // Format bin value to display
        let binVal = utils.formatBin(xScale.domain(), index)

        tooltip.render(tt.parsePredictions({
          title: `Bin: ${binVal}`,
          predictions: parent.predictions,
          index
        }))

        // Tooltip position
        tt.moveTooltip(tooltip, d3.select(this))
      })
  }
}
