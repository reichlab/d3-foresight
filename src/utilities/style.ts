/**
 * Apply css styles on d3 selection
 */
export function applyStyle (d3Selection, style) {
  for (let key in style || {}) {
    d3Selection.style(key, style[key])
  }
}
