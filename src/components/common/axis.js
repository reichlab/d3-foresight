import * as d3 from 'd3'
import textures from 'textures'

/**
 * Simple linear Y axis with informative label
 */
export class YAxis {
  constructor (parent) {
    let height = parent.height
    let svg = parent.svg
    let config = parent.config
    let infoTooltip = parent.infoTooltip

    svg.append('g')
      .attr('class', 'axis axis-y')
      .append('text')
      .attr('class', 'title')
      .attr('transform', `translate(-40 , ${height / 2}) rotate(-90)`)
      .attr('dy', '.71em')
      .style('text-anchor', 'middle')
      .text(config.axes.y.title)
      .style('cursor', 'pointer')
      .on('mouseover', () => infoTooltip.show())
      .on('mouseout', () => infoTooltip.hide())
      .on('mousemove', () => {
        infoTooltip.renderText({
          title: null,
          text: config.axes.y.description
        })
        infoTooltip.move({
          x: d3.event.pageX,
          y: d3.event.pageY
        })
      })
      .on('click', () => {
        window.open(config.axes.y.url, '_blank')
      })
  }

  plot (parent) {
    let yAxis = d3.axisLeft(parent.yScale)
    parent.svg.select('.axis-y')
      .transition().duration(200).call(yAxis)
  }
}

/**
 * Simple linear X axis with informative label
 */
export class XAxis {
  constructor (parent) {
    let svg = parent.svg
    let height = parent.height
    let width = parent.width
    let config = parent.config
    let infoTooltip = parent.infoTooltip

    let axisGroup = svg.append('g')
        .attr('class', 'axis axis-x')
        .attr('transform', `translate(0,${height})`)

    let xText = axisGroup
        .append('text')
        .attr('class', 'title')
        .attr('text-anchor', 'start')
        .attr('transform', `translate(${width + 10},-15)`)

    // Setup multiline text
    let xTitle = config.axes.x.title
    if (Array.isArray(xTitle)) {
      xText.append('tspan')
        .text(xTitle[0])
        .attr('x', 0)
      xTitle.slice(1).forEach(txt => {
        xText.append('tspan')
          .text(txt)
          .attr('x', 0)
          .attr('dy', '1em')
      })
    } else {
      xText.append('tspan')
        .text(xTitle)
        .attr('x', 0)
    }

    xText.style('cursor', 'pointer')
      .on('mouseover', () => infoTooltip.show())
      .on('mouseout', () => infoTooltip.hide())
      .on('mousemove', () => {
        infoTooltip.renderText({
          title: null,
          text: config.axes.x.description
        })
        infoTooltip.move({
          x: d3.event.pageX,
          y: d3.event.pageY
        }, 'left')
      })
      .on('click', () => {
        window.open(config.axes.x.url, '_blank')
      })
  }

  plot (parent) {
    let xAxis = d3.axisBottom(parent.xScale)
    parent.svg.select('.axis-x')
      .transition().duration(200).call(xAxis)
  }
}

/**
 * X axis with week numbers, time and onset panel
 */
export class XAxisDate {
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

    // Setup multiline text
    let xTitle = config.axes.x.title
    if (Array.isArray(xTitle)) {
      xText.append('tspan')
        .text(xTitle[0])
        .attr('x', 0)
      xTitle.slice(1).forEach(txt => {
        xText.append('tspan')
          .text(txt)
          .attr('x', 0)
          .attr('dy', '1em')
      })
    } else {
      xText.append('tspan')
        .text(xTitle)
        .attr('x', 0)
    }

    xText.style('cursor', 'pointer')
      .on('mouseover', () => infoTooltip.show())
      .on('mouseout', () => infoTooltip.hide())
      .on('mousemove', () => {
        infoTooltip.renderText({
          title: null,
          text: config.axes.x.description
        })
        infoTooltip.move({
          x: d3.event.pageX,
          y: d3.event.pageY
        }, 'left')
      })
      .on('click', () => {
        window.open(config.axes.x.url, '_blank')
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
