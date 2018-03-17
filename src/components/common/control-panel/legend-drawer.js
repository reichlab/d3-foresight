import * as d3 from 'd3'
import * as ev from '../../../events'
import palette from '../../../styles/palette.json'
import { moveTooltipTo } from '../../../utilities/mouse'
import DrawerRow from './drawer-row'

/**
 * Legend nav drawer
 * @param panelSelection - D3 selection from controlpanel
 * @param infoTooltip
 * @param confidenceIntervals - List of confidence intervals
 */
export default class LegendDrawer {
  constructor (panelSelection, confidenceIntervals, panelConfig, infoTooltip) {
    let legendGroup = panelSelection.append('div')
        .attr('class', 'legend nav-drawer')

    // Items above the controls (actual, observed, history)
    let legendActualContainer = legendGroup.append('div')
        .attr('class', 'legend-actual-container')

    // Control buttons (CI, show/hide, search)
    let legendControlContainer = legendGroup.append('div')
        .attr('class', 'legend-control-container')

    let legendCIItem, legendCIButtons
    if (panelConfig.ci) {
      legendCIItem = legendControlContainer.append('div')
        .attr('class', 'item control-item')
      legendCIItem.append('span').text('CI')
      legendCIButtons = legendCIItem.append('span')
    }

    let legendShowHideItem = legendControlContainer.append('div')
        .attr('class', 'item control-item')
    legendShowHideItem.append('span').text('Show')
    let legendShowHideButtons = legendShowHideItem.append('span')

    // Add filter box
    this.legendSearchItem = legendControlContainer.append('div')
      .attr('class', 'item')
      .style('display', 'none')
    this.searchBox = this.legendSearchItem.append('input')
      .attr('class', 'input is-small search-input')
      .attr('type', 'text')
      .attr('placeholder', 'Filter models')

    // Prediction items
    legendGroup.append('div')
      .attr('class', 'legend-prediction-container')

    let actualItems = [
      {
        color: palette.actual,
        text: 'Actual',
        tooltipData: {
          title: 'Actual Data',
          text: 'Latest data available for the week'
        }
      },
      {
        color: palette.observed,
        text: 'Observed',
        tooltipData: {
          title: 'Observed Data',
          text: 'Data available for weeks when the predictions were made'
        }
      },
      {
        color: palette['history-highlight'],
        text: 'History',
        tooltipData: {
          title: 'Historical Data',
          text: 'Toggle historical data lines'
        }
      }
    ]

    let flags = [
      panelConfig.actual,
      panelConfig.observed,
      panelConfig.history
    ]

    let rowsToShow = actualItems.filter((item, idx) => flags[idx])

    // Add rows for actual lines
    rowsToShow.forEach(data => {
      let drawerRow = new DrawerRow(data.text, data.color)
      drawerRow.addToggle(({ id, state }) => {
        ev.publish(ev.LEGEND_ITEM, { id, state })
      })
      drawerRow.addTooltip(data.tooltipData, infoTooltip)
      legendActualContainer.append(() => drawerRow.node)
    })

    if (panelConfig.ci) {
      this.confButtons = [...confidenceIntervals, 'none'].map((c, idx) => {
        let confButton = legendCIButtons.append('span')
            .attr('class', 'toggle-button')
            .style('cursor', 'pointer')
            .text(c)

        confButton
          .on('click', function () {
            legendCIButtons.selectAll('.toggle-button')
              .classed('selected', false)
            d3.select(this).classed('selected', true)
            ev.publish(ev.LEGEND_CI, { ci: c === 'none' ? null : idx })
          })
          .on('mouseover', () => infoTooltip.show())
          .on('mouseout', () => infoTooltip.hide())
          .on('mousemove', function () {
            infoTooltip.renderText({
              title: 'Confidence Interval',
              text: 'Select confidence interval for prediction markers'
            })
            moveTooltipTo(infoTooltip, d3.select(this), 'left')
          })
        return confButton
      })
    }

    let that = this

    // Show / hide all
    this.showHideButtons = ['all', 'none'].map((c, idx) => {
      let showHideButton = legendShowHideButtons.append('span')
          .attr('class', 'toggle-button')
          .style('cursor', 'pointer')
          .text(c)

      showHideButton
        .on('click', function () {
          // Toggle prediction entries
          that.showHidePredItem(d3.select(this).text() === 'all')

          // Set button active colors
          legendShowHideButtons.selectAll('.toggle-button')
            .classed('selected', false)
          d3.select(this).classed('selected', true)
        })
        .on('mouseover', () => infoTooltip.show())
        .on('mouseout', () => infoTooltip.hide())
        .on('mousemove', function () {
          infoTooltip.renderText({
            title: 'Toggle visibility',
            text: 'Show / hide all predictions'
          })
          moveTooltipTo(infoTooltip, d3.select(this), 'left')
        })
      return showHideButton
    })

    this.infoTooltip = infoTooltip
    this.drawerSelection = legendGroup
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

  // Show / hide the "row items divs" while filtering with the search box
  showRows (visibilityStates) {
    this.rows.forEach((row, idx) => {
      row.hidden = visibilityStates[idx]
    })
  }

  resetShowHideButtons () {
    this.showHideButtons.forEach(button => button.classed('selected', false))
  }

  // Show / hide all the items markers
  showHidePredItem (show) {
    this.rows.forEach(row => {
      if (row.active !== show) {
        row.toggle()
      }
    })
  }

  plot (predictions) {
    // Clear entries
    let predictionContainer = this.drawerSelection.select('.legend-prediction-container')
    predictionContainer.selectAll('*').remove()

    // Meta data info tooltip
    let infoTooltip = this.infoTooltip
    let that = this

    // Don't show search bar if predictions are less than or equal to maxNPreds
    let maxNPreds = 10
    if (predictions.length > maxNPreds) {
      this.legendSearchItem.style('display', null)
      // Bind search event
      this.searchBox.keyup = null
      this.searchBox.on('keyup', function () {
        // Do a full text search on key event
        let searchBase = predictions.map(p => {
          return `${p.id} ${p.meta.name} + ${p.meta.description}`.toLowerCase()
        })
        that.showRows(searchBase.map(sb => sb.includes(this.value.toLowerCase())))
      })
    } else {
      this.legendSearchItem.style('display', 'none')
    }

    // Add prediction items
    this.rows = predictions.map(p => {
      let drawerRow = new DrawerRow(p.id, p.color)
      drawerRow.active = !p.hidden
      drawerRow.addLink(p.meta.url, infoTooltip)

      drawerRow.addToggle(({ id, state }) => {
        this.resetShowHideButtons()
        ev.publish(ev.LEGEND_ITEM, { id, state })
      })

      drawerRow.addTooltip({
        title: p.meta.name,
        text: p.meta.description
      }, infoTooltip)

      predictionContainer.append(() => drawerRow.node)
      return drawerRow
    })
  }

  update (predictions) {
    predictions.forEach(p => {
      let pDiv = this.drawerSelection.select('.legend-item-' + p.id)
      pDiv.classed('na', p.noData)
    })
  }
}
