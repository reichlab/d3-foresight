/**
 * Some common utilities
 */

import * as d3 from 'd3'
import tinycolor from 'tinycolor2'

/**
 * Return mouse position as absolute value for current view using the provided
 * d3Selection. The selection here matters because many of the elements with
 * mouse events are translated with respect to original svg. Most of the calls
 * to this function use .overlay as reference
 */
export function getMousePosition (d3Selection) {
  let [x, y] = d3.mouse(d3Selection.node())
  let bb = d3Selection.node().getBoundingClientRect()
  return [x + bb.left, y + bb.top]
}

/**
 * Custom exception for case when point type (the type of x axis) can't be
 * handled
 */
export function UnknownPointTypeException (message) {
  this.name = 'UnknownPointTypeException'
  this.message = message || 'Point type not understood'
  this.stack = (new Error()).stack
}

UnknownPointTypeException.prototype = Object.create(Error.prototype)
UnknownPointTypeException.prototype.constructor = UnknownPointTypeException

/**
 * Convert hex to rgba
 */
export const hexToRgba = (hex, alpha) => tinycolor(hex).setAlpha(alpha).toRgbString()
