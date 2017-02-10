# d3-foresight API

This is a temporary document for laying out the interface for `d3-foresight` as
the development goes on.

### Data transformation

This section documents the flow of data in flusight which might help explain the
arguments of `TimeChart`, `Choropleth` etc.

`data.json` has two properties.

- `branding` is used by flusight for metadata about the website
- `data` contains actual data

The central place to look for the trasformations
is
[this](https://github.com/reichlab/flusight/blob/test-foresight/src/store/getters.js).
These are getter functions which use `state` and other child `getters` (from
`modules` subdirectory of `store`) to subset the data. `data` from `data.json`
is bound to `state.data` (this can be studied more in detail in
the
[store](https://github.com/reichlab/flusight/blob/test-foresight/src/store/)).

Specially important are the getters `timeChartData` and `choroplethData`. These
provide the data subset which gets in `TimeChart.plot`
(see
[here](https://github.com/reichlab/flusight/blob/test-foresight/src/store/actions.js#L21))
and describe the transformation in its entirety.

---

There are 2 classes, one for plotting the timechart (`TimeChart`) with forecasts
and other for plotting the usa map (`Choropleth`).

### TimeChart

This has the following exposed functions (all other functions not discussed here
are internals and just are there for keeping things separate). This class uses a
bunch of marker objects (like `actual` line, `onset` marker etc.) which are
defined in `./src/modules/timechart.js`.

- constructor

  The constructor takes the id of the element to draw the chart on and a
  function `weekHook` that gets called everytime the week selection on timechart
  changes (e.g. on mouse events). The argument for `weekHook` function is an
  integer specifying the index of the currently selected week in the array of
  weeks in the current season. This could be used, for example, to trigger other
  components to change weeks or anything.
  
  Other than this, the constructor just set up a few svg elements and the likes.
  
- plot

  `plot` is equivalent to a redraw in a sense. This clears off the whole thing and
  redraws given the data object. This is called everytime there is a change in
  selected region or selected season. In the data it expects the following keys
  
  - region (submission id, this is not getting used)
  - observed (the observed data series, with lags)
  - actual (the actual data series)
  - baseline (baseline value for the season, region pair)
  - models (array of data from models)
  - history (historical series)
  
  More details about the structure can be pryed out
  from
  [here](https://github.com/reichlab/flusight/blob/develop/src/store/getters.js#L73-L84).
  

- update

  `update` expects the index of the week to goto. This calls update function on
  component markers.

### Choropleth

TODO
