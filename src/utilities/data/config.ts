/**
 * Functions for parsing data object for information
 */

/**
 * Parse time chart data and provide information about it
 */
export function getTimeChartDataConfig (data) {
  return {
    actual: 'actual' in data,
    observed: 'observed' in data,
    history: 'history' in data,
    baseline: 'baseline' in data,
    predictions: {
      peak: false, // Show peak
      onset: false // Show onset markers and panel
    }
  }
}

/**
 * Parse distribution chart data and provide information about it
 */
export function getDistChartDataConfig (data) {
  return {
    actual: false,
    observed: false,
    history: false
  }
}
