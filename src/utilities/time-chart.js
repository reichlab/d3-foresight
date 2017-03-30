import * as d3 from 'd3'
import * as mmwr from 'mmwr-week'

/**
 * Get index to start the plot at
 */
export const getFirstPlottingIndex = (data, isLiveSeason) => {
  let timePointsWeek = data.timePoints.map(tp => tp.week)
  if (isLiveSeason) {
    // Start at the latest prediction
    return Math.max(...data.models.map(m => {
      if (m.predictions.length === 0) return 0
      else {
        return timePointsWeek
          .indexOf(m.predictions[m.predictions.length - 1].week % 100)
      }
    }))
  } else {
    // Start at the oldest prediction
    let modelPredictions = data.models
        .map(m => {
          if (m.predictions.length === 0) return -1
          else {
            return timePointsWeek.indexOf(m.predictions[0].week % 100)
          }
        }).filter(d => d !== -1)

    if (modelPredictions.length === 0) {
      // Start at the most recent actual data
      return data.actualIndices[data.actualIndices.length - 1]
    } else {
      return Math.min(...modelPredictions)
    }
  }
}

/**
 * Return points where the predictions were made
 * This is used as the first point in prediction marker
 */
export const getPredictionStartingPoints = data => {
  return data.observed.map(d => {
    // Handle zero length values
    if (d.length !== 0) {
      return d.filter(ld => ld.lag === 0)[0].value
    } else {
      return null
    }
  })
}

export const getXDateDomain = (data, pointType) => {
  return d3.extent(data.timePoints.map(d => {
    if (pointType === 'mmwr-week') {
      return (new mmwr.MMWRDate(d.year, d.week)).toMomentDate()
    } else if (pointType === 'regular-week') {
      return d3.timeParse('%Y-%W')(d.year + '-' + d.week)
    } else {
      return null
    }
  }))
}

export const getXPointDomain = (data, pointType) => {
  if (pointType.endsWith('-week')) {
    return data.timePoints.map(d => d.week)
  } else {
    return null
  }
}

export const getYDomain = data => {
  // Max from actual data
  let maxValues = [Math.max(...data.actual.filter(d => d))]
  // Max from observed data
  maxValues.push(Math.max(...data.observed.map(d => {
    return Math.max(...d.map(dl => dl.value))
  })))
  // Max from historical data
  data.history.forEach(h => {
    maxValues.push(Math.max(...h.actual))
  })
  // Max from all the models
  data.models.map(mdl => {
    maxValues.push(Math.max(...mdl.predictions.map(d => Math.max(...[
      Math.max(...d.oneWk.high),
      Math.max(...d.twoWk.high),
      Math.max(...d.threeWk.high),
      Math.max(...d.fourWk.high),
      Math.max(...d.peakPercent.high)
    ]))))
  })
  // Clipping at 13 since we don't predict beyond that
  return [0, Math.max(13, 1.1 * Math.max(...maxValues))]
}

/**
 * Return next four week numbers for given week
 */
export const getNextWeeks = (currentWeek, weeks) => {
  let current = weeks.indexOf(currentWeek % 100)
  let nextWeeks = []
  for (let i = 0; i < 4; i++) {
    current += 1
    if (current < weeks.length) nextWeeks.push(weeks[current])
  }
  return nextWeeks
}
