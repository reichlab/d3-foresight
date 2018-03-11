import * as d3 from 'd3'
import * as mmwr from 'mmwr-week'
import * as errors from './errors'
import { Timepoint, Range, Point } from '../interfaces'

/**
 * Return points where the predictions were made
 * This is used as the first point in prediction marker
 */
export function getPredictionStartingPoints (data) {
  return data.observed.map(d => {
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

export function getXDateDomain (timePoints: Timepoint[], pointType: Point) {
  return d3.extent(timePoints.map(d => {
    if (pointType === 'mmwr-week') {
      return (new mmwr.MMWRDate(d.year, d.week)).toMomentDate()
    } else if (pointType === 'regular-week') {
      return d3.timeParse('%Y-%W')(d.year + '-' + d.week)
    } else {
      throw new errors.UnknownPointTypeException()
    }
  }))
}

export function getYDomain (data): Range {
  // Max from actual data
  let maxValues = [Math.max(...data.actual.filter(d => d))]
  // Max from observed data
  maxValues.push(Math.max(...data.observed.map(d => {
    return Math.max(...d.map(dl => dl.value))
  })))
  // Max from historical data
  data.history.forEach(h => {
    maxValues.push(Math.max(...h.actual))
  })
  // Max from all the models
  data.models.map(mdl => {
    maxValues.push(Math.max(...mdl.predictions.filter(m => m).map(d => {
      return Math.max(...[...d.series.map(s => Math.max(...s.high)), Math.max(...d.peakValue.high)])
    })))
  })
  // HACK Clipping at 13 since we don't predict beyond that
  return [0, Math.min(13, 1.1 * Math.max(...maxValues))]
}

export function getXDomain (timePoints: Timepoint[]): Range {
  return [0, timePoints.length - 1]
}