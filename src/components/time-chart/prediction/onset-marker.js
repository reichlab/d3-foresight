import * as d3 from 'd3'
import * as tt from '../../../utilities/tooltip'
import * as colors from '../../../utilities/colors'
import SComponent from '../../s-component'

export default class OnsetMarker extends SComponent {
  constructor (id, color, onsetY) {
    super()
    this.selection
      .attr('class', 'onset-group')
      .attr('id', id + '-marker')

    let stp = 6
    let colorPoint = colors.hexToRgba(color, 0.8)
    let colorRange = colors.hexToRgba(color, 0.6)

    this.selection.append('line')
      .attr('y1', onsetY)
      .attr('y2', onsetY)
      .attr('class', 'range onset-range')
      .style('stroke', colorRange)

    this.selection.append('line')
      .attr('y1', onsetY - stp / 2)
      .attr('y2', onsetY + stp / 2)
      .attr('class', 'stopper onset-stopper onset-low')
      .style('stroke', colorRange)

    this.selection.append('line')
      .attr('y1', onsetY - stp / 2)
      .attr('y2', onsetY + stp / 2)
      .attr('class', 'stopper onset-stopper onset-high')
      .style('stroke', colorRange)

    this.point = this.selection.append('circle')
      .attr('r', 3)
      .attr('cy', onsetY)
      .attr('class', 'onset-mark')
      .style('stroke', 'transparent')
      .style('fill', colorPoint)
  }

  move (cfg, onset) {
    let colorHover = colors.hexToRgba(cfg.color, 0.3)

    this.point
      .transition()
      .duration(200)
      .attr('cx', cfg.scales.xScale(onset.point))

    this.point
      .on('mouseover', function () {
        d3.select(this)
          .transition()
          .duration(200)
          .style('stroke', colorHover)
        cfg.tooltip.hidden = false
        cfg.tooltip.render(tt.parsePoint({
          title: cfg.id,
          values: [{ key: 'Season Onset', value: cfg.scales.ticks[onset.point] }],
          color: cfg.color
        }))
      })
      .on('mouseout', function () {
        d3.select(this)
          .transition()
          .duration(200)
          .style('stroke', 'transparent')
        cfg.tooltip.hidden = true
      })
      .on('mousemove', function () {
        tt.moveTooltip(cfg.tooltip, d3.select('.overlay'))
      })

    if (cfg.cid === -1) {
      ['.range', '.stopper'].forEach(cls => {
        this.selection.selectAll(cls)
          .attr('display', 'none')
      })
    } else {
      ['.range', '.stopper'].forEach(cls => {
        this.selection.selectAll(cls)
          .attr('display', null)
      })

      this.selection.select('.onset-range')
        .transition()
        .duration(200)
        .attr('x1', cfg.scales.xScale(onset.low[cfg.cid]))
        .attr('x2', cfg.scales.xScale(onset.high[cfg.cid]))

      this.selection.select('.onset-low')
        .transition()
        .duration(200)
        .attr('x1', cfg.scales.xScale(onset.low[cfg.cid]))
        .attr('x2', cfg.scales.xScale(onset.low[cfg.cid]))

      this.selection.select('.onset-high')
        .transition()
        .duration(200)
        .attr('x1', cfg.scales.xScale(onset.high[cfg.cid]))
        .attr('x2', cfg.scales.xScale(onset.high[cfg.cid]))
    }
  }
}