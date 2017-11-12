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
 * Convert hex to rgba
 */
export const hexToRgba = (hex, alpha) => tinycolor(hex).setAlpha(alpha).toRgbString()

/**
 * Some pre generated palettes from http://tools.medialab.sciences-po.fr/iwanthue/
 */
export const colors30 = [
  "#3cb8c0",
  "#f0574b",
  "#4dc968",
  "#db6dd8",
  "#75c142",
  "#9c78ef",
  "#bfc83c",
  "#568ced",
  "#d2aa3b",
  "#e165b7",
  "#62c793",
  "#ef5297",
  "#61daca",
  "#e76b2e",
  "#5daade",
  "#d88a2f",
  "#9999dc",
  "#909d37",
  "#be87d4",
  "#abd077",
  "#ec5778",
  "#6c9e5b",
  "#dc77a0",
  "#d3c179",
  "#e29cce",
  "#c6925e",
  "#e26d67",
  "#eb9491",
  "#e3845e",
  "#cb7478"
]

export const colors50 = [
  "#d48232",
  "#4f8af1",
  "#b2c834",
  "#b171ed",
  "#69b92e",
  "#e364d2",
  "#61d96a",
  "#e464ae",
  "#3bab40",
  "#c87dd6",
  "#96dc5b",
  "#8982e6",
  "#debf2e",
  "#499ae1",
  "#df9b2a",
  "#5cb4e1",
  "#e96735",
  "#42dcaa",
  "#f14c55",
  "#50d885",
  "#eb5a88",
  "#46a459",
  "#ea6368",
  "#46c9d2",
  "#de7a58",
  "#4aba9e",
  "#eea7e0",
  "#74a530",
  "#c4a8ef",
  "#bdd461",
  "#8b94d4",
  "#94a231",
  "#c57dae",
  "#95cf73",
  "#e88ba1",
  "#90da99",
  "#d27878",
  "#7fdcbf",
  "#ed9d7d",
  "#4a9a74",
  "#e5b06f",
  "#77b97c",
  "#b8844c",
  "#6e984c",
  "#d5c056",
  "#8ca259",
  "#a59229",
  "#b9cf84",
  "#9a914f",
  "#ccc17d"
]
