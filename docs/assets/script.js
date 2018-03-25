document.addEventListener("DOMContentLoaded", function (event) {
  let timeChartOptions = {
    pointType: 'mmwr-week'
  }

  let timeChart = new d3Foresight.TimeChart('#timechart', timeChartOptions)

  let data = {
    timePoints: [
      { week: 20, year: 2016 },
      { week: 21, year: 2016 },
      { week: 22, year: 2016 },
      { week: 23, year: 2016 },
      { week: 24, year: 2016 },
    ],
    actual: [1.1, 1.3, 1.4, 1.3, 1.1],
    models: [
      {
        id: 'mod',
        meta: {
          name: 'Name',
          description: 'Model description here',
          url: 'http://github.com'
        },
        predictions: [
          null,
          {
            series: [
              { point: 1.5 },
              { point: 1.5 },
            ]
          },
          {
            series: [
              { point: 1.5 },
              { point: 1.5 },
            ]
          },
          null,
          null
        ]
      }
    ]
  }
  timeChart.plot(data)

  window.tc = timeChart
  // For updating the current position of displayed predictions
  // timeChart.update(0)
  // Or simply
  // timeChart.moveForward()
  // timeChart.moveBackward()
})
