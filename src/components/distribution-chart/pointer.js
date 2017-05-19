import * as d3 from 'd3'

/**
 * Return triangle points for drawing polyline centered at origin
 */
const generateTrianglePoints = origin => {
  let side = 15
  return [
    [origin[0] - side / 2, origin[1] - side / Math.sqrt(2)],
    [origin[0] + side / 2, origin[1] - side / Math.sqrt(2)],
    [origin[0], origin[1] - 2]
  ].map(p => p[0] + ',' + p[1]).join(' ')
}

/**
 * Pointer over current position in time axis
 */
export default class Pointer {
  constructor (parent) {
    let group = parent.svg.append('g')
        .attr('class', 'time-pointer-group')

    // Save fixed y position
    this.yPos = parent.height

    group.append('polyline')
      .attr('class', 'pointer-triangle')
      .attr('points', generateTrianglePoints([0, this.yPos]))

    // Add overlay over axis to allow clicks
    group.append('rect')
      .attr('class', 'pointer-overlay')
      .attr('height', 80)
      .attr('width', parent.width)
      .attr('x', 0)
      .attr('y', parent.height - 30)

    this.group = group
  }

  plot (currentIdx, xScale, clickCallback) {
    this.group.select('.pointer-triangle')
      .transition()
      .duration(300)
      .attr('points', generateTrianglePoints([xScale(currentIdx), this.yPos]))

    this.group.select('.pointer-overlay').on('click', function () {
      clickCallback(Math.round(xScale.invert(d3.mouse(this)[0])))
    })
  }
}
