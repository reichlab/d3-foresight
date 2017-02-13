// Markers for time chart

import * as util from '../utils/timechart'
import * as d3 from 'd3'
import palette from '../styles/palette.json'

/**
 * Prediction markers
 * - Area
 * - Line and dots
 * - Onset
 * - Peak
 */
export class Prediction {
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
      .style('stroke', util.hexToRgba(color, 0.6))

    onsetGroup.append('line')
      .attr('y1', cy - stp / 2)
      .attr('y2', cy + stp / 2)
      .attr('class', 'stopper onset-stopper onset-low')
      .style('stroke', util.hexToRgba(color, 0.6))

    onsetGroup.append('line')
      .attr('y1', cy - stp / 2)
      .attr('y2', cy + stp / 2)
      .attr('class', 'stopper onset-stopper onset-high')
      .style('stroke', util.hexToRgba(color, 0.6))

    onsetGroup.append('circle')
      .attr('r', 3)
      .attr('cy', cy)
      .attr('class', 'onset-mark')
      .style('stroke', 'transparent')
      .style('fill', util.hexToRgba(color, 0.8))

    this.onsetGroup = onsetGroup

    // Peak group
    let peakGroup = parent.svg.append('g')
        .attr('class', 'peak-group')
        .attr('id', id + '-marker')

    peakGroup.append('line')
      .attr('class', 'range peak-range peak-range-x')
      .style('stroke', util.hexToRgba(color, 0.6))

    peakGroup.append('line')
      .attr('class', 'range peak-range peak-range-y')
      .style('stroke', util.hexToRgba(color, 0.6))

    peakGroup.append('line')
      .attr('class', 'stopper peak-stopper peak-low-x')
      .style('stroke', util.hexToRgba(color, 0.6))

    peakGroup.append('line')
      .attr('class', 'stopper peak-stopper peak-high-x')
      .style('stroke', util.hexToRgba(color, 0.6))

    peakGroup.append('line')
      .attr('class', 'stopper peak-stopper peak-low-y')
      .style('stroke', util.hexToRgba(color, 0.6))

    peakGroup.append('line')
      .attr('class', 'stopper peak-stopper peak-high-y')
      .style('stroke', util.hexToRgba(color, 0.6))

    peakGroup.append('circle')
      .attr('r', 5)
      .attr('class', 'peak-mark')
      .style('stroke', 'transparent')
      .style('fill', util.hexToRgba(color, 0.8))

    this.peakGroup = peakGroup

    this.color = color
    this.id = id
    this.meta = meta
    this.cid = parent.cid
  }

  plot (parent, data, actual) {
    this.data = data
    this.actual = actual
    this.xScale = parent.xScaleWeek
    this.yScale = parent.yScale
    this.weeks = parent.weeks
    this.legendHidden = !parent.predictionsShow[this.id]
    this.tooltip = parent.chartTooltip
  }

  update (idx) {
    let color = this.color
    let id = this.id
    let week = this.weeks[idx]

    let localPosition = this.data.map(d => d.week % 100).indexOf(week)

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
      let tooltip = this.tooltip

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
            .style('stroke', util.hexToRgba(color, 0.3))
          tooltip
            .style('display', null)
            .html(util.pointTooltip(id, [
              {
                key: 'Season Onset',
                value: onset.point
              }
            ], color))
        })
        .on('mouseout', function () {
          d3.select(this)
            .transition()
            .duration(200)
            .style('stroke', 'transparent')
          tooltip
            .style('display', 'none')
        })
        .on('mousemove', function () {
          tooltip
            .style('top', (d3.event.pageY + 15) + 'px')
            .style('left', (d3.event.pageX + 15) + 'px')
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
            .style('stroke', util.hexToRgba(color, 0.3))
          tooltip
            .style('display', null)
            .html(util.pointTooltip(id, [
              {
                key: 'Peak Percent',
                value: pp.point
              },
              {
                key: 'Peak Week',
                value: pw.point
              }
            ], color))
        })
        .on('mouseout', function () {
          d3.select(this)
            .transition()
            .duration(200)
            .style('stroke', 'transparent')
          tooltip
            .style('display', 'none')
        })
        .on('mousemove', function () {
          tooltip
            .style('top', (d3.event.pageY + 15) + 'px')
            .style('left', (d3.event.pageX + 15) + 'px')
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

      let startWeek = predData.week
      let startData = this.actual.filter(d => d.week === startWeek)[0].data

      let data = [{
        week: startWeek % 100,
        data: startData,
        low: startData,
        high: startData
      }]

      let names = ['oneWk', 'twoWk', 'threeWk', 'fourWk']
      let nextWeeks = util.getNextWeeks(startWeek, this.weeks)

      nextWeeks.forEach((item, index) => {
        data.push({
          week: item,
          data: predData[names[index]].point,
          low: predData[names[index]].low[cid],
          high: predData[names[index]].high[cid]
        })
      })

      // Save week indexed data
      this.displayedData = Array(this.weeks.length).fill(false)
      data.forEach((d, index) => {
        if (index > 0) this.displayedData[this.weeks.indexOf(d.week)] = d.data
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
    this.onsetGroup
      .style('visibility', 'hidden')

    this.peakGroup
      .style('visibility', 'hidden')

    this.predictionGroup
      .style('visibility', 'hidden')
  }

  showMarkers () {
    // Only show if not hidden
    if (this.hidden) return

    this.onsetGroup
      .style('visibility', null)

    this.peakGroup
      .style('visibility', null)

    this.predictionGroup
      .style('visibility', null)
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

/**
 * Time rectangle for navigation guidance
 */
export class TimeRect {
  constructor (parent) {
    this.rect = parent.svg.append('rect')
      .attr('x', 0)
      .attr('y', 0)
      .attr('width', 0)
      .attr('height', parent.height)
      .attr('class', 'timerect')
  }

  plot (parent, data) {
    // Save local data
    this.data = data
    this.scale = parent.xScaleWeek
  }

  update (idx) {
    this.rect
      .transition()
      .duration(200)
      .attr('width', this.scale(this.data[idx].week % 100))
  }
}

/**
 * Historical lines
 */
export class HistoricalLines {
  constructor (parent) {
    this.group = parent.svg.append('g')
      .attr('class', 'history-group')
    this.tooltip = parent.chartTooltip
  }

  plot (parent, data) {
    this.clear()
    if (parent.historyShow) this.show()
    else this.hide()

    let tooltip = this.tooltip

    let line = d3.line()
        .x(d => parent.xScaleWeek(d.week % 100))
        .y(d => parent.yScale(d.data))

    data.map(d => {
      let path = this.group.append('path')
          .attr('class', 'line-history')
          .attr('id', d.id + '-history')

      path.datum(d.actual)
        .transition()
        .duration(200)
        .attr('d', line)

      path.on('mouseover', function () {
        d3.select('.line-history.highlight')
          .datum(d.actual)
          .attr('d', line)
        tooltip
          .style('display', null)
      }).on('mouseout', function () {
        d3.select('.line-history.highlight')
          .datum([])
          .attr('d', line)
        tooltip
          .style('display', 'none')
      }).on('mousemove', function () {
        tooltip
          .style('top', (d3.event.pageY + 15) + 'px')
          .style('left', (d3.event.pageX + 15) + 'px')
          .html(`<div class="point">${d.id}</div>`)
      })
    })

    // Add highlight overlay
    this.group.append('path')
      .attr('class', 'line-history highlight')
  }

  hide () {
    this.group
      .style('visibility', 'hidden')
  }

  show () {
    this.group
      .style('visibility', null)
  }

  clear () {
    this.group.selectAll('*')
      .transition()
      .duration(200).remove()
  }
}

/**
 * Side buttons in control panel
 */
class ControlButtons {
  constructor (panelSelection, tooltip, eventHook) {
    let navControls = panelSelection.append('div')
        .attr('class', 'nav-controls')

    // Save all the buttons for toggling state and stuff
    this.buttons = [
      {
        name: 'legendBtn',
        icon: 'fa-map-o',
        tooltipText: 'Toggle Legend',
        event: 'btn:legend'
      },
      {
        name: 'statsBtn',
        icon: 'fa-percent',
        tooltipText: 'Toggle Stats',
        event: 'btn:stats'
      },
      {
        name: 'backBtn',
        icon: 'fa-arrow-left',
        tooltipText: 'Move backward',
        event: 'btn:back'
      },
      {
        name: 'nextBtn',
        icon: 'fa-arrow-right',
        tooltipText: 'Move forward',
        event: 'btn:next'
      }
    ].map(data => {
      let btn = navControls.append('a')
          .attr('class', 'button is-small is-info is-outlined')
      btn.append('span')
        .attr('class', 'icon is-small')
        .append('i')
        .attr('class', `fa ${data.icon}`)
      btn
        .on('mouseover', function () {
          tooltip.style('display', null)
        })
        .on('mouseout', function () {
          tooltip.style('display', 'none')
        })
        .on('mousemove', function () {
          tooltip
            .style('top', (d3.event.pageY + 15) + 'px')
            .style('left', (d3.event.pageX - 100 - 15) + 'px')
            .html(data.tooltipText)
        })
        .on('click', function () {
          eventHook(data.event)
        })
      navControls.append('br')
      return btn
    })
  }

  toggleLegendBtn () {
    this.buttons[0].classed('is-outlined', !this.buttons[0].classed('is-outlined'))
  }

  toggleStatsBtn () {
    this.buttons[1].classed('is-outlined', !this.buttons[1].classed('is-outlined'))
  }
}

/**
 * Legend nav drawer
 * @param panelSelection - D3 selection from controlpanel
 * @param tooltip - Legend tooltip
 * @param confidenceIntervals - List of confidence intervals
 * @param eventHook - Event hook callback to be used by controlpanel
 */
class LegendDrawer {
  constructor (panelSelection, tooltip, confidenceIntervals, eventHook) {
    let legendGroup = panelSelection.append('div')
        .attr('class', 'legend nav-drawer')

    // Contains items including and above the CI buttons
    let legendActualContainer = legendGroup.append('div')
        .attr('class', 'legend-actual-container')

    legendGroup.append('hr')

    let legendCIItem = legendGroup.append('div')
        .attr('class', 'legend-ci-container')
        .append('div')
        .attr('class', 'item')

    legendCIItem.append('span').text('CI')
    let legendCIButtons = legendCIItem.append('span')
        .attr('class', 'legend-ci-buttons')

    legendGroup.append('hr')
    legendGroup.append('div')
      .attr('class', 'legend-prediction-container')

    // Add rows for actual lines
    this.actualItems = [
      {
        id: 'legend-actual',
        color: palette.actual,
        text: 'Actual',
        tooltipHTML: util.legendTooltip({
          name: 'Actual Data',
          description: 'Latest data available for the week'
        })
      },
      {
        id: 'legend-observed',
        color: palette.observed,
        text: 'Observed',
        tooltipHTML: util.legendTooltip({
          name: 'Observed Data',
          description: 'Data available for weeks when the predictions were made'
        })
      },
      {
        id: 'legend-history',
        color: palette['history-highlight'],
        text: 'History',
        tooltipHTML: util.legendTooltip({
          name: 'Historical Data',
          description: 'Toggle historical data lines'
        })
      }
    ].map(data => {
      let item = legendActualContainer.append('div')
          .attr('class', 'item')
          .attr('id', data.id)

      item.append('i')
        .attr('class', 'fa fa-circle')
        .style('color', data.color)

      item.append('span')
        .attr('class', 'item-title')
        .text(data.text)

      item
        .on('mouseover', function () {
          tooltip.style('display', null)
        })
        .on('mouseout', function () {
          tooltip.style('display', 'none')
        })
        .on('mousemove', function () {
          tooltip
            .style('top', (d3.event.pageY + 15) + 'px')
            .style('left', (d3.event.pageX - 150 - 15) + 'px')
            .html(data.tooltipHTML)
        })
      return item
    })

    // Add extra props to history item
    let historyItem = this.actualItems[2]
    historyItem.style('cursor', 'pointer')
    this.historyIcon = historyItem.select('i')

    historyItem
      .on('click', function () {
        eventHook('legend:history')
      })

    // Add confidence buttons
    this.confButtons = confidenceIntervals.map((c, idx) => {
      let confButton = legendCIButtons.append('span')
          .attr('class', 'ci-button')
          .style('cursor', 'pointer')
          .text(c)

      confButton
        .on('click', function () {
          legendCIButtons.selectAll('.ci-button')
            .classed('selected', false)
          d3.select(this).classed('selected', true)

          eventHook('legend:ci', idx)
        })
        .on('mouseover', function () {
          tooltip.style('display', null)
        })
        .on('mouseout', function () {
          tooltip.style('display', 'none')
        })
        .on('mousemove', function () {
          tooltip
            .style('top', (d3.event.pageY + 15) + 'px')
            .style('left', (d3.event.pageX - 150 - 15) + 'px')
            .html(util.legendTooltip({
              name: 'Confidence Interval',
              description: 'Select confidence interval for prediction markers'
            }))
        })
      return confButton
    })

    this.tooltip = tooltip
    this.drawerSelection = legendGroup
  }

  toggleHistoryIcon () {
    let isActive = this.historyIcon.classed('fa-circle')

    this.historyIcon.classed('fa-circle', !isActive)
    this.historyIcon.classed('fa-circle-o', isActive)
  }

  toggleConfidenceBtn (idx) {
    let btn = this.confButtons[idx]
    btn.classed('selected', !btn.classed('selected'))
  }

  toggleDrawer () {
    //
  }

  plot (predictions, predictionsShow, eventHook) {
    let predictionContainer = this.drawerSelection.select('.legend-prediction-container')

    // Clear entries
    predictionContainer.selectAll('*').remove()

    // Meta data info tooltip
    let tooltip = this.tooltip

    // Add prediction items
    predictions.forEach(p => {
      let predItem = predictionContainer.append('div')
          .attr('class', 'item')
          .attr('id', 'legend-' + p.id)
          .style('cursor', 'pointer')

      let predIcon = predItem.append('i')
          .attr('class', 'fa')
          .style('color', p.color)

      let showThis = predictionsShow[p.id]
      predIcon.classed('fa-circle', showThis)
      predIcon.classed('fa-circle-o', !showThis)

      predItem.append('span')
        .attr('class', 'item-title')
        .html(p.id)

      let urlItem = predItem.append('a')
          .attr('href', p.meta.url)
          .attr('target', '_blank')
          .append('i')
          .attr('class', 'fa fa-external-link model-url')
          .style('color', p.color)

      urlItem
        .on('mousemove', function () {
          tooltip.style('display', 'none')
        })
        .on('click', function () {
          d3.event.stopPropagation()
        })

      predItem
        .on('click', function () {
          let isActive = predIcon.classed('fa-circle')

          predIcon.classed('fa-circle', !isActive)
          predIcon.classed('fa-circle-o', isActive)

          eventHook(p.id, isActive)
        })

      predItem
        .on('mouseover', function () {
          tooltip.style('display', null)
        })
        .on('mouseout', function () {
          tooltip.style('display', 'none')
        })
        .on('mousemove', function () {
          tooltip
            .style('top', (d3.event.pageY + 15) + 'px')
            .style('left', (d3.event.pageX - 150 - 15) + 'px')
            .html(util.legendTooltip(p.meta))
        })
    })
  }

  update (predictions) {
    predictions.forEach(p => {
      let pDiv = this.drawerSelection.select('#legend-' + p.id)
      pDiv.classed('na', p.hidden)
    })
  }
}

/**
 * Stats nav drawer
 */
// class StatsDrawer {
//   constructor (panelSelection, tooltip, eventHook) {
//     let statsGroup = panelSelection.append('div')
//         .attr('class', 'stats nav-drawer')
//   }
// }

/**
 * Chart controls
 * nav-drawers and buttons
 */
export class ControlPanel {
  constructor (parent, panelHook) {
    // Main panel selection
    let panelSelection = parent.elementSelection.append('div')
        .attr('class', 'd3-foresight-controls')

    // Buttons on the side of panel
    this.controlButtons = new ControlButtons(panelSelection, parent.btnTooltip, event => {
      if (['btn:next', 'btn:prev'].includes(event)) {
        // Simple triggers, pass directly
        panelHook(event)
      } else {
        if (event === 'btn:legend') {
          //
        } else if (event === 'btn:stats') {
          //
        }
      }
    })

    // Turn on legend by default
    this.controlButtons.toggleLegendBtn()

    // Add legend drawer
    this.legendDrawer = new LegendDrawer(
      panelSelection,
      parent.legendTooltip,
      parent.confidenceIntervals,
      (event, payload) => {
        if (event === 'legend:history') {
          this.legendDrawer.toggleHistoryIcon()
          panelHook(event)
        } else {
          panelHook(event, payload)
        }
      })

    // Set value of historical line selection and default confidence
    this.legendDrawer.toggleConfidenceBtn(parent.cid)
  }

  plot (parent, panelHook) {
    this.legendDrawer.plot(parent.predictions, parent.predictionsShow, (event, payload) => {
      panelHook(event, payload)
    })
  }

  update (predictions) {
    this.legendDrawer.update(predictions)
  }
}

/**
 * Baseline
 */
export class Baseline {
  constructor (parent) {
    let group = parent.svg.append('g')
      .attr('class', 'baseline-group')

    group.append('line')
      .attr('x1', 0)
      .attr('y1', parent.height)
      .attr('x2', parent.width)
      .attr('y2', parent.height)
      .attr('class', 'baseline')

    let text = group.append('text')
        .attr('class', 'title')
        .attr('transform', `translate(${parent.width + 10}, 0)`)
    text.append('tspan')
      .text('CDC')
      .attr('x', 0)
    text.append('tspan')
      .text('Baseline')
      .attr('x', 0)
      .attr('dy', '1em')

    this.group = group
  }

  plot (parent, data) {
    if (data) this.show()
    else {
      this.hide()
      return
    }

    this.group.select('.baseline')
      .transition()
      .duration(300)
      .attr('y1', parent.yScale(data))
      .attr('y2', parent.yScale(data))

    this.group.select('.title')
      .transition()
      .duration(300)
      .attr('dy', parent.yScale(data))
  }

  // Hide baseline
  hide () {
    this.group
      .style('visibility', 'hidden')
  }

  // Show baseline
  show () {
    this.group
      .style('visibility', null)
  }
}

/**
 * Actual line
 */
export class Actual {
  constructor (parent) {
    let group = parent.svg.append('g')
        .attr('class', 'actual-group')

    group.append('path')
      .attr('class', 'line-actual')

    this.group = group
  }

  plot (parent, data) {
    let line = d3.line()
        .x(d => parent.xScaleWeek(d.week % 100))
        .y(d => parent.yScale(d.data))

    // Save data for queries
    this.data = data

    this.group.select('.line-actual')
      .datum(this.data.filter(d => d.data !== -1))
      .transition()
      .duration(200)
      .attr('d', line)

    // Only plot non -1
    let circles = this.group.selectAll('.point-actual')
        .data(this.data.filter(d => d.data !== -1))

    circles.exit().remove()

    circles.enter().append('circle')
      .merge(circles)
      .attr('class', 'point-actual')
      .transition(200)
      .ease(d3.easeQuadOut)
      .attr('cx', d => parent.xScaleWeek(d.week % 100))
      .attr('cy', d => parent.yScale(d.data))
      .attr('r', 2)
  }

  query (idx) {
    return this.data[idx].data
  }
}

/**
 * Observed (at the time of prediction) line
 */
export class Observed {
  constructor (parent) {
    let group = parent.svg.append('g')
        .attr('class', 'observed-group')

    group.append('path')
      .attr('class', 'line-observed')

    this.group = group
  }

  plot (parent, data) {
    // Save data for queries and updates
    this.data = data
    this.xScale = parent.xScaleWeek
    this.yScale = parent.yScale
    this.weeks = parent.weeks
  }

  query (idx) {
    try {
      return this.filteredData[idx].data
    } catch (e) {
      return false
    }
  }

  update (idx) {
    let filteredData = []

    for (let i = 0; i <= idx; i++) {
      filteredData.push({
        week: this.data[idx - i].week,
        data: this.data[idx - i].data.filter(d => d.lag === i)[0].value
      })
    }

    let circles = this.group.selectAll('.point-observed')
        .data(filteredData)

    circles.exit().remove()

    circles.enter().append('circle')
      .merge(circles)
      .attr('class', 'point-observed')
      .transition()
      .duration(200)
      .ease(d3.easeQuadOut)
      .attr('cx', d => this.xScale(d.week % 100))
      .attr('cy', d => this.yScale(d.data))
      .attr('r', 2)

    let line = d3.line()
        .x(d => this.xScale(d.week % 100))
        .y(d => this.yScale(d.data))

    this.group.select('.line-observed')
      .datum(filteredData)
      .transition()
      .duration(200)
      .attr('d', line)

    filteredData.reverse()
    this.filteredData = filteredData
  }
}
