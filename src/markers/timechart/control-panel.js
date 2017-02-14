import * as LegendDrawer from './legend-drawer'
import * as StatsDrawer from './stats-drawer'
import * as ControlButtons from './control-buttons'

/**
 * Chart controls
 * nav-drawers and buttons
 */
export default class ControlPanel {
  constructor (parent, panelHook) {
    let panelSelection = parent.elementSelection.append('div')
        .attr('class', 'd3-foresight-controls')
    this.paintLegend(panelSelection, parent, panelHook)
    this.paintStatsDrawer(panelSelection, parent)
    this.paintControlButtons(panelSelection, parent, panelHook)
  }

  paintLegend (container, parent, panelHook) {
    this.legendDrawer = new LegendDrawer(
      container,
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
    this.legendDrawer.toggleConfidenceBtn(parent.cid)
  }

  paintStatsDrawer (container, parent) {
    this.statsDrawer = new StatsDrawer(container, parent.legendTooltip)
    this.statsDrawer.toggleDrawer()
  }

  paintControlButtons (container, parent, panelHook) {
    this.controlButtons = new ControlButtons(container, parent.btnTooltip, event => {
      if (['btn:next', 'btn:prev'].includes(event)) {
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
