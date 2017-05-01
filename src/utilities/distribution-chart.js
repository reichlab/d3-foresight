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
    let curveData = m.curves[curveIdx].data
    if (!curveData) {
      return 0
    } else {
      return Math.max(...curveData.map(d => d[1]))
    }
  })
  return [0, Math.max(...modelMaxes)]
}

export const getXDomain = (data, curveIdx) => {
  // This assumes an ordinal scale
  for (let i = 0; i < data.models.length; i++) {
    let curveData = data.models[i].curves[curveIdx].data
    if (curveData) {
      // Return the x series directly
      return curveData.map(d => d[0])
    } else {
      return [0, 0]
    }
  }
}

/**
 * Get shared y limits for type of data
 */
export const getYLimits = data => {
  let modelMaxes = data.models.map(m => {
    return m.curves.map(c => {
      return c.data ? [c.data.length, Math.max(...c.data.map(d => d[1]))] : [0, 0]
    })
  })

  // HACK: Simplify this
  // Identify curve type using the length of values in them
  let lengthToLimit = modelMaxes.reduce((acc, mm) => {
    mm.forEach(c => {
      acc[c[0]] = acc[c[0]] ? Math.max(acc[c[0]], c[1]) : c[1]
    })
    return acc
  }, {})

  let lengths = modelMaxes[0].map(c => c[0])
  return lengths.map(l => lengthToLimit[l])
}
