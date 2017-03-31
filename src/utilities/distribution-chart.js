export const getYDomain = data => {
  return [0, Math.max(...data.models.map(m => Math.max(...m.predictions.y)))]
}

export const getXDomain = data => {
  return [
    Math.min(...[...data.models.map(m => Math.min(...m.predictions.x)), data.actual]),
    Math.max(...[...data.models.map(m => Math.max(...m.predictions.x)), data.actual])
  ]
}
