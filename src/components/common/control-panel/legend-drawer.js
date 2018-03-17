import * as ev from '../../../events'
import palette from '../../../styles/palette.json'
import DrawerRow from './drawer-row'
import ToggleButtons from './toggle-buttons'
import Component from '../../component'
import SearchBox from './search-box'

/**
 * Legend nav drawer
 */
export default class LegendDrawer extends Component {
  constructor (config, confidenceIntervals, tooltip) {
    super()

    this.selection.classed('legend nav-drawer', true)

    // Items above the controls (actual, observed, history)
    let actualContainer = this.selection.append('div')
        .attr('class', 'legend-actual-container')

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
      config.actual,
      config.observed,
      config.history
    ]

    let rowsToShow = actualItems.filter((item, idx) => flags[idx])

    // Add rows for actual lines
    rowsToShow.forEach(data => {
      let drawerRow = new DrawerRow(data.text, data.color)
      drawerRow.addOnClick(({ id, state }) => {
        ev.publish(ev.LEGEND_ITEM, { id, state })
      })
      drawerRow.addTooltip(data.tooltipData, tooltip, 'left')
      drawerRow.active = true
      actualContainer.append(() => drawerRow.node)
    })

    // Control buttons (CI, show/hide, search)
    let controlContainer = this.selection.append('div')
        .attr('class', 'legend-control-container')

    if (config.ci) {
      let ciItem = controlContainer.append('div')
          .attr('class', 'item control-item')
      ciItem.append('span').text('CI')

      let ciValues = [...confidenceIntervals, 'none']
      this.ciButtons = new ToggleButtons(ciValues)
      this.ciButtons.addTooltip({
        title: 'Confidence Interval',
        text: 'Select confidence interval for prediction markers'
      }, tooltip, 'left')

      this.ciButtons.addOnClick(({ idx }) => {
        ev.publish(ev.LEGEND_CI, { idx: (ciValues.length - 1) === idx ? null : idx })
      })
      ciItem.append(() => this.ciButtons.node)
    }

    // Show / hide all
    let showHideItem = controlContainer.append('div')
        .attr('class', 'item control-item')
    showHideItem.append('span').text('Show')

    this.showHideButtons = new ToggleButtons(['all', 'none'])
    this.showHideButtons.addTooltip({
      title: 'Toggle visibility',
      text: 'Show / hide all predictions'
    }, tooltip, 'left')
    this.showHideButtons.addOnClick(({ idx }) => {
      this.showHideAllItems(idx === 0)
    })
    showHideItem.append(() => this.showHideButtons.node)

    // Add search box
    this.searchBox = new SearchBox()
    controlContainer.append(() => this.searchBox.node)

    // Prediction items
    this.predictionContainer = this.selection.append('div')
      .attr('class', 'legend-prediction-container')

    this.tooltip = tooltip
  }

  setCiBtn (idx) {
    this.ciButtons.set(idx)
  }

  // Show / hide the "row items divs" while filtering with the search box
  showRows (states) {
    this.rows.forEach((row, idx) => {
      row.hidden = !states[idx]
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
    // Don't show search bar if predictions are less than or equal to maxNPreds
    let maxNPreds = 10
    if (predictions.length > maxNPreds) {
      this.searchBox.hidden = false

      // Bind search event
      this.searchBox.addKeyup(({ text }) => {
        let searchBase = predictions.map(p => {
          return `${p.id} ${p.meta.name} ${p.meta.description}`.toLowerCase()
        })
        this.showRows(searchBase.map(sb => sb.includes(text)))
      })
    } else {
      this.searchBox.hidden = true
    }

    // Add prediction items
    this.predictionContainer.selectAll('*').remove()
    this.rows = predictions.map(p => {
      let drawerRow = new DrawerRow(p.id, p.color)
      drawerRow.addLink(p.meta.url, this.tooltip)

      drawerRow.addOnClick(({ id, state }) => {
        this.showHideButtons.reset()
        ev.publish(ev.LEGEND_ITEM, { id, state })
      })

      drawerRow.addTooltip({
        title: p.meta.name,
        text: p.meta.description
      }, this.tooltip, 'left')

      drawerRow.active = !p.hidden
      this.predictionContainer.append(() => drawerRow.node)
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
