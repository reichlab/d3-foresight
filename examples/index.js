(function () {
  window.onload = function () {
    var xhr = new window.XMLHttpRequest()
    xhr.addEventListener('load', function (data) {
      var parsedData = window.JSON.parse(this.responseText)
      var timechart = new window.d3Foresight.TimeChart(document.getElementById('container'), parsedData, {
        initalizeWithNinetyPercent: true
      })
      timechart.plot()
    })
    xhr.open('GET', 'data-timechart.json')
    xhr.send()
  }
})()
