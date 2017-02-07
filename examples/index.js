(function () {
  window.onload = function () {
    var timechart = new window.d3Foresight.TimeChart(document.getElementById('container'), { weekHook: function () {} })
    return timechart
  }
})()
