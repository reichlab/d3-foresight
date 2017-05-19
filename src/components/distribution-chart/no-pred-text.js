export default class NoPredText {
  constructor (parent) {
    this.text = parent.svg.append('text')
      .attr('class', 'no-pred-text')
      .attr('transform', `translate(30 , 30)`)

    this.text.append('tspan')
      .text('Predictions not available')
      .attr('x', 0)

    this.text.append('tspan')
      .text('for selected time')
      .attr('x', 0)
      .attr('dy', '2em')
  }

  set hidden (val) {
    this.text.style('display', val ? 'none' : null)
  }

  get hidden () {
    return this.text.style('display') === 'none'
  }
}
