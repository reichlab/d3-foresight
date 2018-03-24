import SComponent from '../../s-component'
import LineMarker from './line-marker'
import OnsetMarker from './onset-marker'
import PeakMarker from './peak-marker'

/**
 * Prediction marker with following components
 * - Area
 * - Line and dots
 * - Onset
 * - Peak
 */
export default class Prediction extends SComponent {
  constructor ({ id, meta, color, onsetY, cid, tooltip }) {
    super()

    this.lineMarker = this.append(new LineMarker(id, color))
    this.peakMarker = this.append(new PeakMarker(id, color))
    this.onsetMarker = this.append(new OnsetMarker(id, color, onsetY))

    this.color = color
    this.id = id
    this.meta = meta
    this.cid = cid
    this.tooltip = tooltip

    // Tells if the prediction is hidden by some other component
    this._hidden = false
    // Tells if data is available to be shown for current time
    this.noData = true
  }

  plot (scales, modelData, initPoints) {
    this.modelData = modelData
    this.initPoints = initPoints
    this.displayedData = Array(this.modelData.length).fill(false)
    this.scales = scales
  }

  get config () {
    return {
      scales: this.scales,
      id: this.id,
      meta: this.meta,
      color: this.color,
      cid: this.cid,
      tooltip: this.tooltip
    }
  }

  update (idx) {
    let currData = this.modelData[idx]
    if (currData === null) {
      // There is no data for current point, hide the markers without
      // setting exposed hidden flag
      this.noData = true
      this.hideMarkers()
    } else {
      this.noData = false
      if (!this.hidden) {
        // No one is hiding me
        this.showMarkers()
      }

      this.onsetMarker.move(this.config, currData.onsetTime)
      this.peakMarker.move(this.config, currData.peakTime, currData.peakValue)

      // Move main pointers
      let nextTimeData = []

      if (this.initPoints) {
        // If we have anchor points to start at, use those
        // as the first point in the predictions
        nextTimeData.push({
          index: idx,
          point: this.initPoints[idx],
          low: this.initPoints[idx],
          high: this.initPoints[idx]
        })
      }

      let idxOverflow = Math.min(0, this.modelData.length - (idx + currData.series.length))
      let displayLimit = currData.series.length - idxOverflow

      for (let i = 0; i < displayLimit; i++) {
        if (this.cid === null) {
          nextTimeData.push({
            index: i + idx + 1,
            point: currData.series[i].point,
            low: currData.series[i].point,
            high: currData.series[i].point
          })
        } else {
          nextTimeData.push({
            index: i + idx + 1,
            point: currData.series[i].point,
            low: currData.series[i].low[this.cid],
            high: currData.series[i].high[this.cid]
          })
        }
      }

      // Save indexed data for query
      this.displayedData = Array(this.modelData.length).fill(false)
      nextTimeData.slice(1).forEach(d => {
        this.displayedData[d.index] = d.point
      })

      this.lineMarker.move(this.config, nextTimeData)
    }
  }

  /**
   * Check if we are hidden
   */
  get hidden () {
    return this._hidden
  }

  set hidden (hide) {
    if (hide) {
      this.hideMarkers()
    } else {
      if (!this.noData) {
        this.showMarkers()
      }
    }
    this._hidden = hide
  }

  hideMarkers () {
    this.onsetMarker.hidden = true
    this.peakMarker.hidden = true
    this.lineMarker.hidden = true
  }

  showMarkers () {
    this.onsetMarker.hidden = false
    this.peakMarker.hidden = false
    this.lineMarker.hidden = false
  }

  /**
   * Remove the markers
   */
  clear () {
    super.clear()
    this.selection.remove()
  }

  /**
   * Ask if we have something to show at the index
   */
  query (idx) {
    // Don't show anything if predictions are hidden
    return (!this.noData && !this.hidden && this.displayedData[idx])
  }

  /**
   * Return index of asked idx among displayedData items
   */
  displayedIdx (idx) {
    for (let i = 0; i < this.displayedData.length; i++) {
      if (this.displayedData[i]) return (idx - i)
    }
    return null
  }
}
