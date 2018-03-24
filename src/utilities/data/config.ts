/**
 * Functions for parsing data object for information
 */

/**
 * Tell if onset predictions are present in the data
 */
function isOnsetPresent (modelsData): boolean {
  let model = modelsData[0]
  let nonNullPreds = model.predictions.filter(p => p !== null)
  if (nonNullPreds.length === 0) {
    // Just to be safe
    return false
  } else {
    return 'onsetTime' in nonNullPreds[0]
  }
}

/**
 * Tell if peak predictions are present in the data
 */
function isPeakPresent (modelsData): boolean {
  let model = modelsData[0]
  let nonNullPreds = model.predictions.filter(p => p !== null)
  if (nonNullPreds.length === 0) {
    // Just to be safe
    return false
  } else {
    return ('peakTime' in nonNullPreds[0]) && ('peakValue' in nonNullPreds[0])
  }
}

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
      peak: isPeakPresent(data.models),
      onset: isOnsetPresent(data.models)
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
