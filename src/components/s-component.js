import * as d3 from 'd3'
import Component from './component'

/**
 * Generic class for representing SVG components
 */
export default class SComponent extends Component {
  constructor () {
    super(document.createElementNS(d3.namespaces.svg, 'g'))
  }
}
