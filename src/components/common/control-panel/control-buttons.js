import * as d3 from 'd3'
import * as ev from '../../../events'
import { moveTooltipTo } from '../../../utilities/mouse'

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
    let buttons = buttonData.map(data => {
      let btn = navControls.append('div')
          .classed('btn', true)
          .text(data.iconText)
      btn
        .on('mouseover', () => infoTooltip.show())
        .on('mouseout', () => infoTooltip.hide())
        .on('mousemove', function () {
          infoTooltip.renderText({
            title: null,
            text: data.tooltipText
          })
          moveTooltipTo(infoTooltip, d3.select(this), 'left')
        })
        .on('click', () => ev.publish(data.event, {}))
      return btn
    })

    this.legendBtn = buttons[0]
  }

  toggleLegendBtn () {
    this.legendBtn.classed('active', !this.legendBtn.classed('active'))
  }
}
