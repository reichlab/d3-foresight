import * as d3 from 'd3'
import { getMousePosition } from '../../../utilities/mouse'

/**
 * Side buttons in control panel
 */
export default class ControlButtons {
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
        .on('click', () => ev.publish(data.event, {}))
      navControls.append('br')
      return btn
    })
  }

  toggleLegendBtn () {
    this.buttons[0].classed('is-outlined', !this.buttons[0].classed('is-outlined'))
  }
}
