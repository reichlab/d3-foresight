import * as d3 from 'd3'
import * as ev from '../../../events'
import palette from '../../../styles/palette.json'
import { moveTooltipTo } from '../../../utilities/mouse'
import DrawerRow from './drawer-row'
import ToggleButtons from './toggle-buttons'

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

    let legendCIItem
    if (panelConfig.ci) {
      legendCIItem = legendControlContainer.append('div')
        .attr('class', 'item control-item')
      legendCIItem.append('span').text('CI')
    }

    let legendShowHideItem = legendControlContainer.append('div')
        .attr('class', 'item control-item')
    legendShowHideItem.append('span').text('Show')

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
      drawerRow.addOnClick(({ id, state }) => {
        ev.publish(ev.LEGEND_ITEM, { id, state })
      })
      drawerRow.addTooltip(data.tooltipData, infoTooltip, 'left')
      drawerRow.active = true
      legendActualContainer.append(() => drawerRow.node)
    })

    if (panelConfig.ci) {
      let ciValues = [...confidenceIntervals, 'none']
      this.ciButtons = new ToggleButtons(ciValues)
      this.ciButtons.addTooltip({
        title: 'Confidence Interval',
        text: 'Select confidence interval for prediction markers'
      }, infoTooltip, 'left')

      this.ciButtons.addOnClick(({ idx }) => {
        ev.publish(ev.LEGEND_CI, { idx: (ciValues.length - 1) === idx ? null : idx })
      })
      legendCIItem.append(() => this.ciButtons.node)
    }

    // Show / hide all
    this.showHideButtons = new ToggleButtons(['all', 'none'])
    this.showHideButtons.addTooltip({
      title: 'Toggle visibility',
      text: 'Show / hide all predictions'
    }, infoTooltip, 'left')
    this.showHideButtons.addOnClick(({ idx }) => {
      this.showHideAllItems(idx === 0)
    })
    legendShowHideItem.append(() => this.showHideButtons.node)

    this.infoTooltip = infoTooltip
    this.drawerSelection = legendGroup
  }

  setCiBtn (idx) {
    this.ciButtons.set(idx)
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

  // Show / hide all the items markers
  showHideAllItems (show) {
    this.rows.forEach(row => {
      if (row.active !== show) {
        row.click()
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
      drawerRow.addLink(p.meta.url, infoTooltip)

      drawerRow.addOnClick(({ id, state }) => {
        this.showHideButtons.reset()
        ev.publish(ev.LEGEND_ITEM, { id, state })
      })

      drawerRow.addTooltip({
        title: p.meta.name,
        text: p.meta.description
      }, infoTooltip, 'left')

      drawerRow.active = !p.hidden
      predictionContainer.append(() => drawerRow.node)
      return drawerRow
    })
  }

  update (predictions) {
    predictions.forEach(p => {
      let row = this.rows.find(r => r.id === p.id)
      if (row) {
        row.na = p.noData
      }
    })
  }
}
