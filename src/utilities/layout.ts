/**
 * Layout setup functions
 */

/**
 * Doc guard
 */
import * as d3 from 'd3'

type GridStructure = number[] | number[][]

export class Grid {
  constructor (public structure: GridStructure) { }
}
