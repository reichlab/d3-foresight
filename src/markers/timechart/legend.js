import * as util from '../../utils/timechart'
import * as d3 from 'd3'
import palette from '../../styles/palette.json'

/**
 * Legend and controls
 */
export default class Legend {
  constructor (parent, legendHook) {
    let legendContainer = d3.select('#legend')
    let actualContainer = legendContainer.select('#legend-actual-container')
    let predictionContainer = legendContainer.select('#legend-prediction-container')
    let ciButtons = legendContainer.select('#legend-ci-buttons')

    actualContainer.selectAll('*').remove()
    predictionContainer.selectAll('*').remove()
    ciButtons.selectAll('*').remove()

    let tooltip = parent.legendTooltip

    let actualItem = actualContainer.append('div')
        .attr('class', 'item')
        .attr('id', 'legend-actual')

    actualItem.append('i')
        .attr('class', 'fa fa-circle')
        .style('color', palette.actual)

    actualItem.append('span')
      .attr('class', 'item-title')
      .html('Actual')

    actualItem
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
            name: 'Actual Data',
            description: 'Latest data available for the week'
          }))
      })

    let observedItem = actualContainer.append('div')
        .attr('class', 'item')
        .attr('id', 'legend-observed')

    observedItem.append('i')
      .attr('class', 'fa fa-circle')
      .style('color', palette.observed)

    observedItem.append('span')
      .attr('class', 'item-title')
      .html('Observed')

    observedItem
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
            name: 'Observed Data',
            description: 'Data available for weeks when the predictions were made'
          }))
      })

    let historyItem = actualContainer.append('div')
        .attr('class', 'item')
        .attr('id', 'legend-history')
        .style('cursor', 'pointer')

    let historyIcon = historyItem.append('i')
        .attr('class', 'fa')
        .style('color', palette['history-highlight'])

    historyItem.append('span')
      .attr('class', 'item-title')
      .html('History')

    if (parent.historyShow) historyIcon.classed('fa-circle', true)
    else historyIcon.classed('fa-circle-o', true)

    historyItem
      .on('click', function () {
        let isActive = historyIcon.classed('fa-circle')

        historyIcon.classed('fa-circle', !isActive)
        historyIcon.classed('fa-circle-o', isActive)

        legendHook('legend:history', isActive)
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
            name: 'Historical Data',
            description: 'Toggle historical data lines'
          }))
      })

    // Add confidence buttons
    parent.confidenceIntervals.map((c, idx) => {
      let confButton = ciButtons.append('span')
          .attr('class', 'ci-button')
          .style('cursor', 'pointer')
          .text(c)

      confButton
        .on('click', function () {
          ciButtons.selectAll('.ci-button')
            .classed('selected', false)
          d3.select(this).classed('selected', true)

          legendHook('legend:ci', idx)
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

      // Select first by default
      if (idx === parent.cid) {
        confButton.classed('selected', true)
      }
    })

    // Add prediction items
    parent.predictions.forEach(p => {
      let predItem = predictionContainer.append('div')
          .attr('class', 'item')
          .attr('id', 'legend-' + p.id)
          .style('cursor', 'pointer')

      let predIcon = predItem.append('i')
          .attr('class', 'fa')
          .style('color', p.color)

      let showThis = parent.predictionsShow[p.id]
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

          legendHook(p.id, isActive)
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

    this.tooltip = tooltip
    this.predictionContainer = predictionContainer
  }

  update (predictions) {
    let predictionContainer = this.predictionContainer

    predictions.forEach(p => {
      let pDiv = predictionContainer.select('#legend-' + p.id)
      if (p.hidden) {
        pDiv
          .classed('na', true)
      } else {
        pDiv
          .classed('na', false)
      }
    })
  }
}

