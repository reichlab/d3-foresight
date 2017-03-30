import * as d3 from 'd3'
import * as mmwr from 'mmwr-week'

/**
 * Get index to start the plot at
 */
export const getFirstPlottingIndex = (data, isLiveSeason) => {
  let timePoints = data.actual.map(d => d.week % 100)
  let actualIndices = data.actual.filter(d => d.data)
      .map(d => timePoints.indexOf(d.week % 100))

  if (isLiveSeason) {
    // Start at the latest prediction
    return Math.max(...data.models.map(m => {
      if (m.predictions.length === 0) return 0
      else {
        return timePoints
          .indexOf(m.predictions[m.predictions.length - 1].week % 100)
      }
    }))
  } else {
    // Start at the oldest prediction
    let modelPredictions = data.models
        .map(m => {
          if (m.predictions.length === 0) return -1
          else {
            return timePoints.indexOf(m.predictions[0].week % 100)
          }
        }).filter(d => d !== -1)

    if (modelPredictions.length === 0) {
      // Start at the most recent actual data
      return actualIndices[actualIndices.length - 1]
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
    let dataToReturn = -1
    // Handle zero length values
    if (d.data.length !== 0) {
      dataToReturn = d.data.filter(ld => ld.lag === 0)[0].value
    }
    return {
      week: d.week,
      data: dataToReturn
    }
  })
}

export const getXDateDomain = data => {
  return d3.extent(data.actual.map(d => {
    let year = Math.floor(d.week / 100)
    let week = d.week % 100
    let mdate = new mmwr.MMWRDate(year, week)
    return mdate.toMomentDate()
  }))
}

export const getXPointDomain = data => {
  return data.actual.map(d => d.week % 100)
}

export const getYDomain = data => {
  // Max from actual data
  let maxValues = [Math.max(...data.actual.map(d => d.data))]
  // Max from observed data
  maxValues.push(Math.max(...data.observed.map(d => {
    return Math.max(...d.data.map(dl => dl.value))
  })))
  // Max from historical data
  data.history.forEach(h => {
    maxValues.push(Math.max(...h.actual.map(d => d.data)))
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
