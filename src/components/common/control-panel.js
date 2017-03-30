import * as d3 from 'd3'
import palette from '../../styles/palette.json'

/**
 * Side buttons in control panel
 */
class ControlButtons {
  constructor (panelSelection, infoTooltip, eventHook) {
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
        .on('mouseover', () => infoTooltip.show())
        .on('mouseout', () => infoTooltip.hide())
        .on('mousemove', () => {
          infoTooltip.renderText({
            title: null,
            text: data.tooltipText
          })
          infoTooltip.move({
            x: d3.event.pageX,
            y: d3.event.pageY
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
  constructor (panelSelection, infoTooltip, confidenceIntervals, eventHook) {
    let legendGroup = panelSelection.append('div')
        .attr('class', 'legend nav-drawer')

    // Items above the controls (actual, observed, history)
    let legendActualContainer = legendGroup.append('div')
        .attr('class', 'legend-actual-container')

    // Control buttons (CI, show/hide, search)
    let legendControlContainer = legendGroup.append('div')
        .attr('class', 'legend-control-container')

    let legendCIItem = legendControlContainer.append('div')
        .attr('class', 'item control-item')
    legendCIItem.append('span').text('CI')
    let legendCIButtons = legendCIItem.append('span')

    let legendShowHideItem = legendControlContainer.append('div')
        .attr('class', 'item control-item')
    legendShowHideItem.append('span').text('Show')
    let legendShowHideButtons = legendShowHideItem.append('span')

    // Add filter box
    let legendSearchItem = legendControlContainer.append('div')
        .attr('class', 'item')
    this.searchBox = legendSearchItem.append('input')
      .attr('class', 'input is-small search-input')
      .attr('type', 'text')
      .attr('placeholder', 'Search models')

    // Prediction items
    legendGroup.append('div')
      .attr('class', 'legend-prediction-container')

    // Add rows for actual lines
    this.actualItems = [
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
    ].map(data => {
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
        .on('mousemove', () => {
          infoTooltip.renderText(data.tooltipData)
          infoTooltip.move({
            x: d3.event.pageX,
            y: d3.event.pageY
          }, 'left')
        })
      return item
    })

    // Add extra props to history item
    let historyItem = this.actualItems[2]
    historyItem.style('cursor', 'pointer')
    this.historyIcon = historyItem.select('i')
    historyItem
      .on('click', () => {
        this.toggleHistoryIcon()
        eventHook('legend:history')
      })

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
        .on('mousemove', () => {
          infoTooltip.renderText({
            title: 'Confidence Interval',
            text: 'Select confidence interval for prediction markers'
          })
          infoTooltip.move({
            x: d3.event.pageX,
            y: d3.event.pageY
          }, 'left')
        })
      return confButton
    })

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
        .on('mousemove', () => {
          infoTooltip.renderText({
            title: 'Toggle visibility',
            text: 'Show / hide all predictions'
          })
          infoTooltip.move({
            x: d3.event.pageX,
            y: d3.event.pageY
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

    // Bind search event
    this.searchBox.keyup = null
    this.searchBox.on('keyup', function () {
      // Do a full text search on key event
      let searchBase = predictions.map(p => {
        return `${p.id} ${p.meta.name} + ${p.meta.description}`.toLowerCase()
      })
      that.showRows(searchBase.map(sb => sb.includes(this.value.toLowerCase())))
    })

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
          .style('color', p.color)

      urlItem
        .on('mousemove', infoTooltip.hide())
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
        .on('mousemove', () => {
          infoTooltip.renderText({
            title: p.meta.name,
            text: p.meta.description
          })
          infoTooltip.move({
            x: d3.event.pageX,
            y: d3.event.pageY
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
  constructor (panelSelection, infoTooltip) {
    this.drawerSelection = panelSelection.append('div')
      .attr('class', 'stats nav-drawer')

    // TODO Don't write stuff here
    this.infoTooltip = infoTooltip
    this.statsMeta = [
      {
        id: 'mae',
        name: 'Mean Absolute Error',
        url: 'https://en.wikipedia.org/wiki/Mean_absolute_error',
        bestFunc: Math.min
      }, {
        id: 'log',
        name: 'Mean Log Score',
        url: 'https://en.wikipedia.org/wiki/Scoring_rule#Logarithmic_scoring_rule',
        bestFunc: Math.max
      }
    ]

    // Use log score as default
    this.selectedStat = 1
  }

  toggleDrawer () {
    if (this.drawerSelection.style('display') === 'none') {
      this.drawerSelection.style('display', null)
    } else {
      this.drawerSelection.style('display', 'none')
    }
  }

  plot (modelIds, modelMeta, stats, colors) {
    this.drawerSelection.selectAll('*').remove()

    let heading = this.drawerSelection.append('div')
        .attr('class', 'stat-heading')

    // Assume if one model has no stats, no one has
    if (stats[0]) {
      // Formatted stuff
      let statsData = {}
      let statsMeta = this.statsMeta[this.selectedStat]
      let keys = ['oneWk', 'twoWk', 'threeWk', 'fourWk']

      let data = stats.map(s => s[statsMeta.id])
      statsData = data.map(d => {
        let ob = {}
        keys.forEach(key => {
          ob[key] = {
            value: d[key] ? d[key].toFixed(2) : 'NA',
            best: false
          }
        })
        return ob
      })

      // Apply properties to best item
      // Don't go for it when value is null
      if (data[0]['oneWk']) {
        keys.forEach(key => {
          let perKey = data.map(d => d[key])
          let bestIdx = perKey.indexOf(statsMeta.bestFunc(...perKey))
          statsData[bestIdx][key].best = true
        })
      }

      // Create header
      let headerSpan = heading.append('span')
      this.previousBtn = headerSpan.append('a')
        .attr('class', 'stat-btn button is-small previous-stat-btn')
        .on('click', () => {
          this.selectedStat = Math.max(this.selectedStat - 1, 0)
          this.plot(modelIds, modelMeta, stats, colors)
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
          this.plot(modelIds, modelMeta, stats, colors)
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
      // Create Tables
      let table = tableWrapper.append('table')
          .attr('class', 'table is-striped is-bordered')

      let thead = table.append('thead')
      thead.append('tr')
        .html(`<th class="center">Model</th>
               <th colspan="4" class="center">Weekly predictions</th>`)

      thead.append('tr')
        .html(`<th></th>
               <th>1 wk</th>
               <th>2 wk</th>
               <th>3 wk</th>
               <th>4 wk</th>`)

      let tbody = table.append('tbody')

      this.rows = modelIds.map((id, index) => {
        let statsItem = statsData[index]
        let tr = tbody.append('tr')
        tr.html(`<td style="color:${colors[index]}"> ${id} </td>
          <td class="${statsItem.oneWk.best ? 'bold' : ''}">${statsItem.oneWk.value}</td>
          <td class="${statsItem.twoWk.best ? 'bold' : ''}">${statsItem.twoWk.value}</td>
          <td class="${statsItem.threeWk.best ? 'bold' : ''}">${statsItem.threeWk.value}</td>
          <td class="${statsItem.fourWk.best ? 'bold' : ''}">${statsItem.fourWk.value}</td>`)

        tr.select('td')
          .on('mouseover', () => this.infoTooltip.show())
          .on('mouseout', () => this.infoTooltip.hide())
          .on('mousemove', () => {
            this.infoTooltip.renderText({
              title: modelMeta[index].name,
              text: modelMeta[index].description
            })
            this.infoTooltip.move({
              x: d3.event.pageX,
              y: d3.event.pageY
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
  constructor (parent, panelHook) {
    // Main panel selection
    let panelSelection = parent.elementSelection.append('div')
        .attr('class', 'd3-foresight-controls')

    // Add legend drawer
    this.legendDrawer = new LegendDrawer(
      panelSelection,
      parent.infoTooltip,
      parent.confidenceIntervals,
      panelHook
    )

    // Set value of historical line selection and default confidence
    this.legendDrawer.toggleConfidenceBtn(parent.cid)

    // Model statistics drawer
    this.statsDrawer = new StatsDrawer(panelSelection, parent.infoTooltip)
    this.statsDrawer.toggleDrawer()

    // Buttons on the side of panel
    this.controlButtons = new ControlButtons(panelSelection, parent.infoTooltip, event => {
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
    })

    // Turn on legend by default
    this.controlButtons.toggleLegendBtn()
  }

  plot (parent, panelHook) {
    this.legendDrawer.plot(parent.predictions, panelHook)

    this.statsDrawer.plot(
      parent.predictions.map(p => p.id),
      parent.predictions.map(p => p.meta),
      parent.modelStats,
      parent.predictions.map(p => p.color))
  }

  update (predictions) {
    this.legendDrawer.update(predictions)
  }
}
