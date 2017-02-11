(function () {
  window.onload = function () {
    var timechart = new window.d3Foresight.TimeChart('#chart')
    var xhr = new window.XMLHttpRequest()
    xhr.addEventListener('load', function (data) {
      timechart.plot(window.JSON.parse(this.responseText))
    })
    xhr.open('GET', 'data-timechart.json')
    xhr.send()
  }
})()
