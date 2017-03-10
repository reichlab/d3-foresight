class ToolTip {
  constructor (rootSelector, tooltipClass) {
    this.selection = rootSelector.append('div')
      .attr('class', `d3-foresight-tooltip ${tooltipClass}`)
      .style('display', 'none')
  }

  show () {
    this.selection.style('display', null)
  }

  hide () {
    this.selection.style('display', 'none')
  }

  render (position, data) {
  }
}

export class ChartToolTip extends ToolTip {
  constructor (rootSelector) {
    super(rootSelector, 'd3-foresight-chart-tooltip')
  }

  render (position, data) {
    // TODO
  }
}

export class LegendToolTip extends ToolTip {
  constructor (rootSelector) {
    super(rootSelector, 'd3-foresight-legend-tooltip')
  }

  render (position, data) {
    // TODO
  }
}

export class InfoTooltip extends ToolTip {
  constructor (rootSelector) {
    super(rootSelector, 'd3-foresight-info-tooltip')
  }

  render (position, data) {
    // TODO
  }
}

export class BtnTooltip extends ToolTip {
  constructor (rootSelector) {
    super(rootSelector, 'd3-foresight-btn-tooltip')
  }

  render (position, data) {
    // TODO
  }
}
