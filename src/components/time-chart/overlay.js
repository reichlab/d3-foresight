import * as d3 from 'd3'

export default class Overlay {
  constructor (parent) {
    let svg = parent.svg
    let height = parent.height
    let onsetHeight = parent.onsetHeight
    let width = parent.width
    let chartTooltip = parent.chartTooltip
    let _xScale = parent._xScale
    let chartHeight = height + onsetHeight

    // Add text for no prediction
    this.noPredText = parent.elementSelection.append('div')
      .attr('class', 'no-pred-text')
      .html('Predictions not available <br> for selected time')

    // Add mouse hover line
    let line = svg.append('line')
        .attr('class', 'hover-line')
        .attr('x1', 0)
        .attr('y1', 0)
        .attr('x2', 0)
        .attr('y2', chartHeight)
        .style('display', 'none')

    // Add now line
    let nowGroup = svg.append('g')
        .attr('class', 'now-group')

    nowGroup.append('line')
      .attr('class', 'now-line')
      .attr('x1', 0)
      .attr('y1', 0)
      .attr('x2', 0)
      .attr('y2', chartHeight)
    nowGroup.append('text')
      .attr('class', 'now-text')
      .attr('transform', 'translate(15, 10) rotate(-90)')
      .style('text-anchor', 'end')
      .text('Today')
    this.nowGroup = nowGroup

    svg.append('rect')
      .attr('class', 'overlay')
      .attr('height', chartHeight)
      .attr('width', width)
      .on('mouseover', () => {
        line.style('display', null)
        chartTooltip.show()
      })
      .on('mouseout', () => {
        line.style('display', 'none')
        chartTooltip.hide()
      })

    // Add mouse move and click events
    d3.select('.overlay')
      .on('mousemove', function () {
        let mouse = d3.mouse(this)
        // Snap x to nearest tick
        let index = Math.round(_xScale.invert(mouse[0]))
        let snappedX = _xScale(index)

        // Move the cursor
        d3.select('.hover-line')
          .transition()
          .duration(50)
          .attr('x1', snappedX)
          .attr('x2', snappedX)

        chartTooltip.renderValues(parent.observed, parent.actual,
                                  parent.predictions, index)
        chartTooltip.move({
          x: d3.event.pageX,
          y: d3.event.pageY
        })
      })
      .on('click', function () {
        parent.handleHook({
          type: 'positionUpdate',
          value: Math.round(_xScale.invert(d3.mouse(this)[0]))
        })
      })
  }

  plot (parent, showNowLine) {
    if (showNowLine) {
      let nowPos = parent.xScaleDate(new Date())
      this.nowGroup.select('.now-line')
        .attr('x1', nowPos)
        .attr('x2', nowPos)
      this.nowGroup.select('.now-text')
        .attr('dy', nowPos)
      this.nowGroup.style('display', null)
    } else {
      this.nowGroup.style('display', 'none')
    }
  }

  update (predictions) {
    // Update no prediction text
    this.noPredText
      .transition()
      .duration(100)
      .style('display', (predictions.filter(p => p.noData).length !== 0) ? null : 'none')
  }
}
