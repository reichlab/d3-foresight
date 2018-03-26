/**
 * Functions for parsing data object for information
 */

/**
 * Doc guard
 */
import { Timepoint } from '../../interfaces'
import * as errors from '../errors'

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
 * Return ticks to show for given timepoints
 */
function getTicks (timePoints: Timepoint[], pointType: string): number[] {
  // @ts-ignore
  if (pointType.endsWith('-week')) {
    return timePoints.map(tp => tp.week)
  } else {
    throw new errors.UnknownPointType()
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
      onset: config.onset && isOnsetPresent(data.models)
    },
    ticks: getTicks(data.timePoints, config.pointType),
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
    ticks: getTicks(data.timePoints, config.pointType),
    pointType: config.pointType,
    curveNames: data.models[0].curves.map(c => c.name)
  }
}
