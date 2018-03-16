/**
 * Interfaces and types
 */

/**
 * Doc guard
 */
import * as d3 from 'd3'


/**
 * A timepoint. We only use weeks as of now.
 */
export type Timepoint = {
  year: number
  week: number
}

/**
 * Type of time point
 */
export type Point = 'regular-week' | 'mmwr-week'

/**
 * Range of numbers
 */
export type Range = [number, number]


/**
 * X, Y position as tuple
 */
export type Position = [number, number]

/**
 * Event
 */
export type Event = string
