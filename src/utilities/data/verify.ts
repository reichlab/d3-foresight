/**
 * Functions for verifying if the data object for plotting is valid or not
 */

/**
 * Doc guard
 */
import { IncorrectData } from '../errors'

/**
 * Verify data for time chart
 */
export function verifyTimeChartData (data) {
  if (!('timePoints' in data)) {
    throw new IncorrectData('No timePoints key found in provided data')
  }
}

/**
 * Verify data for distribution chart
 */
export function verifyDistributionChartData (data) {
  if (!('timePoints' in data)) {
    throw new IncorrectData('No timePoints key found in provided data')
  }
}
