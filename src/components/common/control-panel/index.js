import * as ev from '../../../events'
import ControlButtons from './control-buttons'
import LegendDrawer from './legend-drawer'
import Component from '../../component'

/**
 * Chart controls
 * nav-drawers and buttons
 */
export default class ControlPanel extends Component {
  constructor (parent, panelConfig) {
    super()

    let panelSelection = parent.elementSelection.append('div')
        .attr('class', 'd3-foresight-controls')

    this.config = panelConfig

    // Add legend drawer
    this.legendDrawer = new LegendDrawer(
      this.config,
      parent.config.confidenceIntervals,
      parent.infoTooltip
    )
    panelSelection.append(() => this.legendDrawer.node)

    if (this.config.ci) {
      this.legendDrawer.setCiBtn(parent.cid)
    }

    // Buttons on the side of panel
    let sideButtons = new ControlButtons(parent.infoTooltip)
    panelSelection.append(() => sideButtons.node)

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
