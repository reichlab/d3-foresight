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
import { parseText } from '../tooltip';

/**
 * Return week number for the date
 */
function parseWeek(d: Date): number {
  return parseInt(d3.timeFormat('%W')(d)) + 1
}

/**
 * Parse timepoint to standard dictionary format
 */
function parseTimepoint(tp: Timepoint | Date, pointType: string): Timepoint {
  if ((<Timepoint>tp).year) {
    // This is already in the correct form
    return <Timepoint>tp
  } else if (tp instanceof Date) {
    if (pointType === 'regular-week') {
      return { year: tp.getFullYear(), week: parseWeek(tp) }
    } else if (pointType === 'mmwr-week') {
      let mdate = new mmwr.MMWRDate(0)
      mdate.fromJSDate(tp)
      return { year: mdate.year, week: mdate.week }
    } else if (pointType === 'biweek') {
      return { year: tp.getFullYear(), week: Math.floor(parseWeek(tp) / 2) }
    } else {
      throw new errors.UnknownPointType()
    }
  }
}

/**
 * Return ticks to show for the timepoints
 */
export function getTick(tp: Timepoint | Date, pointType: string): string | number {
  tp = parseTimepoint(tp, pointType)
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
export function getDateTime(tp: Timepoint | Date, pointType: string) {
  if (tp instanceof Date) {
    return tp
  } else {
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
}
