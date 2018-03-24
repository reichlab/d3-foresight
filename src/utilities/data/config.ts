/**
 * Functions for parsing data object for information
 */

/**
 * Verify data for time chart and provide information about it
 */
export function parseTimeChartData (data) {
  return {
    actual: 'actual' in data,
    observed: 'observed' in data,
    history: 'history' in data,
    baseline: 'baseline' in data,
    predictions: {
      peak: false, // Show peak
      onset: false, // Show onset markers and panel
      ci: false // Show ci selection
    }
  }
}
