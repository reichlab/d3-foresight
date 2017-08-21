import * as d3 from 'd3'
import palette from '../../styles/palette.json'
import * as mutils from '../../utilities/misc'

/**
 * Side buttons in control panel
 */
class ControlButtons {
  constructor (panelSelection, infoTooltip, panelConfig, eventHook) {
    let navControls = panelSelection.append('div')
        .attr('class', 'nav-controls')

    let buttonData = [
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
    ]

    if (!panelConfig.stats) {
      buttonData.splice(1, 1)
    }

    // Save all the buttons for toggling state and stuff
    this.buttons = buttonData.map(data => {
      let btn = navControls.append('a')
          .attr('class', 'button is-small is-info is-outlined')
      btn.append('span')
        .attr('class', 'icon is-small')
        .append('i')
        .attr('class', `fa ${data.icon}`)
      btn
        .on('mouseover', () => infoTooltip.show())
        .on('mouseout', () => infoTooltip.hide())
        .on('mousemove', function () {
          infoTooltip.renderText({
            title: null,
            text: data.tooltipText
          })
          let pos = mutils.getMousePosition(d3.select(this))
          infoTooltip.move({
            x: pos[0],
            y: pos[1]
          }, 'left')
        })
        .on('click', () => eventHook(data.event))
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
 * @param infoTooltip
 * @param confidenceIntervals - List of confidence intervals
 * @param eventHook - Event hook callback to be used by controlpanel
 */
class LegendDrawer {
  constructor (panelSelection, confidenceIntervals, panelConfig, infoTooltip, eventHook) {
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
      .attr('placeholder', 'Search models')

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
        .attr('class', 'fa fa-circle')
        .style('color', data.color)

      item.append('span')
        .attr('class', 'item-title')
        .text(data.text)

      item
        .on('mouseover', () => infoTooltip.show())
        .on('mouseout', () => infoTooltip.hide())
        .on('mousemove', function () {
          infoTooltip.renderText(data.tooltipData)
          let pos = mutils.getMousePosition(d3.select(this))
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
          eventHook('legend:history')
        })
    }

    if (panelConfig.ci) {
      // Add confidence buttons
      this.confButtons = confidenceIntervals.map((c, idx) => {
        let confButton = legendCIButtons.append('span')
            .attr('class', 'toggle-button')
            .style('cursor', 'pointer')
            .text(c)

        confButton
          .on('click', function () {
            legendCIButtons.selectAll('.toggle-button')
              .classed('selected', false)
            d3.select(this).classed('selected', true)

            eventHook('legend:ci', idx)
          })
          .on('mouseover', () => infoTooltip.show())
          .on('mouseout', () => infoTooltip.hide())
          .on('mousemove', function () {
            infoTooltip.renderText({
              title: 'Confidence Interval',
              text: 'Select confidence interval for prediction markers'
            })
            let pos = mutils.getMousePosition(d3.select(this))
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
          let pos = mutils.getMousePosition(d3.select(this))
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

  plot (predictions, eventHook) {
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
          .attr('class', 'fa')
          .style('color', p.color)

      let showThis = !p.hidden
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

      urlItem
        .on('mousemove', function () {
          d3.event.stopPropagation()
          infoTooltip.renderText({
            text: 'Show details'
          })
          let pos = mutils.getMousePosition(d3.select(this))
          infoTooltip.move({
            x: pos[0],
            y: pos[1]
          }, 'left')
        })
        .on('click', () => d3.event.stopPropagation())

      predItem
        .on('click', () => {
          let isActive = predIcon.classed('fa-circle')

          predIcon.classed('fa-circle', !isActive)
          predIcon.classed('fa-circle-o', isActive)

          // Reset show all/none buttons on any of these clicks
          this.resetShowHideButtons()
          eventHook(p.id, isActive)
        })

      predItem
        .on('mouseover', () => infoTooltip.show())
        .on('mouseout', () => infoTooltip.hide())
        .on('mousemove', function () {
          infoTooltip.renderText({
            title: p.meta.name,
            text: p.meta.description
          })
          let pos = mutils.getMousePosition(d3.select(this))
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
 * Stats nav drawer
 */
class StatsDrawer {
  constructor (panelSelection, statsMeta, infoTooltip) {
    this.drawerSelection = panelSelection.append('div')
      .attr('class', 'stats nav-drawer')

    this.infoTooltip = infoTooltip
    this.statsMeta = statsMeta
    // Use last stat as default
    this.selectedStat = statsMeta.length - 1
  }

  toggleDrawer () {
    if (this.drawerSelection.style('display') === 'none') {
      this.drawerSelection.style('display', null)
    } else {
      this.drawerSelection.style('display', 'none')
    }
  }

  plot (predictions) {
    this.drawerSelection.selectAll('*').remove()

    let heading = this.drawerSelection.append('div')
        .attr('class', 'stat-heading')

    let modelStats = predictions.map(p => p.stats)
    let modelIds = predictions.map(p => p.id)
    let modelMeta = predictions.map(p => p.meta)
    let modelColors = predictions.map(p => p.color)

    // Assume if one model has no stats, no one has
    if (modelStats.length > 0) {
      // Formatted stuff
      let statsMeta = this.statsMeta[this.selectedStat]

      if (modelStats[0] === null) {
        heading.append('span').text('No data found')
        return
      }

      let selectedModelStats = modelStats.map(s => s[statsMeta.id])
      let statsData = selectedModelStats.map(ms => {
        return ms.map(value => {
          return {
            value: value ? parseFloat(value.toFixed(2)) : 0,
            best: false
          }
        })
      })

      // Get the best item from each column
      for (let colIdx = 0; colIdx < statsData[0].length; colIdx++) {
        let column = statsData.map(row => row[colIdx].value)
        let bestIdx = column.indexOf(statsMeta.bestFunc(...column))
        statsData[bestIdx][colIdx].best = true
      }

      // Create header
      let headerSpan = heading.append('span')
      this.previousBtn = headerSpan.append('a')
        .attr('class', 'stat-btn button is-small previous-stat-btn')
        .on('click', () => {
          this.selectedStat = Math.max(this.selectedStat - 1, 0)
          this.plot(predictions)
        })

      this.previousBtn.append('span')
        .attr('class', 'icon is-small')
        .append('i')
        .attr('class', 'fa fa-arrow-left')

      headerSpan.append('a')
        .attr('href', statsMeta.url)
        .attr('target', '_blank')
        .text(statsMeta.name)

      this.nextBtn = headerSpan.append('a')
        .attr('class', 'stat-btn button is-small next-stat-btn')
        .on('click', () => {
          this.selectedStat = Math.min(this.selectedStat + 1, this.statsMeta.length - 1)
          this.plot(predictions)
        })

      this.nextBtn.append('span')
        .attr('class', 'icon is-small')
        .append('i')
        .attr('class', 'fa fa-arrow-right')

      if (this.selectedStat === 0) {
        this.previousBtn.classed('is-disabled', true)
      } else if (this.selectedStat === (this.statsMeta.length - 1)) {
        this.nextBtn.classed('is-disabled', true)
      }

      let tableWrapper = this.drawerSelection.append('div')
          .attr('class', 'table-wrapper')
      let table = tableWrapper.append('table')
          .attr('class', 'table is-striped is-bordered')
      let thead = table.append('thead')
      thead.append('tr')
        .html(['<th>Model</th>', ...statsMeta.header.map(d => `<th>${d}</th>`)].join(''))
      let tbody = table.append('tbody')

      this.rows = modelIds.map((id, index) => {
        let tr = tbody.append('tr')
        let row = [
          `<td style="color:${modelColors[index]}"> ${id} </td>`,
          ...statsData[index].map(sd => {
            return `<td class="${sd.best ? 'bold' : ''}">${sd.value}</td>`
          })
        ]
        tr.html(row.join(''))

        let ttip = this.infoTooltip

        tr.select('td')
          .on('mouseover', () => ttip.show())
          .on('mouseout', () => ttip.hide())
          .on('mousemove', function () {
            ttip.renderText({
              title: modelMeta[index].name,
              text: modelMeta[index].description
            })
            let pos = mutils.getMousePosition(d3.select(this))
            ttip.move({
              x: pos[0],
              y: pos[1]
            }, 'left')
          })
        return tr
      })

      this.drawerSelection.append('div')
        .attr('class', 'stat-disclaimer')
        .html(`Calculated using the most recently updated data.<br>
               Final values may differ`)
    } else {
      heading.append('span').text('No data found')
    }
  }
}

/**
 * Chart controls
 * nav-drawers and buttons
 */
export default class ControlPanel {
  constructor (parent, panelConfig, panelHook) {
    // Main panel selection
    let panelSelection = parent.elementSelection.append('div')
        .attr('class', 'd3-foresight-controls')

    this.config = panelConfig

    // Add legend drawer
    this.legendDrawer = new LegendDrawer(
      panelSelection,
      parent.config.confidenceIntervals,
      this.config,
      parent.infoTooltip,
      panelHook
    )

    if (this.config.ci) {
      this.legendDrawer.toggleConfidenceBtn(parent.cid)
    }

    if (this.config.stats) {
      // Model statistics drawer
      this.statsDrawer = new StatsDrawer(
        panelSelection, parent.config.statsMeta, parent.infoTooltip
      )
      this.statsDrawer.toggleDrawer()
    }

    // Buttons on the side of panel
    this.controlButtons = new ControlButtons(
      panelSelection, parent.infoTooltip, this.config, event => {
        if (['btn:next', 'btn:back'].includes(event)) {
          // Simple triggers, pass directly
          panelHook(event)
        } else {
          if (event === 'btn:legend') {
            this.legendDrawer.toggleDrawer()
            this.controlButtons.toggleLegendBtn()
          } else if (event === 'btn:stats') {
            this.statsDrawer.toggleDrawer()
            this.controlButtons.toggleStatsBtn()
          }
        }
      }
    )

    // Turn on legend by default
    this.controlButtons.toggleLegendBtn()
  }

  plot (predictions, panelHook) {
    this.legendDrawer.plot(predictions, panelHook)
    if (this.config.stats) {
      this.statsDrawer.plot(predictions)
    }
  }

  update (predictions) {
    this.legendDrawer.update(predictions)
    if (this.config.stats) {
      this.statsDrawer.plot(predictions)
    }
  }
}
