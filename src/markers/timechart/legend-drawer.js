import * as d3 from 'd3'
import * as util from '../../utils/timechart'
import palette from '../../styles/palette.json'

/**
 * Legend nav drawer
 * @param panelSelection - D3 selection from controlpanel
 * @param tooltip - Legend tooltip
 * @param confidenceIntervals - List of confidence intervals
 * @param eventHook - Event hook callback to be used by controlpanel
 */
export class LegendDrawer {
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
    if (this.drawerSelection.style('display') === 'none') {
      this.drawerSelection.style('display', null)
    } else {
      this.drawerSelection.style('display', 'none')
    }
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
