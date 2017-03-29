import tinycolor from 'tinycolor2'
import * as d3 from 'd3'
import * as utils from '../../utilities'

/**
 * Return rgba for hex
 */
const hexToRgba = (hex, alpha) => {
  let color = tinycolor(hex)
  color.setAlpha(alpha)
  return color.toRgbString()
}

/**
 * Prediction markers
 * - Area
 * - Line and dots
 * - Onset
 * - Peak
 */
export default class Prediction {
  constructor (parent, id, meta, color, cy) {
    // Prediction group
    let predictionGroup = parent.svg.append('g')
        .attr('class', 'prediction-group')
        .attr('id', id + '-marker')

    predictionGroup.append('path')
      .attr('class', 'area-prediction')
      .style('fill', color)

    predictionGroup.append('path')
      .attr('class', 'line-prediction')
      .style('stroke', color)

    predictionGroup.selectAll('.point-prediction')
      .enter()
      .append('circle')
      .attr('class', 'point-prediction')
      .style('stroke', color)

    this.predictionGroup = predictionGroup

    // Create onset group
    let onsetGroup = parent.svg.append('g')
        .attr('class', 'onset-group')
        .attr('id', id + '-marker')

    let stp = 6

    onsetGroup.append('line')
      .attr('y1', cy)
      .attr('y2', cy)
      .attr('class', 'range onset-range')
      .style('stroke', hexToRgba(color, 0.6))

    onsetGroup.append('line')
      .attr('y1', cy - stp / 2)
      .attr('y2', cy + stp / 2)
      .attr('class', 'stopper onset-stopper onset-low')
      .style('stroke', hexToRgba(color, 0.6))

    onsetGroup.append('line')
      .attr('y1', cy - stp / 2)
      .attr('y2', cy + stp / 2)
      .attr('class', 'stopper onset-stopper onset-high')
      .style('stroke', hexToRgba(color, 0.6))

    onsetGroup.append('circle')
      .attr('r', 3)
      .attr('cy', cy)
      .attr('class', 'onset-mark')
      .style('stroke', 'transparent')
      .style('fill', hexToRgba(color, 0.8))

    this.onsetGroup = onsetGroup

    // Peak group
    let peakGroup = parent.svg.append('g')
        .attr('class', 'peak-group')
        .attr('id', id + '-marker')

    peakGroup.append('line')
      .attr('class', 'range peak-range peak-range-x')
      .style('stroke', hexToRgba(color, 0.6))

    peakGroup.append('line')
      .attr('class', 'range peak-range peak-range-y')
      .style('stroke', hexToRgba(color, 0.6))

    peakGroup.append('line')
      .attr('class', 'stopper peak-stopper peak-low-x')
      .style('stroke', hexToRgba(color, 0.6))

    peakGroup.append('line')
      .attr('class', 'stopper peak-stopper peak-high-x')
      .style('stroke', hexToRgba(color, 0.6))

    peakGroup.append('line')
      .attr('class', 'stopper peak-stopper peak-low-y')
      .style('stroke', hexToRgba(color, 0.6))

    peakGroup.append('line')
      .attr('class', 'stopper peak-stopper peak-high-y')
      .style('stroke', hexToRgba(color, 0.6))

    peakGroup.append('circle')
      .attr('r', 5)
      .attr('class', 'peak-mark')
      .style('stroke', 'transparent')
      .style('fill', hexToRgba(color, 0.8))

    this.peakGroup = peakGroup

    this.color = color
    this.id = id
    this.meta = meta
    this.cid = parent.cid
  }

  plot (parent, data, actual) {
    this.data = data
    this.actual = actual
    this.xScale = parent.xScale
    this.yScale = parent.yScale
    this.timePoints = parent.timePoints
    this.legendHidden = !parent.predictionsShow[this.id]
    this.chartTooltip = parent.chartTooltip
  }

  update (idx) {
    let color = this.color
    let id = this.id
    let timePoint = this.timePoints[idx]

    let localPosition = this.data.map(d => d.week % 100).indexOf(timePoint)

    if (localPosition === -1) {
      this.hidden = true
      this.hideMarkers()
    } else {
      this.hidden = false
      if (!this.legendHidden) {
        this.showMarkers()
      }

      this.displayedPoints = {}

      let cid = this.cid
      let chartTooltip = this.chartTooltip

      // Move things
      let onset = this.data[localPosition].onsetWeek
      this.displayedPoints.onset = onset.point

      this.onsetGroup.select('.onset-mark')
        .transition()
        .duration(200)
        .attr('cx', this.xScale(onset.point))

      this.onsetGroup.select('.onset-mark')
        .on('mouseover', function () {
          d3.select(this)
            .transition()
            .duration(300)
            .style('stroke', hexToRgba(color, 0.3))
          chartTooltip.show()
          chartTooltip.renderPoint(id, [
            {
              key: 'Season Onset',
              value: onset.point
            }
          ], color)
        })
        .on('mouseout', function () {
          d3.select(this)
            .transition()
            .duration(200)
            .style('stroke', 'transparent')
          chartTooltip.hide()
        })
        .on('mousemove', function () {
          chartTooltip.move({
            x: d3.event.pageX,
            y: d3.event.pageY
          })
        })

      this.onsetGroup.select('.onset-range')
        .transition()
        .duration(200)
        .attr('x1', this.xScale(onset.low[cid]))
        .attr('x2', this.xScale(onset.high[cid]))

      this.onsetGroup.select('.onset-low')
        .transition()
        .duration(200)
        .attr('x1', this.xScale(onset.low[cid]))
        .attr('x2', this.xScale(onset.low[cid]))

      this.onsetGroup.select('.onset-high')
        .transition()
        .duration(200)
        .attr('x1', this.xScale(onset.high[cid]))
        .attr('x2', this.xScale(onset.high[cid]))

      let pw = this.data[localPosition].peakWeek
      let pp = this.data[localPosition].peakPercent

      this.displayedPoints.peak = pw.point

      let leftW = this.xScale(pw.point)
      let leftP = this.yScale(pp.point)
      this.peakGroup.select('.peak-mark')
        .transition()
        .duration(200)
        .attr('cx', leftW)
        .attr('cy', leftP)

      this.peakGroup.select('.peak-mark')
        .on('mouseover', function () {
          d3.select(this)
            .transition()
            .duration(300)
            .style('stroke', hexToRgba(color, 0.3))
          chartTooltip.show()
          chartTooltip.renderPoint(id, [
            {
              key: 'Peak Percent',
              value: pp.point
            },
            {
              key: 'Peak Week',
              value: pw.point
            }
          ], color)
        })
        .on('mouseout', function () {
          d3.select(this)
            .transition()
            .duration(200)
            .style('stroke', 'transparent')
          chartTooltip.hide()
        })
        .on('mousemove', function () {
          chartTooltip.move({
            x: d3.event.pageX,
            y: d3.event.pageY
          })
        })

      this.peakGroup.select('.peak-range-x')
        .transition()
        .duration(200)
        .attr('x1', this.xScale(pw.low[cid]))
        .attr('x2', this.xScale(pw.high[cid]))
        .attr('y1', this.yScale(pp.point))
        .attr('y2', this.yScale(pp.point))

      this.peakGroup.select('.peak-range-y')
        .transition()
        .duration(200)
        .attr('x1', this.xScale(pw.point))
        .attr('x2', this.xScale(pw.point))
        .attr('y1', this.yScale(pp.low[cid]))
        .attr('y2', this.yScale(pp.high[cid]))

      this.peakGroup.select('.peak-low-x')
        .transition()
        .duration(200)
        .attr('x1', this.xScale(pw.low[cid]))
        .attr('x2', this.xScale(pw.low[cid]))
        .attr('y1', this.yScale(pp.point) - 5)
        .attr('y2', this.yScale(pp.point) + 5)

      this.peakGroup.select('.peak-high-x')
        .transition()
        .duration(200)
        .attr('x1', this.xScale(pw.high[cid]))
        .attr('x2', this.xScale(pw.high[cid]))
        .attr('y1', this.yScale(pp.point) - 5)
        .attr('y2', this.yScale(pp.point) + 5)

      leftW = this.xScale(pw.point)
      this.peakGroup.select('.peak-low-y')
        .transition()
        .duration(200)
        .attr('x1', (!leftW ? 0 : leftW) - 5)
        .attr('x2', (!leftW ? 0 : leftW) + 5)
        .attr('y1', this.yScale(pp.low[cid]))
        .attr('y2', this.yScale(pp.low[cid]))

      this.peakGroup.select('.peak-high-y')
        .transition()
        .duration(200)
        .attr('x1', (!leftW ? 0 : leftW) - 5)
        .attr('x2', (!leftW ? 0 : leftW) + 5)
        .attr('y1', this.yScale(pp.high[cid]))
        .attr('y2', this.yScale(pp.high[cid]))

      // Move main pointers
      let predData = this.data[localPosition]

      let startTimePoint = predData.week
      let startData = this.actual.filter(d => d.week === startTimePoint)[0].data

      let data = [{
        week: startTimePoint % 100,
        data: startData,
        low: startData,
        high: startData
      }]

      let names = ['oneWk', 'twoWk', 'threeWk', 'fourWk']
      // TODO Here be weeks
      let nextTimePoints = utils.getNextWeeks(startTimePoint, this.timePoints)

      nextTimePoints.forEach((item, index) => {
        data.push({
          week: item,
          data: predData[names[index]].point,
          low: predData[names[index]].low[cid],
          high: predData[names[index]].high[cid]
        })
      })

      // Save indexed data
      this.displayedData = Array(this.timePoints.length).fill(false)
      data.forEach((d, index) => {
        if (index > 0) this.displayedData[this.timePoints.indexOf(d.week)] = d.data
      })

      let circles = this.predictionGroup.selectAll('.point-prediction')
          .data(data.slice(1))

      circles.exit().remove()

      circles.enter().append('circle')
        .merge(circles)
        .attr('class', 'point-prediction')
        .transition()
        .duration(200)
        .ease(d3.easeQuadOut)
        .attr('cx', d => this.xScale(d.week))
        .attr('cy', d => this.yScale(d.data))
        .attr('r', 3)
        .style('stroke', this.color)

      let line = d3.line()
          .x(d => this.xScale(d.week % 100))
          .y(d => this.yScale(d.data))

      this.predictionGroup.select('.line-prediction')
        .datum(data)
        .transition()
        .duration(200)
        .attr('d', line)

      let area = d3.area()
          .x(d => this.xScale(d.week % 100))
          .y1(d => this.yScale(d.low))
          .y0(d => this.yScale(d.high))

      this.predictionGroup.select('.area-prediction')
        .datum(data)
        .transition()
        .duration(200)
        .attr('d', area)
    }
  }

  hideMarkers () {
    [
      this.onsetGroup,
      this.peakGroup,
      this.predictionGroup].forEach(elem => {
        elem.style('visibility', 'hidden')
      })
  }

  showMarkers () {
    // Only show if not hidden
    if (this.hidden) return

    [
      this.onsetGroup,
      this.peakGroup,
      this.predictionGroup].forEach(elem => {
        elem.style('visibility', null)
      })
  }

  clear () {
    this.onsetGroup.remove()
    this.peakGroup.remove()
    this.predictionGroup.remove()
  }

  query (idx) {
    // Don't show anything if predictions are hidden
    if (this.hidden || this.legendHidden) return false

    return this.displayedData[idx]
  }
}
