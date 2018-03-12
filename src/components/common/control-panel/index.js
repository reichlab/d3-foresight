import * as d3 from 'd3'
import palette from '../../../styles/palette.json'
import { getMousePosition } from '../../../utilities/mouse'
import * as ev from '../../../events'
import * as PubSub from 'pubsub-js'

/**
 * Side buttons in control panel
 */
class ControlButtons {
  constructor (panelSelection, infoTooltip, panelConfig) {
    let navControls = panelSelection.append('div')
        .attr('class', 'nav-controls')

    let buttonData = [
      {
        name: 'legendBtn',
        iconText: '☰',
        tooltipText: 'Toggle Legend',
        event: ev.TOGGLE_LEGEND
      },
      {
        name: 'backBtn',
        iconText: '🡸',
        tooltipText: 'Move backward',
        event: ev.MOVE_PREV
      },
      {
        name: 'nextBtn',
        iconText: '🡺',
        tooltipText: 'Move forward',
        event: ev.MOVE_NEXT
      }
    ]

    // Save all the buttons for toggling state and stuff
    this.buttons = buttonData.map(data => {
      let btn = navControls.append('a')
          .attr('class', 'button is-small is-info is-outlined')
      btn.append('span')
        .attr('class', 'icon is-small')
        .text(data.iconText)
      btn
        .on('mouseover', () => infoTooltip.show())
        .on('mouseout', () => infoTooltip.hide())
        .on('mousemove', function () {
          infoTooltip.renderText({
            title: null,
            text: data.tooltipText
          })
          let pos = getMousePosition(d3.select(this))
          infoTooltip.move({
            x: pos[0],
            y: pos[1]
          }, 'left')
        })
        .on('click', () => PubSub.publish(data.event, {}))
      navControls.append('br')
      return btn
    })
  }

  toggleLegendBtn () {
    this.buttons[0].classed('is-outlined', !this.buttons[0].classed('is-outlined'))
  }
}

/**
 * Legend nav drawer
 * @param panelSelection - D3 selection from controlpanel
 * @param infoTooltip
 * @param confidenceIntervals - List of confidence intervals
 */
class LegendDrawer {
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
        class: 'legend-item-actual',
        color: palette.actual,
        text: 'Actual',
        tooltipData: {
          title: 'Actual Data',
          text: 'Latest data available for the week'
        }
      },
      {
        class: 'legend-item-observed',
        color: palette.observed,
        text: 'Observed',
        tooltipData: {
          title: 'Observed Data',
          text: 'Data available for weeks when the predictions were made'
        }
      },
      {
        class: 'legend-item-history',
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
    this.actualItems = rowsToShow.map(data => {
      let item = legendActualContainer.append('div')
          .attr('class', `item ${data.id}`)

      item.append('i')
        .style('color', data.color)
        .text('●')

      item.append('span')
        .attr('class', 'item-title')
        .text(data.text)

      item
        .on('mouseover', () => infoTooltip.show())
        .on('mouseout', () => infoTooltip.hide())
        .on('mousemove', function () {
          infoTooltip.renderText(data.tooltipData)
          let pos = getMousePosition(d3.select(this))
          infoTooltip.move({
            x: pos[0],
            y: pos[1]
          }, 'left')
        })
      return item
    })

    if (panelConfig.history) {
      // Add extra props to history item
      let historyItem = this.actualItems[2]
      historyItem.style('cursor', 'pointer')
      this.historyIcon = historyItem.select('i')
      historyItem
        .on('click', () => {
          this.toggleHistoryIcon()
          PubSub.publish(ev.LEGEND_ITEM, { itemName: 'history' })
        })
    }

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
            PubSub.publish(ev.LEGEND_CI, { ci: c === 'none' ? null : idx })
          })
          .on('mouseover', () => infoTooltip.show())
          .on('mouseout', () => infoTooltip.hide())
          .on('mousemove', function () {
            infoTooltip.renderText({
              title: 'Confidence Interval',
              text: 'Select confidence interval for prediction markers'
            })
            let pos = getMousePosition(d3.select(this))
            infoTooltip.move({
              x: pos[0],
              y: pos[1]
            }, 'left')
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
          let pos = getMousePosition(d3.select(this))
          infoTooltip.move({
            x: pos[0],
            y: pos[1]
          }, 'left')
        })
      return showHideButton
    })

    this.infoTooltip = infoTooltip
    this.drawerSelection = legendGroup
  }

  toggleHistoryIcon () {
    if (this.historyIcon.text() === '●') {
      this.historyIcon.text('○')
    } else {
      this.historyIcon.text('●')
    }
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
      if (visibilityStates[idx]) {
        row.style('display', null)
      } else {
        row.style('display', 'none')
      }
    })
  }

  resetShowHideButtons () {
    this.showHideButtons.forEach(button => button.classed('selected', false))
  }

  // Show / hide all the items markers (not the legend div)
  showHidePredItem (show) {
    this.rows.forEach(predItem => {
      if (predItem.select('i').classed('fa-circle') !== show) {
        predItem.on('click')()
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
      let predItem = predictionContainer.append('div')
          .attr('class', `item legend-item-${p.id}`)
          .style('cursor', 'pointer')

      let predIcon = predItem.append('i')
          .style('color', p.color)

      predIcon.text(p.hidden ? '○' : '●')

      predItem.append('span')
        .attr('class', 'item-title')
        .html(p.id)

      let urlItem = predItem.append('a')
          .attr('href', p.meta.url)
          .attr('target', '_blank')
          .attr('class', 'model-url')
          .text('🔗')

      urlItem
        .on('mousemove', function () {
          d3.event.stopPropagation()
          infoTooltip.renderText({
            text: 'Show details'
          })
          let pos = getMousePosition(d3.select(this))
          infoTooltip.move({
            x: pos[0],
            y: pos[1]
          }, 'left')
        })
        .on('click', () => d3.event.stopPropagation())

      predItem
        .on('click', () => {
          let isActive = predIcon.text() === '●'

          predIcon.text(isActive ? '○' : '●')

          // Reset show all/none buttons on any of these clicks
          this.resetShowHideButtons()
          PubSub.publish(ev.LEGEND_ITEM, { itemName: p.id, state: isActive })
        })

      predItem
        .on('mouseover', () => infoTooltip.show())
        .on('mouseout', () => infoTooltip.hide())
        .on('mousemove', function () {
          infoTooltip.renderText({
            title: p.meta.name,
            text: p.meta.description
          })
          let pos = getMousePosition(d3.select(this))
          infoTooltip.move({
            x: pos[0],
            y: pos[1]
          }, 'left')
        })
      return predItem
    })
  }

  update (predictions) {
    predictions.forEach(p => {
      let pDiv = this.drawerSelection.select('.legend-item-' + p.id)
      pDiv.classed('na', p.noData)
    })
  }
}

/**
 * Chart controls
 * nav-drawers and buttons
 */
export default class ControlPanel {
  constructor (parent, panelConfig) {
    // Main panel selection
    let panelSelection = parent.elementSelection.append('div')
        .attr('class', 'd3-foresight-controls')

    this.config = panelConfig

    // Add legend drawer
    this.legendDrawer = new LegendDrawer(
      panelSelection,
      parent.config.confidenceIntervals,
      this.config,
      parent.infoTooltip
    )

    if (this.config.ci) {
      this.legendDrawer.toggleConfidenceBtn(parent.cid)
    }

    // Buttons on the side of panel
    this.controlButtons = new ControlButtons(panelSelection, parent.infoTooltip, this.config)

    PubSub.subscribe(ev.TOGGLE_LEGEND, (msg, data) => {
      this.legendDrawer.toggleDrawer()
      this.controlButtons.toggleLegendBtn()
    })

    // Turn on legend by default
    this.controlButtons.toggleLegendBtn()
  }

  plot (predictions) {
    this.legendDrawer.plot(predictions)
  }

  update (predictions) {
    this.legendDrawer.update(predictions)
  }
}
