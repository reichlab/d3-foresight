import * as d3 from 'd3'
import * as ev from '../../../events'
import * as tt from '../../../utilities/tooltip'
import Component from '../../component'

/**
 * Side buttons in control panel
 */
export default class ControlButtons extends Component {
  constructor (tooltip) {
    super()

    this.selection.classed('nav-controls', true)

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
      return this.selection.append('div')
        .classed('btn', true)
        .text(data.iconText)
        .on('mouseover', () => { tooltip.hidden = false })
        .on('mouseout', () => { tooltip.hidden = true })
        .on('mousemove', function () {
          tooltip.render(tt.parseText({ text: data.tooltipText }))
          tt.moveTooltip(tooltip, d3.select(this), 'left')
        })
        .on('click', () => ev.publish(data.event, {}))
    })

    this.legendBtn = buttons[0]
  }

  get legendBtnState () {
    return this.legendBtn.classed('active')
  }

  set legendBtnState (state) {
    this.legendBtn.classed('active', state)
  }
}
