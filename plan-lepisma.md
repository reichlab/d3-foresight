Plan
====

Use Case
--------

`d3-foresight` is expected to provide components for creating timeseries
visualizations in JS focused on forecasts and interactiveness. There are
two components in plan, both of which are up on *flusight*.

1.  Map :: *flusight* works by grouping US states from *datamaps* into
    *HHS regions* and adding a level of abstraction to allow easy
    creation of interactive choropleth with sequential and diverging
    color scales.
2.  TimeChart :: This component displays time series, predictions and
    other markers.

Interface
---------

> Basic idea of what I, as a user, expect from a visualization library.

The extensibility of an interface is the greatest if the library assumes
minimal input from the user and doesn't bind to a certain way of doing
things. For example, a component which is plotting a time series indexed
by item number should just take an array and can go something like this
in code.

``` {.javascript}
  let seriesChart = new SeriesChart('#elementSelector', data = [1, 2, 3, 4, 56, -1])
```

If items currently displayed (in this case, the SVG path) are going to
be changed during the lifetime of the component, then the chart could
explicitly ask for more data something like

``` {.javascript}
  seriesChart.plot(data = [3, 2, 4, 12, 3]); // Draw a new line
  seriesChart.addPoint(4); // Or add a new point to create a live timechart
```

This is intuitive, a common pattern used in
[many](http://c3js.org/samples/data_load.html)
[libraries](http://jsbin.com/yitep/5/edit?html,js,output) and gauranteed
to work in all the cases. By *all the cases* I refer to the differences
in

-   availability of data
    -   everything available right away
    -   application invoking a source (frontend JS store, backend API
        calls etc.) on demand
-   frontend framework / pattern
    -   plain `<script></script>` include in html files
    -   angular, vue, react, ember etc.

Milestones
----------

> Considering legend overflow issue and skipping map for now. Also
> leaving code optimization and general documentation

-   MVP. This could just go well if no major feature change is needed
    -   Fix styling issues
    -   Fix legend overflow. Possibly a *scroll + search* style
        solution?

-   Configurable chart. Skipping certain markers, passing color scheme and other
    options

-   General time series. Allowing other time series (not discretized in units of MMWR weeks)

Concerns and comments
---------------------

-   Decision by discussion of pros and cons for the library, instead of
    what it means for the backend. If something is not considered worth
    explaining because of backend idiosyncrasies or is somehow bringing
    in the talk of backend, its probably wrong to touch that feature in
    `d3-foresight` just because it will again be a pain for some other
    person with a different backend. An example is in PR
    [\#17](https://github.com/reichlab/d3-foresight/pull/17). There our
    talk goes to how a particular interface *can be used* by a
    particular backend but the discussion is still open with regards to
    what pros cons are there for the library itself in implementing
    that interface. Putting in my views on that issue, the library
    shouldn't be worried about the backend's centralized data store (or
    just one season, region data) and so should just ask for thing to be
    drawn right now as this is the most general approach. Cleaning this
    up for better maintainability and debugging, it also gets reflected
    as not hooking data to an object reference which is controlled by
    mutations not immediately visible in the vicinity of `TimeChart`.
-   Development roles
-   Testing on *flusight* at each step of release won't hurt since
    `test-foresight` branch uses the library just as any other 3rd party
    would be.
