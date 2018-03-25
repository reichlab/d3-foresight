/**
 * Functions for finding scale domains from data object
 */

import { Range } from '../../interfaces'

/**
 * Return max of a pred object { point, high?, low? }
 */
function predMax(pred): number {
  let max = pred.point
  if (pred.high) {
    max = Math.max(max, ...pred.high)
  }
  return max
}

/**
 * Return domain for y axis using limits of data
 */
export function y (data, dataConfig): Range {
  let min = 0
  let max = 0

  if (dataConfig.actual) {
    max = Math.max(max, ...data.actual.filter(d => d))
  }

  if (dataConfig.observed) {
    data.observed.forEach(d => {
      max = Math.max(max, ...d.map(lagD => lagD.value))
    })
  }

  if (dataConfig.history) {
    data.history.forEach(h => {
      max = Math.max(max, ...h.actual)
    })
  }

  data.models.forEach(md => {
    md.predictions.forEach(p => {
      if (p) {
        max = Math.max(max, ...p.series.map(predMax))
        if (dataConfig.predictions.peak) {
          max = Math.max(max, predMax(p.peakValue))
        }
      }
    })
  })

  return [min, 1.1 * max]
}
