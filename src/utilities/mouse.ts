/**
 * Module for handling mouse information
 */

/**
 * Doc guard
 */
import * as d3 from 'd3'

/**
 * Return mouse position as absolute value for current view using the provided
 * d3Selection. The selection here matters because many of the elements with
 * mouse events are translated with respect to original svg. Most of the calls
 * to this function use .overlay as reference
 */
export function getMousePosition (d3Selection): [number, number] {
  let [x, y] = d3.mouse(d3Selection.node())
  let bb = d3Selection.node().getBoundingClientRect()
  return [x + bb.left, y + bb.top]
}
