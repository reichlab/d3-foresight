import * as d3 from 'd3'

/**
 * Side buttons in control panel
 */
export default class ControlButtons {
  constructor (panelSelection, tooltip, eventHook) {
    let navControls = panelSelection.append('div')
        .attr('class', 'nav-controls')

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
