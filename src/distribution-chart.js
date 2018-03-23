import * as d3 from 'd3'
import { XAxisDate } from './components/common/axis-x'
import ControlPanel from './components/common/control-panel'
import DistributionPanel from './components/distribution-chart/distribution-panel'
import Pointer from './components/distribution-chart/pointer'
import * as utils from './utilities/distribution-chart'
import * as errors from './utilities/errors'
import Chart from './chart'
import { verifyDistributionChartData } from './utilities/data/verify'
import * as ev from './events'

export default class DistributionChart extends Chart {
  constructor (element, options = {}) {
    let defaultConfig = {
      pointType: 'regular-week',
      confidenceIntervals: [],
      margin: {
        top: 5,
        right: 50,
        bottom: 80,
        left: 5
      }
    }

    let selection = d3.select(element)
        .attr('class', 'd3-foresight-chart d3-foresight-distribution-chart')
    super(selection, 0, Object.assign({}, defaultConfig, options))

    // Initialize scales
    this.xScale = d3.scaleLinear().range([0, this.width])
    this.xScaleDate = d3.scaleTime().range([0, this.width])
    this.xScalePoint = d3.scalePoint().range([0, this.width])

    // Time axis for indicating current position
    this.xAxis = new XAxisDate(
      this.svg,
      this.width,
      this.height,
      0,
      this.onsetHeight,
      this.config.axes.x,
      this.tooltip
    )

    // create 4 panels and assign new svgs to them
    let panelMargin = {
      top: 5, right: 10, bottom: 70, left: 50
    }
    let panelHeight = this.height / 2
    let panelWidth = this.width / 2
    let panelPositions = [
      [0, 0],
      [0, panelHeight],
      [panelWidth, 0],
      [panelWidth, panelHeight]
    ]

    this.panels = panelPositions.map(pos => {
      let svg = this.svg.append('svg')
          .attr('x', pos[0])
          .attr('y', pos[1])
          .attr('width', panelWidth)
          .attr('height', panelHeight)
          .append('g')
          .attr('transform', `translate(${panelMargin.left}, ${panelMargin.top})`)

      return new DistributionPanel(
        svg,
        panelWidth - panelMargin.left - panelMargin.right,
        panelHeight - panelMargin.top - panelMargin.bottom,
        this.tooltip
      )
    })

    // Add dropdowns for curve selection
    this.dropdowns = panelPositions.map(pos => {
      let wrapperWrapper = this.selection.append('div')
      wrapperWrapper.style('text-align', 'center')

      let wrapper = wrapperWrapper.append('span')
      wrapper.attr('class', 'select is-small')
      let dd = wrapper.append('select')

      wrapperWrapper.style('position', 'absolute')
      wrapperWrapper.style('left', (pos[0] + panelMargin.left / 2) + 'px')
      wrapperWrapper.style('width', panelWidth + 'px')
      wrapperWrapper.style('top', (pos[1] + panelHeight - panelMargin.bottom + 30) + 'px')

      return dd
    })

    this.pointer = new Pointer(this)

    let panelConfig = {
      actual: false,
      observed: false,
      history: false,
      ci: false,
      tooltip: this.tooltip,
      uuid: this.uuid
    }

    // Control panel
    this.controlPanel = new ControlPanel(panelConfig)
    this.selection.append(() => this.controlPanel.node)

    ev.addSub(this.uuid, ev.MOVE_NEXT, (msg, data) => {
      ev.publish(this.uuid, ev.FORWARD_INDEX)
    })

    ev.addSub(this.uuid, ev.MOVE_PREV, (msg, data) => {
      ev.publish(this.uuid, ev.BACKWARD_INDEX)
    })
  }

  // plot data
  plot (data) {
    verifyDistributionChartData(data)

    let curveNames = data.models[0].curves.map(t => t.name)

    this.dropdowns.forEach(dd => {
      dd.selectAll('*').remove()
      curveNames.forEach((cn, idx) => {
        let option = dd.append('option')
        option.text(cn)
        option.attr('value', idx)
      })
    })

    this.timePoints = data.timePoints
    if (this.config.pointType.endsWith('-week')) {
      this.ticks = this.timePoints.map(tp => tp.week)
    } else {
      throw new errors.UnknownPointType()
    }
    this.xScaleDate.domain(utils.getXDateDomain(this.timePoints, this.config.pointType))
    this.xScalePoint.domain(this.ticks)
    this.xScale.domain([0, this.timePoints.length - 1])
    this.xAxis.plot(this.xScalePoint, this.xScaleDate)

    // Plot pointer position
    this.pointer.plot(data.currentIdx, this.xScale, clickIndex => {
      ev.publish(this.uuid, ev.JUMP_TO_INDEX, clickIndex)
    })

    let yLimits = utils.getYLimits(data)

    // Provide curve data to the panels
    this.panels.forEach((p, idx) => {
      if (!p.selectedCurveIdx) {
        p.selectedCurveIdx = idx
        this.dropdowns[idx].property('value', idx)
      } else {
        this.dropdowns[idx].property('value', p.selectedCurveIdx)
      }
      p.plot(data, yLimits)
    })

    // Add event listeners to dropdown
    this.dropdowns.forEach((dd, idx) => {
      let currentPanel = this.panels[idx]
      dd.on('change', function () {
        let selectedIdx = parseInt(d3.select(this).property('value'))
        currentPanel.selectedCurveIdx = selectedIdx
        currentPanel.plot(data, yLimits)
      })
    })

    // Update models shown in control panel
    this.controlPanel.plot(this.panels[0].predictions)

    ev.addSub(this.uuid, ev.LEGEND_ITEM, (msg, { id, state }) => {
      this.panels.forEach(p => {
        let predMarker = p.predictions.find(p => p.id === id)
        if (predMarker) {
          predMarker.hidden = !state
        }
      })
    })

    // Fade out models with no predictions
    this.controlPanel.update(this.panels[0].predictions)
  }
}
