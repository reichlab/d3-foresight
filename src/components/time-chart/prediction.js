import * as d3 from 'd3'
import { moveTooltipTo } from '../../utilities/mouse'
import * as colors from '../../utilities/colors'

/**
 * Prediction marker with following components
 * - Area
 * - Line and dots
 * - Onset
 * - Peak
 */
export default class Prediction {
  constructor (parent, id, meta, color, onsetY) {
    let colorPoint = colors.hexToRgba(color, 0.8)
    let colorRange = colors.hexToRgba(color, 0.6)

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
    this.ticks = parent.ticks
    this.timeChartTooltip = parent.timeChartTooltip
    this.displayedData = Array(this.modelData.length).fill(false)
  }

  update (idx) {
    let color = this.color
    let colorHover = colors.hexToRgba(color, 0.3)
    let id = this.id
    let ticks = this.ticks

    if (this.modelData[idx] === null) {
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
      let onset = this.modelData[idx].onsetTime

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
          timeChartTooltip.hidden = false
          timeChartTooltip.renderPoint(id, [
            {
              key: 'Season Onset',
              value: ticks[onset.point]
            }
          ], color)
        })
        .on('mouseout', function () {
          d3.select(this)
            .transition()
            .duration(200)
            .style('stroke', 'transparent')
          timeChartTooltip.hidden = true
        })
        .on('mousemove', function () {
          moveTooltipTo(timeChartTooltip, d3.select('.overlay'))
        })

      if (cid === null) {
        ['.range', '.stopper'].forEach(cls => {
          this.onsetGroup.selectAll(cls)
            .attr('visibility', 'hidden')
        })
      } else {
        ['.range', '.stopper'].forEach(cls => {
          this.onsetGroup.selectAll(cls)
            .attr('visibility', null)
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
      }

      let pw = this.modelData[idx].peakTime
      let pp = this.modelData[idx].peakValue

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
          timeChartTooltip.hidden = false
          timeChartTooltip.renderPoint(id, [
            {
              key: 'Peak Percent',
              value: pp.point
            },
            {
              key: 'Peak Week',
              value: ticks[pw.point]
            }
          ], color)
        })
        .on('mouseout', function () {
          d3.select(this)
            .transition()
            .duration(200)
            .style('stroke', 'transparent')
          timeChartTooltip.hidden = true
        })
        .on('mousemove', function () {
          moveTooltipTo(timeChartTooltip, d3.select('.overlay'))
        })

      if (cid === null) {
        ['.range', '.stopper'].forEach(cls => {
          this.peakGroup.selectAll(cls)
            .attr('visibility', 'hidden')
        })
      } else {
        ['.range', '.stopper'].forEach(cls => {
          this.peakGroup.selectAll(cls)
            .attr('visibility', null)
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
      }

      // Move main pointers
      let predData = this.modelData[idx]
      let startData = this.startingPointsData[idx]

      // Actual point/area to be shown
      let nextTimeData = [{
        index: idx,
        point: startData,
        low: startData,
        high: startData
      }]

      let idxOverflow = Math.min(0, this.modelData.length - (idx + predData.series.length))
      let displayLimit = predData.series.length - idxOverflow

      for (let i = 0; i < displayLimit; i++) {
        if (cid === null) {
          nextTimeData.push({
            index: i + idx + 1,
            point: predData.series[i].point,
            low: predData.series[i].point,
            high: predData.series[i].point
          })
        } else {
          nextTimeData.push({
            index: i + idx + 1,
            point: predData.series[i].point,
            low: predData.series[i].low[cid],
            high: predData.series[i].high[cid]
          })
        }
      }

      // Save indexed data for query
      this.displayedData = Array(this.modelData.length).fill(false)
      nextTimeData.slice(1).forEach(d => {
        this.displayedData[d.index] = d.point
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
        .attr('cx', d => this.xScale(d.index))
        .attr('cy', d => this.yScale(d.point))
        .attr('r', 3)
        .style('stroke', this.color)

      let line = d3.line()
          .x(d => this.xScale(d.index))
          .y(d => this.yScale(d.point))

      this.predictionGroup.select('.line-prediction')
        .datum(nextTimeData)
        .transition()
        .duration(200)
        .attr('d', line)

      let area = d3.area()
          .x(d => this.xScale(d.index))
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

  /**
   * Return index of asked idx among displayedData items
   */
  displayedIdx (idx) {
    for (let i = 0; i < this.displayedData.length; i++) {
      if (this.displayedData[i]) return (idx - i)
    }
    return null
  }
}
