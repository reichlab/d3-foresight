/**
 * Module for handling mouse information
 */

/**
 * Doc guard
 */
import * as d3 from 'd3'
import { Position } from '../interfaces'

/**
 * Return mouse position as absolute value for current view using the provided
 * d3Selection. The selection here matters because many of the elements with
 * mouse events are translated with respect to original svg. Most of the calls
 * to this function use .overlay as reference
 */
function getMousePosition (d3Selection): Position {
  let [x, y] = d3.mouse(d3Selection.node())
  let bb = d3Selection.node().getBoundingClientRect()
  return [x + bb.left, y + bb.top]
}

/**
 * Move tooltip to the position of the selection
 */
export function moveTooltipTo (tooltip, selection, direction = 'right') {
  let [x, y] = getMousePosition(selection)
  tooltip.move({ x, y }, direction)
}
