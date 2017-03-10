import * as util from '../utils'
import * as d3 from 'd3'
import palette from '../styles/palette.json'

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

/**
 * Stats nav drawer
 */
class StatsDrawer {
  constructor (panelSelection, tooltip) {
    this.drawerSelection = panelSelection.append('div')
      .attr('class', 'stats nav-drawer')

    // TODO Don't write stuff here
    this.tooltip = tooltip
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
      // TODO allow random stats
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
        .attr('id', 'previous-stat-btn')
        .attr('class', 'stat-btn button is-small')
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
        .attr('id', 'next-stat-btn')
        .attr('class', 'stat-btn button is-small')
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

      // Create main table
      let table = this.drawerSelection.append('table')
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

      // Add actual values
      let tbody = table.append('tbody')

      modelIds.forEach((id, index) => {
        let statsItem = statsData[index]
        let tr = tbody.append('tr')
        tr.html(`<td style="color:${colors[index]}"> ${id} </td>
          <td class="${statsItem.oneWk.best ? 'bold' : ''}">${statsItem.oneWk.value}</td>
          <td class="${statsItem.twoWk.best ? 'bold' : ''}">${statsItem.twoWk.value}</td>
          <td class="${statsItem.threeWk.best ? 'bold' : ''}">${statsItem.threeWk.value}</td>
          <td class="${statsItem.fourWk.best ? 'bold' : ''}">${statsItem.fourWk.value}</td>`)

        tr.select('td')
          .on('mouseover', () => {
            this.tooltip.style('display', null)
          })
          .on('mouseout', () => {
            this.tooltip.style('display', 'none')
          })
          .on('mousemove', () => {
            this.tooltip
              .style('top', (d3.event.pageY + 15) + 'px')
              .style('left', (d3.event.pageX - 150 - 15) + 'px')
              .html(util.legendTooltip(modelMeta[index]))
          })
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

    // Model statistics drawer
    this.statsDrawer = new StatsDrawer(panelSelection, parent.legendTooltip)
    this.statsDrawer.toggleDrawer()

    // Buttons on the side of panel
    this.controlButtons = new ControlButtons(panelSelection, parent.btnTooltip, event => {
      if (['btn:next', 'btn:prev'].includes(event)) {
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
    this.legendDrawer.plot(parent.predictions, parent.predictionsShow, (event, payload) => {
      panelHook(event, payload)
    })

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
