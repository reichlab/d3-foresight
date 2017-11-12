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
  "#c76656",
  "#5b7fee",
  "#b0b736",
  "#4e2b87",
  "#5ab152",
  "#973390",
  "#7ba73a",
  "#6159c1",
  "#53c27c",
  "#d777d9",
  "#417229",
  "#8386e8",
  "#dd8432",
  "#43a1e4",
  "#cd9a3b",
  "#3e5da8",
  "#b3a948",
  "#915ab1",
  "#9eb867",
  "#4d3074",
  "#43c8ac",
  "#c757a4",
  "#a07937",
  "#908edd",
  "#bd5a2f",
  "#cc8bd3",
  "#ad3339",
  "#852961",
  "#dc6598",
  "#b44360"
]

export const colors50 = [
  "#d97a61",
  "#5679e8",
  "#c0cd4e",
  "#5246a7",
  "#97cc5b",
  "#913091",
  "#52b958",
  "#df70d0",
  "#5aca7b",
  "#4e2273",
  "#9aa625",
  "#9072db",
  "#659829",
  "#b375d5",
  "#2e7c23",
  "#ca4b99",
  "#77b95d",
  "#b364b6",
  "#4cbe84",
  "#9c295e",
  "#43c29e",
  "#c03836",
  "#36dee6",
  "#cc6a26",
  "#5885de",
  "#ce9c2d",
  "#223a81",
  "#c3b958",
  "#555fa8",
  "#85801e",
  "#d199e7",
  "#5b7a28",
  "#d880c2",
  "#397a3a",
  "#7f2c67",
  "#a0c473",
  "#804f94",
  "#c6b067",
  "#8892de",
  "#c7893b",
  "#4b9dde",
  "#e0684b",
  "#7d6924",
  "#dd6f9d",
  "#904415",
  "#d25972",
  "#d18953",
  "#8c2738",
  "#d55862",
  "#862f1e"
]
