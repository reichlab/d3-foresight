class Tooltip {
  constructor (rootSelector, tooltipClass) {
    this.selection = rootSelector.append('div')
      .attr('class', `d3-foresight-tooltip ${tooltipClass}`)
      .style('display', 'none')

    this.offset = {
      right: { x: 15, y: 15 },
      left: { x: -150 - 15, y: 15 }
    }
  }

  show () {
    this.selection.style('display', null)
  }

  hide () {
    this.selection.style('display', 'none')
  }

  move (position, direction = 'right') {
    this.selection
      .style('top', (position.y + this.offset[direction].y) + 'px')
      .style('left', (position.x + this.offset[direction].x) + 'px')
  }

  render (html) {
    this.selection.html(html)
  }
}

export class TimeChartTooltip extends Tooltip {
  constructor (rootSelector) {
    super(rootSelector, 'd3-foresight-time-chart-tooltip')
  }

  renderText (data) {
    this.render(`<div class="text">${data}</div>`)
  }

  renderValues (observedObj, actualObj, predObjs, index) {
    let html = ''
    // Ask for observed value
    let observedValue = observedObj.query(index)

    if (observedValue) {
      html += `<div class="observed">
                 Observed
                 <span class="bold">
                   ${observedValue.toFixed(2)}
                 </span>
               </div>`
    }

    // Ask actual
    let actualValue = actualObj.query(index)
    if (actualValue) {
      html += `<div class="actual">
                 Actual
                 <span class="bold">
                   ${actualValue.toFixed(2)}
                 </span>
               </div>`
    }

    // Show upto maxNPreds predictions
    let maxNPreds = 10
    let visiblePreds = predObjs.filter(p => p.query(index))
    visiblePreds.slice(0, maxNPreds).map(p => {
      let data = p.query(index)
      html += `<div class="prediction" style="background:${p.color}">
                 ${p.id}
                 <span class="bold">
                   ${data.toFixed(2)}
                 </span>
               </div>`
    })

    // Notify regarding overflow
    if (visiblePreds.length > maxNPreds) {
      html += `<div class="actual">
                 <em>Truncated list. Please <br>
                 select fewer than <br>
                 ${maxNPreds + 1} predictions</em>
               </div>`
    }

    this.render(html)
  }

  renderPoint (id, data, color) {
    let html = `<div class="point head" style="background:${color}">${id}</div>`
    data.map(d => {
      html += `<div class="point">
                 ${d.key}
                 <span class="bold">${d.value.toFixed(2)}</span>
               </div>`
    })
    this.render(html)
  }
}

export class InfoTooltip extends Tooltip {
  constructor (rootSelector) {
    super(rootSelector, 'd3-foresight-info-tooltip')
  }

  renderText (data) {
    let html = ''
    if (data.title) {
      html += `<div class="title">${data.title}</div>`
    }
    if (data.text) {
      html += `<div class="text">${data.text}</div>`
    }
    this.render(html)
  }
}
