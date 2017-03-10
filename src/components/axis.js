import * as d3 from 'd3'
import textures from 'textures'

export class YAxis {
  constructor (parent) {
    // TODO make sure 0 offset work as expected
    let height = parent.height
    let svg = parent.svg
    // TODO config?
    let config = parent.config
    let infoTooltip = parent.infoTooltip

    svg.append('g')
      .attr('class', 'axis axis-y')
      .append('text')
      .attr('class', 'title')
      .attr('transform', `translate(-40 , ${height / 2}) rotate(-90)`)
      .attr('dy', '.71em')
      .style('text-anchor', 'middle')
      .text('Weighted ILI (%)')
      .style('cursor', 'pointer')
      .on('mouseover', () => {
        infoTooltip
          .style('display', null)
      })
      .on('mouseout', () => {
        infoTooltip
          .style('display', 'none')
      })
      .on('mousemove', () => {
        infoTooltip
          .style('top', d3.event.pageY + 'px')
          .style('left', (d3.event.pageX + 15) + 'px')
          .html(config.axesDesc.y)
      })
      .on('click', () => {
        window.open(config.axesUrl.y, '_blank')
      })
  }

  plot (parent) {
    let yAxis = d3.axisLeft(parent.yScale)
    parent.svg.select('.axis-y')
      .transition().duration(200).call(yAxis)
  }
}

export class XAxis {
  constructor (parent) {
    let svg = parent.svg
    let width = parent.width
    let height = parent.height
    let onsetHeight = parent.onsetHeight
    let config = parent.config
    let infoTooltip = parent.infoTooltip

    // Keep onset panel between xaxis and plot
    let xAxisPos = height + onsetHeight

    // Main axis with ticks below the onset panel
    svg.append('g')
      .attr('class', 'axis axis-x')
      .attr('transform', `translate(0,${xAxisPos})`)

    let axisXDate = svg.append('g')
        .attr('class', 'axis axis-x-date')
        .attr('transform', `translate(0,${xAxisPos + 25})`)

    let xText = axisXDate
        .append('text')
        .attr('class', 'title')
        .attr('text-anchor', 'start')
        .attr('transform', `translate(${width + 10},-15)`)

    xText.append('tspan')
      .text('Epidemic')
      .attr('x', 0)
    xText.append('tspan')
      .text('Week')
      .attr('x', 0)
      .attr('dy', '1em')

    xText.style('cursor', 'pointer')
      .on('mouseover', () => {
        infoTooltip
          .style('display', null)
      })
      .on('mouseout', () => {
        infoTooltip
          .style('display', 'none')
      })
      .on('mousemove', () => {
        infoTooltip
          .style('top', (d3.event.pageY - 15) + 'px')
          .style('left', (d3.event.pageX - 150 - 15) + 'px')
          .html(config.axesDesc.x)
      })
      .on('click', () => {
        window.open(config.axesUrl.x, '_blank')
      })

    // Setup reverse axis (over onset offset)
    // Clone of axis above onset panel, without text
    svg.append('g')
      .attr('class', 'axis axis-x-ticks')
      .attr('transform', `translate(0, ${height})`)

    // Create onset panel
    let onsetTexture = textures.lines()
        .lighter()
        .strokeWidth(0.5)
        .size(8)
        .stroke('#ccc')
    svg.call(onsetTexture)

    svg.append('rect')
      .attr('class', 'onset-texture')
      .attr('height', onsetHeight)
      .attr('width', width)
      .attr('x', 0)
      .attr('y', height)
      .style('fill', onsetTexture.url())
  }

  plot (parent) {
    let xScalePoint = parent.xScalePoint
    let xScaleDate = parent.xScaleDate
    let svg = parent.svg

    let xAxis = d3.axisBottom(xScalePoint)
        .tickValues(xScalePoint.domain().filter((d, i) => !(i % 2)))

    let xAxisReverseTick = d3.axisTop(xScalePoint)
        .tickValues(xScalePoint.domain().filter((d, i) => !(i % 2)))

    let xAxisDate = d3.axisBottom(xScaleDate)
        .ticks(d3.timeMonth)
        .tickFormat(d3.timeFormat('%b %y'))

    // Mobile view fix
    if (parent.width < 420) {
      xAxisDate.ticks(2)
      xAxis.tickValues(xScalePoint.domain().filter((d, i) => !(i % 10)))
    }

    svg.select('.axis-x')
      .transition().duration(200).call(xAxis)

    // Copy over ticks above the onsetpanel
    let tickOnlyAxis = svg.select('.axis-x-ticks')
        .transition().duration(200).call(xAxisReverseTick)

    tickOnlyAxis.selectAll('text').remove()

    svg.select('.axis-x-date')
      .transition().duration(200).call(xAxisDate)
  }
}
