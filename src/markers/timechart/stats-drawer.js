import * as d3 from 'd3'
import * as util from '../../utils/timechart'

/**
 * Stats nav drawer
 */
export default class StatsDrawer {
  constructor (panelSelection, tooltip) {
    this.drawerSelection = panelSelection.append('div')
      .attr('class', 'stats nav-drawer')

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
