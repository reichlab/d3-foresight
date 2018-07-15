/**
 * Functions for parsing data object for information
 */

/**
 * Doc guard
 */
import { Timepoint } from '../../interfaces'
import * as errors from '../errors'
import { getTick } from './timepoints'

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
 * Tell if we have data version date present in the predictions data
 */
function isVersionDatePresent (modelsData): boolean {
  let model = modelsData[0]
  let nonNullPreds = model.predictions.filter(p => p !== null)
  if (nonNullPreds.length === 0) {
    // Keeping the default behavior simple
    return false
  } else {
    return nonNullPreds.every(p => 'data-version-date' in p)
  }
}


/**
 * Parse time chart data and provide information about it
 */
export function getTimeChartDataConfig (data, config) {
  return {
    actual: 'actual' in data,
    observed: 'observed' in data,
    history: 'history' in data,
    baseline: 'baseline' in data,
    predictions: {
      peak: isPeakPresent(data.models),
      onset: config.onset && isOnsetPresent(data.models),
      versionDate: isVersionDatePresent(data.models)
    },
    ticks: data.timePoints.map(tp => getTick(tp, config.pointType)),
    pointType: config.pointType
  }
}

/**
 * Parse distribution chart data and provide information about it
 */
export function getDistChartDataConfig (data, config) {
  return {
    actual: false,
    observed: false,
    history: false,
    ticks: data.timePoints.map(tp => getTick(tp, config.pointType)),
    pointType: config.pointType,
    curveNames: data.models[0].curves.map(c => c.name)
  }
}
