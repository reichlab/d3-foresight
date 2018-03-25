/**
 * Functions for finding scale domains from data object
 */

/**
 * Doc guard
 */
import * as mmwr from 'mmwr-week'
import * as d3 from 'd3'
import * as errors from '../errors'
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

/**
 * Return domain of x
 */
export function x (data, dataConfig): Range {
  return [0, data.timePoints.length - 1]
}

/**
 * Return domain for xdate
 */
export function xDate (data, dataConfig): Range {
  return d3.extent(data.timePoints.map(tp => {
    if (dataConfig.pointType === 'mmwr-week') {
      return (new mmwr.MMWRDate(tp.year, tp.week)).toMomentDate()
    } else if (dataConfig.pointType === 'regular-week') {
      return d3.timeParse('%Y-%W')(tp.year + '-' + tp.week)
    } else {
      throw new errors.UnknownPointType()
    }
  }))
}

/**
 * Return point scale domain
 */
export function xPoint (data, dataConfig): Range {
  return dataConfig.ticks
}
