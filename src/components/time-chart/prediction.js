import tinycolor from 'tinycolor2'
import * as d3 from 'd3'
import * as utils from '../../utilities/time-chart'

/**
 * Return rgba for hex
 */
const hexToRgba = (hex, alpha) => tinycolor(hex).setAlpha(alpha).toRgbString()

/**
 * Prediction marker with following components
 * - Area
 * - Line and dots
 * - Onset
 * - Peak
 */
export default class Prediction {
  constructor (parent, id, meta, color, onsetY) {
    let colorPoint = hexToRgba(color, 0.8)
    let colorRange = hexToRgba(color, 0.6)

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
      .attr('y1', onsetY)
      .attr('y2', onsetY)
      .attr('class', 'range onset-range')
      .style('stroke', colorRange)

    onsetGroup.append('line')
      .attr('y1', onsetY - stp / 2)
      .attr('y2', onsetY + stp / 2)
      .attr('class', 'stopper onset-stopper onset-low')
      .style('stroke', colorRange)

    onsetGroup.append('line')
      .attr('y1', onsetY - stp / 2)
      .attr('y2', onsetY + stp / 2)
      .attr('class', 'stopper onset-stopper onset-high')
      .style('stroke', colorRange)

    onsetGroup.append('circle')
      .attr('r', 3)
      .attr('cy', onsetY)
      .attr('class', 'onset-mark')
      .style('stroke', 'transparent')
      .style('fill', colorPoint)

    this.onsetGroup = onsetGroup

    // Peak group
    let peakGroup = parent.svg.append('g')
        .attr('class', 'peak-group')
        .attr('id', id + '-marker')

    peakGroup.append('line')
      .attr('class', 'range peak-range peak-range-x')
      .style('stroke', colorRange)

    peakGroup.append('line')
      .attr('class', 'range peak-range peak-range-y')
      .style('stroke', colorRange)

    peakGroup.append('line')
      .attr('class', 'stopper peak-stopper peak-low-x')
      .style('stroke', colorRange)

    peakGroup.append('line')
      .attr('class', 'stopper peak-stopper peak-high-x')
      .style('stroke', colorRange)

    peakGroup.append('line')
      .attr('class', 'stopper peak-stopper peak-low-y')
      .style('stroke', colorRange)

    peakGroup.append('line')
      .attr('class', 'stopper peak-stopper peak-high-y')
      .style('stroke', colorRange)

    peakGroup.append('circle')
      .attr('r', 5)
      .attr('class', 'peak-mark')
      .style('stroke', 'transparent')
      .style('fill', colorPoint)

    this.peakGroup = peakGroup

    this.color = color
    this.id = id
    this.meta = meta
    this.cid = parent.cid
    // Tells if the prediction is hidden by some other component
    this._hidden = false
    // Tells if data is available to be shown for current time
    this.noData = true
  }

  plot (parent, modelData, startingPointsData) {
    this.modelData = modelData
    this.startingPointsData = startingPointsData
    this.xScale = parent.xScale
    this.yScale = parent.yScale
    this.timePointsWeek = parent.timePoints.map(tp => tp.week)
    this.timeChartTooltip = parent.timeChartTooltip
    this.displayedData = Array(this.timePointsWeek.length).fill(false)
  }

  update (idx) {
    let color = this.color
    let colorHover = hexToRgba(color, 0.3)
    let id = this.id
    let timePointWeek = this.timePointsWeek[idx]

    let currentPosition = this.modelData.map(d => d.week % 100).indexOf(timePointWeek)

    if (currentPosition === -1) {
      // There is no data for current point, hide the markers without
      // setting exposed hidden flag
      this.noData = true
      this.hideMarkers()
    } else {
      this.noData = false
      if (!this.hidden) {
        // No one is hiding me
        this.showMarkers()
      }

      let cid = this.cid
      let timeChartTooltip = this.timeChartTooltip

      // Move things
      let onset = this.modelData[currentPosition].onsetWeek

      this.onsetGroup.select('.onset-mark')
        .transition()
        .duration(200)
        .attr('cx', this.xScale(onset.point))

      this.onsetGroup.select('.onset-mark')
        .on('mouseover', function () {
          d3.select(this)
            .transition()
            .duration(300)
            .style('stroke', colorHover)
          timeChartTooltip.show()
          timeChartTooltip.renderPoint(id, [
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
          timeChartTooltip.hide()
        })
        .on('mousemove', function () {
          timeChartTooltip.move({
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

      let pw = this.modelData[currentPosition].peakWeek
      let pp = this.modelData[currentPosition].peakPercent

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
            .style('stroke', colorHover)
          timeChartTooltip.show()
          timeChartTooltip.renderPoint(id, [
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
          timeChartTooltip.hide()
        })
        .on('mousemove', function () {
          timeChartTooltip.move({
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
      let predData = this.modelData[currentPosition]
      let startTimePoint = predData.week
      let startData = this.startingPointsData[currentPosition]

      // Actual point/area to be shown
      let nextTimeData = [{
        week: startTimePoint % 100,
        data: startData,
        low: startData,
        high: startData
      }]

      let names = ['oneWk', 'twoWk', 'threeWk', 'fourWk']
      // TODO Here be weeks
      let nextTimePoints = utils.getNextWeeks(startTimePoint, this.timePointsWeek)

      nextTimePoints.forEach((item, index) => {
        nextTimeData.push({
          week: item,
          data: predData[names[index]].point,
          low: predData[names[index]].low[cid],
          high: predData[names[index]].high[cid]
        })
      })

      // Save indexed data for query
      this.displayedData = Array(this.timePointsWeek.length).fill(false)
      nextTimeData.forEach((d, index) => {
        if (index > 0) this.displayedData[this.timePointsWeek.indexOf(d.week)] = d.data
      })

      let circles = this.predictionGroup.selectAll('.point-prediction')
          .data(nextTimeData.slice(1))

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
        .datum(nextTimeData)
        .transition()
        .duration(200)
        .attr('d', line)

      let area = d3.area()
          .x(d => this.xScale(d.week % 100))
          .y1(d => this.yScale(d.low))
          .y0(d => this.yScale(d.high))

      this.predictionGroup.select('.area-prediction')
        .datum(nextTimeData)
        .transition()
        .duration(200)
        .attr('d', area)
    }
  }

  /**
   * Check if we are hidden
   */
  get hidden () {
    return this._hidden
  }

  set hidden (hide) {
    if (hide) {
      this.hideMarkers()
    } else {
      if (!this.noData) {
        this.showMarkers()
      }
    }
    this._hidden = hide
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
    [
      this.onsetGroup,
      this.peakGroup,
      this.predictionGroup].forEach(elem => {
        elem.style('visibility', null)
      })
  }

  /**
   * Remove the markers
   */
  clear () {
    this.onsetGroup.remove()
    this.peakGroup.remove()
    this.predictionGroup.remove()
  }

  /**
   * Ask if we have something to show at the index
   */
  query (idx) {
    // Don't show anything if predictions are hidden
    return (!this.noData && !this.hidden && this.displayedData[idx])
  }
}
