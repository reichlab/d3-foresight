import * as d3 from 'd3'
import * as mmwr from 'mmwr-week'
import * as errors from './errors'
import { Timepoint, Point, Range } from '../interfaces'

/**
 * Return a formatted string representing a bin at index from series
 */
export function formatBin (series: number[], index: number): string {
  let start = series[index]
  let end

  // Figure out if we are working with integers
  let diff = series[1] - series[0]

  if (index === (series.length - 1)) {
    // We are at the end, use the diff
    end = start + diff
  } else {
    end = series[index + 1]
  }

  if (diff < 1) {
    // These are floats
    return `${start.toFixed(2)}-${end.toFixed(2)}`
  } else {
    return `${start}-${end}`
  }
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

export function getYDomain (data, curveIdx: number): Range {
  let modelMaxes = data.models.map(m => {
    let curveData = m.curves[curveIdx].data
    if (!curveData) {
      return 0
    } else {
      return Math.max(...curveData.map(d => d[1]))
    }
  })
  return [0, Math.max(...modelMaxes)]
}

export function getXDomain (data, curveIdx: number): Range {
  // This assumes an ordinal scale
  for (let i = 0; i < data.models.length; i++) {
    let curveData = data.models[i].curves[curveIdx].data
    if (curveData) {
      // Return the x series directly
      return curveData.map(d => d[0])
    }
  }
  return [0, 0]
}

/**
 * Get shared y limits for type of data
 */
export function getYLimits (data) {
  let modelMaxes = data.models
      .filter(m => {
        // NOTE: Filtering based on the assumption that one model will have
        // /all/ the curves or none of them
        return m.curves.filter(c => c.data).length === m.curves.length
      })
      .map(m => {
        return m.curves.map(c => {
          return [c.data.length, Math.max(...c.data.map(d => d[1]))]
        })
      })

  // HACK: Simplify this
  // Identify curve type using the length of values in them
  let lengthToLimit = modelMaxes.reduce((acc, mm) => {
    mm.forEach(c => {
      acc[c[0]] = acc[c[0]] ? Math.max(acc[c[0]], c[1]) : c[1]
    })
    return acc
  }, {})

  let lengths = modelMaxes[0].map(c => c[0])
  return lengths.map(l => lengthToLimit[l])
}
