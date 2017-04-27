import * as d3 from 'd3'
import * as commonComponents from './components/common'
import * as distributionChartComponents from './components/distribution-chart'
import * as utils from './utilities/distribution-chart'
import Chart from './chart'

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

    let elementSelection = d3.select(element)
        .attr('class', 'd3-foresight-chart d3-foresight-distribution-chart')
    super(elementSelection, 0, Object.assign({}, defaultConfig, options))

    // Initialize scales
    this.xScale = d3.scaleLinear().range([0, this.width])
    this.xScaleDate = d3.scaleTime().range([0, this.width])
    this.xScalePoint = d3.scalePoint().range([0, this.width])

    // Time axis for indicating current position
    this.xAxis = new commonComponents.XAxisDate(
      this.svg,
      this.width,
      this.height,
      0,
      this.onsetHeight,
      this.config.axes.x,
      this.infoTooltip
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

      return new distributionChartComponents.DistributionPanel(
        svg,
        panelWidth - panelMargin.left - panelMargin.right,
        panelHeight - panelMargin.top - panelMargin.bottom,
        this.infoTooltip
      )
    })

    // Add dropdowns for curve selection
    this.dropdowns = panelPositions.map(pos => {
      let wrapper = elementSelection.append('span')
      wrapper.attr('class', 'select is-small')
      let dd = wrapper.append('select')
      wrapper.style('position', 'absolute')
      wrapper.style('left', (pos[0] + panelWidth / 2) + 'px')
      wrapper.style('top', (pos[1] + panelHeight - panelMargin.bottom + 30) + 'px')

      return dd
    })

    this.pointer = new distributionChartComponents.Pointer(this)

    this.eventHooks = []
    let showStats = this.config.statsMeta.length > 0
    let panelConfig = {
      actual: true,
      observed: false,
      history: false,
      ci: false,
      stats: showStats
    }

    // Control panel
    this.controlPanel = new commonComponents.ControlPanel(
      this, panelConfig,
      (event, payload) => {
        if (event === 'btn:next') {
          console.log('forward')
        } else if (event === 'btn:back') {
          console.log('backward')
        }
      }
    )
  }

  // plot data
  plot (data) {
    // NOTE
    // Data has the following props
    // timePoints -> to plot the time axis
    // currentIdx -> to plot the pointer in onsetOffset
    // models -> list of n items for n models, each with:
    //   id
    //   meta
    //   stats
    //   curves (or maybe use predictions) list of t items for t targets:
    //     name -> text naming the target
    //     data -> series of (x, y) tuples about the distribution
    //     actual -> actual value // Not planned

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
      throw utils.UnknownPointTypeException()
    }
    this.xScaleDate.domain(utils.getXDateDomain(this.timePoints, this.config.pointType))
    this.xScalePoint.domain(this.ticks)
    this.xScale.domain([0, this.timePoints.length - 1])
    this.xAxis.plot(this.xScalePoint, this.xScaleDate)

    // Plot pointer position
    this.pointer.plot(data.currentIdx, this.xScale)

    // Provide curve data to the panels
    this.panels.forEach((p, idx) => {
      if (!p.selectedCurveIdx) {
        p.selectedCurveIdx = idx
        this.dropdowns[idx].property('value', idx)
      } else {
        this.dropdowns[idx].property('value', p.selectedCurveIdx)
      }
      p.plot(data)
    })

    // Add event listeners to dropdown
    this.dropdowns.forEach((dd, idx) => {
      let currentPanel = this.panels[idx]
      dd.on('change', function () {
        let selectedIdx = parseInt(d3.select(this).property('value'))
        currentPanel.selectedCurveIdx = selectedIdx
        currentPanel.plot(data)
      })
    })

    // Update models shown in control panel
    this.controlPanel.plot(this.panels[0].predictions, (predictionId, hidePrediction) => {
      this.panels.forEach(p => {
        let predMarker = p.predictions[p.predictions.map(p => p.id).indexOf(predictionId)]
        predMarker.hidden = hidePrediction
      })
    })
  }
}
