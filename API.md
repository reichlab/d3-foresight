# d3-foresight API

This is a temporary document for laying out the interface for `d3-foresight` as
the development goes on. This document focuses on the timechart component of
visualization and doesn't talk much about the choropleth. *Should this change?
Open an [issue](https://github.com/reichlab/d3-foresight/issues/new).*

> There is a script named `timechart-data-dump.js` in the `test-foresight` branch
> ([flusight](https://github.com/reichlab/flusight)) that filters out data for
> season `2016-2017` and `National` region. Filtered data is written to
> `./src/assets/data-timechart.json` in the flusight repo.
>
> Same data is saved to this repository in `examples` directory. Also an schema
> is kept as `data-timechart.schema.json`. A more detailed explanation of the
> file is in the section on [timechart](#timechart)

## Data

Flusight has the aim to be a completely static application and thus creates a
central `data.json` file. This file has two properties.

- `branding` is used by flusight for metadata about the website
- `data` contains actual data

Every component in the application gets desired data via helper functions. These
functions tap onto a central store of data
from [vuex](https://github.com/vuejs/vuex) store which contains both, the data
from `data.json` and other items necessary to maintain the UI toggles and state.

For our purpose, in `d3-foresight`, the only relevant things are the transformations
from `data.json` to whatever data is ingested by the visualization components
like `TimeChart` or `Choropleth`. The central place to look for the trasformations
is
[here](https://github.com/reichlab/flusight/blob/test-foresight/src/store/getters.js).
These are getter functions which use `state` and other child `getters` (from
`modules` sub directory of `store`) to subset the data. `data` from `data.json`
is bound to `state.data` (this can be studied more in detail in
the
[store](https://github.com/reichlab/flusight/blob/test-foresight/src/store/)).

Specially important are the getters `timeChartData` and `choroplethData`. These
provide the data subset which gets in `TimeChart.plot`
(see
[here](https://github.com/reichlab/flusight/blob/test-foresight/src/store/actions.js#L21))
and describe the transformation in its entirety.

As mentioned earlier in the header note of this document, a subset is already
extracted for season `2016-2017` and `National` region and is kept in
`./examples` directory here. Before going into what this subset contains, its
necessary to be clear on how `data.json` structures these subsets and what that
means for the applications which are going to use `d3-foresight`.

## `d3-foresight` data structure

Although flusight is meant to be static, the data pipeline enabling the
visualization components (which we are extracting away) is amenable to extended
usage by applications with streaming data source. As seen on
the [web app](https://reichlab.github.io/flusight), at any time, the `timechart`
displays model predictions for a given influenza **season** and selected **region**.
Even with a lot of models to show, this subunit of discretization should be
relatively safe. Right now, on flusight, the data goes around 300 kb
in gzipped request. This includes 2 seasons and 11 regions in all, giving ~13kb
per selection of season-region, good enough to have this chunk of data sent from
a backend server. Also these chunks could be cached by your application if
needed. These chunks are also dominated by lag data (used for showing observed
data at given week) and are thus not likely to increase a lot while adding more
models. (*In fact, I recommend trying to use all data at first directly, instead
of using an API, similar to how flusight works and see if page is doing okay as
far as loading time is considered*).

These season-region selection can be taken out from `data.json` pretty easily.
For example, the main key `data` from `data.json` is essentially a list of all
11 regions. Then moving inside, there is a list for seasons and so on. Next
section explains these season-region chunks that gets passed to
`TimeChart.plot(data)`.

## Interface

### TimeChart

This has the following exposed functions (all other functions not discussed here
are internals and just are there for keeping things separate). This class uses a
bunch of marker objects (like `actual` line, `onset` marker etc.) which are
defined in `./src/modules/timechart.js`. The intended workflow with `TimeChart`
is as follows:

- Bind `TimeChart` to an HTML element.
- [Optionally] add event hooks to `TimeChart` which gets triggered whenever week
  is changed in timechart either by mouse clicks or whenever someone calls
  `update` function of timechart.
- Call `timechart.plot(data)` with the data subset of selected season and
  region. This will plot the corresponding stuff. Timechart is now self
  contained and accepts `timechart.update(idx)` to move the current week pointer
  here and there.
- Whenever you have a change in selected region (using the choropleth component
  or a dropdown) or in selected season, you just need to call
  `timechart.plot(data)` with your data subset for the new season-region pair.
  Every call to `plot` also maintains a list of models in the last selection to
  create smooth animations.

The exposed functions from the class are described next

#### 1. `Constructor`

  The constructor takes the selector string of the element to draw the chart on and a config
  object. (config is slightly ill defined as of now and will change depending on
  other things). It mostly just sets up a few SVG elements for the chart.
  
#### 2. `plot`

  `plot` is equivalent to a redraw in a sense. This clears off the whole thing
  (not exactly; mostly it updates components like baseline, actual line etc. by
  animating) and draws the given data object. Its argument is a single data
  object with following keys
  
  > `week` in these represents week identifier like 201636 for 36th MMWR week of
  > 2016-2017 season
  
  - `region`: **string** (submission id of region like *US National* etc. This is
    not getting used as of now)
  - `observed`: **array** of week-data pairs but the data also contains extra
    lag information helpful for showing data available while making predictions.
    - Each item is something like
    
    ```json
    { week: 201640,
      data: 
        [ { lag: 12, value: 1.20663 },
        { lag: 11, value: 1.20739 },
        { lag: 10, value: 1.20739 },
        { lag: 9, value: 1.21418 },
        { lag: 8, value: 1.2222 },
        { lag: 7, value: 1.2039 },
        { lag: 6, value: 1.20959 },
        { lag: 5, value: 1.21025 },
        { lag: 4, value: 1.20947 },
        { lag: 3, value: 1.20649 },
        { lag: 2, value: 1.19698 },
        { lag: 1, value: 1.1988 },
        { lag: 0, value: 1.09511 } ] }
    ```
    
  - `actual`: **array** of week-data pairs like `{ week: 201630, data: 0.719821
    }`. For no available data, it uses -1 (this is done since this was used as
    basis for axes. This will be fixed but doesn't really hurt.)
  - `baseline`: **number** baseline value for the season-region pair
  - `models`:  **array** of data from models. Each item has
    - `id` like `KDE`
    - `meta` like
    
    ```json
    { name: 'Kernel of Truth - KDE model',
    description: 'Kernel Density-based model from the Reich Lab at UMass-Amherst',
    url: 'https://reichlab.github.io/2016/11/23/introducing-flusight.html' }
    ```
    
    - `stats` for mean absolute error (mae) and log score (log) for week ahead
      predictions
      
      ```json
      { mae: 
      { oneWk: 0.1949333333333333,
        twoWk: 0.2145099999999999,
        threeWk: 0.24110999999999994,
        fourWk: 0.28542666666666655 },
      log: 
      { oneWk: -2.930174547831695,
        twoWk: -2.9837861198415765,
        threeWk: -3.0297293625596984,
        fourWk: -3.1018681719091052 } }
      ```
      
    - `predictions` **array** of predictions. Each item has
      - `week`
      - 7 targets (`onsetWeek`, `peakWeek` etc.). Each of these targets have
        following keys
        - `point`: point prediction value
        - `low`: array of two low confidence values. One for 50% and other for
          90%
        - `high`: two high confidence values.
  - `history`: **array** of history data
    - Each item has an `id` (like `2005-2006`) and `actual` containing an array
      of week-data pairs like `{ week: 200530, data: 0.74492697915824 }`.
  
  Please see the schema (`./examples/data-timechart.schema.json`) and the file
  itself (`./examples/data-timechart.json`) to get more details.

#### 3. `update`

  `update` expects the index of the week to go to. This calls update function on
  component markers and triggers `weekHooks`.

### Choropleth

TODO
