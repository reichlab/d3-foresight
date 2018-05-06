/**
 * Functions for working with various timepoint types
 */

/**
 * Doc guard
 */
import * as mmwr from 'mmwr-week'
import * as d3 from 'd3'
import { Timepoint } from '../../interfaces'
import * as errors from '../errors'


/**
 * Return ticks to show for the timepoints
 */
export function getTick(tp: Timepoint, pointType: string): string | number {
  // @ts-ignore
  if (pointType.endsWith('-week')) {
    // This is either regular-week or mmwr-week. Both have the same structure.
    return tp.week
  } if (pointType === 'biweek') {
    return tp.biweek
  } else {
    throw new errors.UnknownPointType()
  }
}

/**
 * Return date time value for the timepoint
 */
export function getDateTime(tp: Timepoint, pointType: string) {
  if (pointType === 'regular-week') {
    return d3.timeParse('%Y-%W')(`${tp.year}-${tp.week}`)
  } else if (pointType === 'mmwr-week') {
    return (new mmwr.MMWRDate(tp.year, tp.week)).toMomentDate()
  } else if (pointType === 'biweek') {
    return d3.timeParse('%Y-%W')(`${tp.year}-${tp.biweek * 2}`)
  } else {
    throw new errors.UnknownPointType()
  }
}
