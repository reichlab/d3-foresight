# d3-foresight API

This is a temporary document for laying out the interface for `d3-foresight` as
the development goes on. This document focuses on the timechart component of
visualization and doesn't talk much about the choropleth. *Should this change?
Open an [issue](https://github.com/reichlab/d3-foresight/issues/new).*

> Same data is saved to this repository in `examples` directory. Also an schema
> is kept as `data-timechart.schema.json`. A more detailed explanation of the
> file is in the section on [timechart](#timechart)

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
- Call `timechart.plot()` with the data subset of selected season and
  region. This will plot the corresponding stuff. Timechart is now self
  contained and accepts `timechart.update(idx)` to move the current week pointer
  here and there.
- Whenever you have a change in selected region (using the choropleth component
  or a dropdown) or in selected season, you just need to call
  `timechart.plot()`.
  Every call to `plot` also maintains a list of models in the last selection to
  create smooth animations.

#### 2. `plot`

  `plot` is equivalent to a redraw in a sense. This clears off the whole thing
  (not exactly; mostly it updates components like baseline, actual line etc. by
  animating).
  
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
