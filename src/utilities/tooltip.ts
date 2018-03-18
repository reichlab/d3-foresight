/**
 * Functions for working with tooltips.
 * As of now, we generate html strings and render with d3Selection.html
 */

/**
 * Doc guard
 */
import { getMousePosition } from './mouse'

/**
 * Move tooltip to the position of the selection
 */
export function moveTooltip (tooltip, selection, direction = 'right') {
  let [x, y] = getMousePosition(selection)
  tooltip.move({ x, y }, direction)
}

/**
 * Generate text for simple { title, text } data
 */
export function parseText ({ title, text }): string {
  let html = ''
  if (title) {
    html += `<div class='tooltip-title'>${title}</div>`
  }
  if (text) {
    html += `<div class='tooltip-text'>${text}</div>`
  }
  return html
}

/**
 * Generate text for point prediction values
 * `title` is shown in `color`-ed background
 * `values` go as rows below the title
 */
export function parsePoint ({ title, values, color }): string {
  let html = `<div class='tooltip-row' style='background:${color};color:white'>${title}</div>`
  values.forEach(v => {
    html += `<div class='tooltip-row'>
               ${v.key}
               <span class='bold'>${v.value.toFixed(2)}</span>
             </div>`
  })
  return html
}

/**
 * Generate text for a list of predictions
 * `title` is shown in italics first
 * Each of the `predictions` at `index` provide the data for rows
 */
export function parsePredictions ({ title, predictions, index }): string {
  let maxPreds = 10
  let html = ''

  if (title) {
    html += `<div class='tooltip-row'>
               <em>${title}</em>
             </div>`
  }

  // Show only those items which have some value to be shown at index
  let visiblePreds = predictions.filter(p => {
    let data = p.query(index)
    return data === 0 || data
  })

  visiblePreds.slice(0, maxPreds).forEach(p => {
    let style = `background:${p.color};color:${p.color ? 'white' : ''}`
    html += `<div class='tooltip-row' style='${style}'>
               ${p.id}
               <span class='bold'>
                 ${p.query(index).toFixed(2)}
               </span>
             </div>`
  })

  // Notify in case of overflow
  if (visiblePreds.length > maxPreds) {
    html += `<div class='tooltip-row'>
               <em>Truncated list. Please <br>
               select fewer than <br>
               ${maxPreds + 1} predictions</em>
             </div>`
  }

  return html
}
