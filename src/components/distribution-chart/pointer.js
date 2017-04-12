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

    this.group = group
  }

  plot (currentIdx, xScale) {
    this.group.select('.pointer-triangle')
      .transition()
      .duration(300)
      .attr('points', generateTrianglePoints([xScale(currentIdx), this.yPos]))
  }
}
