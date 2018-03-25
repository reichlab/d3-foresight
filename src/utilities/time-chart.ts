import * as d3 from 'd3'
import * as mmwr from 'mmwr-week'
import * as errors from './errors'
import { Timepoint, Range, Point } from '../interfaces'

/**
 * Return points where the predictions were made
 * This is used as the first point in prediction marker
 */
export function getPredictionInitPoints (observed) {
  return observed.map(d => {
    // Handle zero length values
    try {
      if (d.length !== 0) {
        return d.filter(ld => ld.lag === 0)[0].value
      } else {
        return null
      }
    } catch (e) {
      return null
    }
  })
}
