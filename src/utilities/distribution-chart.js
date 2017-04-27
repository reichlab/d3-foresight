import * as d3 from 'd3'
import * as mmwr from 'mmwr-week'

export const UnknownPointTypeException = message => {
  this.message = message
}

export const getXDateDomain = (timePoints, pointType) => {
  return d3.extent(timePoints.map(d => {
    if (pointType === 'mmwr-week') {
      return (new mmwr.MMWRDate(d.year, d.week)).toMomentDate()
    } else if (pointType === 'regular-week') {
      return d3.timeParse('%Y-%W')(d.year + '-' + d.week)
    } else {
      throw UnknownPointTypeException()
    }
  }))
}

export const getYDomain = (data, curveIdx) => {
  let modelMaxes = data.models.map(m => {
    return Math.max(...m.curves[curveIdx].data.map(d => d[1]))
  })
  return [0, Math.max(...modelMaxes)]
}

export const getXDomain = (data, curveIdx) => {
  // This assumes an ordinal scale
  for (let i = 0; i < data.models.length; i++) {
    if (data.models[i].curves[curveIdx].data.length > 0) {
      // Return the x series directly
      return data.models[i].curves[curveIdx].data.map(d => d[0])
    }
  }
  return null
}
