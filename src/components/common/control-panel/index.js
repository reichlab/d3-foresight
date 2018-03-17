import * as ev from '../../../events'
import ControlButtons from './control-buttons'
import LegendDrawer from './legend-drawer'
import Component from '../../component'

/**
 * Chart controls
 * nav-drawers and buttons
 */
export default class ControlPanel extends Component {
  constructor (config) {
    super()
    this.selection.attr('class', 'd3-foresight-controls')
    this.config = config

    // Add legend drawer
    this.legendDrawer = new LegendDrawer(config)
    this.selection.append(() => this.legendDrawer.node)

    // Buttons on the side of panel
    let sideButtons = new ControlButtons(config.tooltip)
    this.selection.append(() => sideButtons.node)

    ev.addSub(this, ev.TOGGLE_LEGEND, (msg, data) => {
      this.legendDrawer.hidden = !this.legendDrawer.hidden
      sideButtons.legendBtnState = !sideButtons.legendBtnState
    })

    // Turn on legend by default
    sideButtons.legendBtnState = true
  }

  plot (predictions) {
    this.legendDrawer.plot(predictions)
  }

  update (predictions) {
    this.legendDrawer.update(predictions)
  }
}
