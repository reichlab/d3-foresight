import * as d3 from 'd3'
import * as mutils from '../../utilities/misc'

export default class Overlay {
  constructor (parent) {
    let svg = parent.svg
    let height = parent.height
    let width = parent.width
    let distributionTooltip = parent.distributionTooltip
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
        distributionTooltip.show()
      })
      .on('mouseout', () => {
        line.style('display', 'none')
        distributionTooltip.hide()
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

        distributionTooltip.renderValues(parent.predictions, index, xScale.domain()[index])

        // Tooltip position
        let pos = mutils.getMousePosition(d3.select(this))
        distributionTooltip.move({
          x: pos[0],
          y: pos[1]
        })
      })
  }
}
