import * as ev from '../../../events'
import ControlButtons from './control-buttons'
import LegendDrawer from './legend-drawer'

/**
 * Chart controls
 * nav-drawers and buttons
 */
export default class ControlPanel {
  constructor (parent, panelConfig) {
    // Main panel selection
    let panelSelection = parent.elementSelection.append('div')
        .attr('class', 'd3-foresight-controls')

    this.config = panelConfig

    // Add legend drawer
    this.legendDrawer = new LegendDrawer(
      panelSelection,
      parent.config.confidenceIntervals,
      this.config,
      parent.infoTooltip
    )

    if (this.config.ci) {
      this.legendDrawer.toggleConfidenceBtn(parent.cid)
    }

    // Buttons on the side of panel
    this.controlButtons = new ControlButtons(panelSelection, parent.infoTooltip, this.config)

    ev.addSub(this, ev.TOGGLE_LEGEND, (msg, data) => {
      this.legendDrawer.toggleDrawer()
      this.controlButtons.toggleLegendBtn()
    })

    // Turn on legend by default
    this.controlButtons.toggleLegendBtn()
  }

  plot (predictions) {
    this.legendDrawer.plot(predictions)
  }

  update (predictions) {
    this.legendDrawer.update(predictions)
  }
}
