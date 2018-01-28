(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("d3"), require("moment"));
	else if(typeof define === 'function' && define.amd)
		define("d3Foresight", ["d3", "moment"], factory);
	else if(typeof exports === 'object')
		exports["d3Foresight"] = factory(require("d3"), require("moment"));
	else
		root["d3Foresight"] = factory(root["d3"], root["moment"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_0__, __WEBPACK_EXTERNAL_MODULE_37__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 28);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_0__;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.colors50 = exports.colors30 = exports.hexToRgba = undefined;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

exports.getMousePosition = getMousePosition;

var _d2 = __webpack_require__(0);

var d3 = _interopRequireWildcard(_d2);

var _tinycolor = __webpack_require__(35);

var _tinycolor2 = _interopRequireDefault(_tinycolor);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

/**
 * Return mouse position as absolute value for current view using the provided
 * d3Selection. The selection here matters because many of the elements with
 * mouse events are translated with respect to original svg. Most of the calls
 * to this function use .overlay as reference
 */
function getMousePosition(d3Selection) {
  var _d3$mouse = d3.mouse(d3Selection.node()),
      _d3$mouse2 = _slicedToArray(_d3$mouse, 2),
      x = _d3$mouse2[0],
      y = _d3$mouse2[1];

  var bb = d3Selection.node().getBoundingClientRect();
  return [x + bb.left, y + bb.top];
}

/**
 * Convert hex to rgba
 */
var hexToRgba = exports.hexToRgba = function hexToRgba(hex, alpha) {
  return (0, _tinycolor2.default)(hex).setAlpha(alpha).toRgbString();
};

/**
 * Some pre generated palettes from http://tools.medialab.sciences-po.fr/iwanthue/
 */
var colors30 = exports.colors30 = ['#3cb8c0', '#f0574b', '#4dc968', '#db6dd8', '#75c142', '#9c78ef', '#bfc83c', '#568ced', '#d2aa3b', '#e165b7', '#62c793', '#ef5297', '#61daca', '#e76b2e', '#5daade', '#d88a2f', '#9999dc', '#909d37', '#be87d4', '#abd077', '#ec5778', '#6c9e5b', '#dc77a0', '#d3c179', '#e29cce', '#c6925e', '#e26d67', '#eb9491', '#e3845e', '#cb7478'];

var colors50 = exports.colors50 = ['#d48232', '#4f8af1', '#b2c834', '#b171ed', '#69b92e', '#e364d2', '#61d96a', '#e464ae', '#3bab40', '#c87dd6', '#96dc5b', '#8982e6', '#debf2e', '#499ae1', '#df9b2a', '#5cb4e1', '#e96735', '#42dcaa', '#f14c55', '#50d885', '#eb5a88', '#46a459', '#ea6368', '#46c9d2', '#de7a58', '#4aba9e', '#eea7e0', '#74a530', '#c4a8ef', '#bdd461', '#8b94d4', '#94a231', '#c57dae', '#95cf73', '#e88ba1', '#90da99', '#d27878', '#7fdcbf', '#ed9d7d', '#4a9a74', '#e5b06f', '#77b97c', '#b8844c', '#6e984c', '#d5c056', '#8ca259', '#a59229', '#b9cf84', '#9a914f', '#ccc17d'];

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UnknownPointTypeException = UnknownPointTypeException;
exports.HookNotUnderstoodException = HookNotUnderstoodException;
/**
 * Custom exception for case when point type (the type of x axis) can't be
 * handled
 */
function UnknownPointTypeException(message) {
  this.name = 'UnknownPointTypeException';
  this.message = message || 'Point type not understood';
  this.stack = new Error().stack;
}

UnknownPointTypeException.prototype = Object.create(Error.prototype);
UnknownPointTypeException.prototype.constructor = UnknownPointTypeException;

/**
 * Exception for hook
 */
function HookNotUnderstoodException(message) {
  this.name = 'HookNotUnderstoodException';
  this.message = message || 'Requested hook not found';
  this.stack = new Error().stack;
}

HookNotUnderstoodException.prototype = Object.create(Error.prototype);
HookNotUnderstoodException.prototype.constructor = HookNotUnderstoodException;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _controlPanel = __webpack_require__(13);

Object.defineProperty(exports, 'ControlPanel', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_controlPanel).default;
  }
});

var _axisX = __webpack_require__(11);

Object.defineProperty(exports, 'XAxis', {
  enumerable: true,
  get: function get() {
    return _axisX.XAxis;
  }
});
Object.defineProperty(exports, 'XAxisDate', {
  enumerable: true,
  get: function get() {
    return _axisX.XAxisDate;
  }
});

var _axisY = __webpack_require__(12);

Object.defineProperty(exports, 'YAxis', {
  enumerable: true,
  get: function get() {
    return _axisY.YAxis;
  }
});

var _tooltip = __webpack_require__(14);

Object.defineProperty(exports, 'DistributionTooltip', {
  enumerable: true,
  get: function get() {
    return _tooltip.DistributionTooltip;
  }
});
Object.defineProperty(exports, 'TimeChartTooltip', {
  enumerable: true,
  get: function get() {
    return _tooltip.TimeChartTooltip;
  }
});
Object.defineProperty(exports, 'InfoTooltip', {
  enumerable: true,
  get: function get() {
    return _tooltip.InfoTooltip;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getYLimits = exports.getXDomain = exports.getYDomain = exports.getXDateDomain = exports.formatBin = undefined;

var _d = __webpack_require__(0);

var d3 = _interopRequireWildcard(_d);

var _mmwrWeek = __webpack_require__(7);

var mmwr = _interopRequireWildcard(_mmwrWeek);

var _errors = __webpack_require__(2);

var errors = _interopRequireWildcard(_errors);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

/**
 * Return a formatted string representing a bin at index from series
 */
var formatBin = exports.formatBin = function formatBin(series, index) {
  var start = series[index];
  var end = void 0;

  // Figure out if we are working with integers
  var diff = series[1] - series[0];

  if (index === series.length - 1) {
    // We are at the end, use the diff
    end = start + diff;
  } else {
    end = series[index + 1];
  }

  if (diff < 1) {
    // These are floats
    return start.toFixed(2) + '-' + end.toFixed(2);
  } else {
    return start + '-' + end;
  }
};

var getXDateDomain = exports.getXDateDomain = function getXDateDomain(timePoints, pointType) {
  return d3.extent(timePoints.map(function (d) {
    if (pointType === 'mmwr-week') {
      return new mmwr.MMWRDate(d.year, d.week).toMomentDate();
    } else if (pointType === 'regular-week') {
      return d3.timeParse('%Y-%W')(d.year + '-' + d.week);
    } else {
      throw new errors.UnknownPointTypeException();
    }
  }));
};

var getYDomain = exports.getYDomain = function getYDomain(data, curveIdx) {
  var modelMaxes = data.models.map(function (m) {
    var curveData = m.curves[curveIdx].data;
    if (!curveData) {
      return 0;
    } else {
      return Math.max.apply(Math, _toConsumableArray(curveData.map(function (d) {
        return d[1];
      })));
    }
  });
  return [0, Math.max.apply(Math, _toConsumableArray(modelMaxes))];
};

var getXDomain = exports.getXDomain = function getXDomain(data, curveIdx) {
  // This assumes an ordinal scale
  for (var i = 0; i < data.models.length; i++) {
    var curveData = data.models[i].curves[curveIdx].data;
    if (curveData) {
      // Return the x series directly
      return curveData.map(function (d) {
        return d[0];
      });
    }
  }
  return [0, 0];
};

/**
 * Get shared y limits for type of data
 */
var getYLimits = exports.getYLimits = function getYLimits(data) {
  var modelMaxes = data.models.filter(function (m) {
    // NOTE: Filtering based on the assumption that one model will have
    // /all/ the curves or none of them
    return m.curves.filter(function (c) {
      return c.data;
    }).length === m.curves.length;
  }).map(function (m) {
    return m.curves.map(function (c) {
      return [c.data.length, Math.max.apply(Math, _toConsumableArray(c.data.map(function (d) {
        return d[1];
      })))];
    });
  });

  // HACK: Simplify this
  // Identify curve type using the length of values in them
  var lengthToLimit = modelMaxes.reduce(function (acc, mm) {
    mm.forEach(function (c) {
      acc[c[0]] = acc[c[0]] ? Math.max(acc[c[0]], c[1]) : c[1];
    });
    return acc;
  }, {});

  var lengths = modelMaxes[0].map(function (c) {
    return c[0];
  });
  return lengths.map(function (l) {
    return lengthToLimit[l];
  });
};

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _common = __webpack_require__(3);

var commonComponents = _interopRequireWildcard(_common);

var _errors = __webpack_require__(2);

var errors = _interopRequireWildcard(_errors);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Chart superclass
 */
var Chart = function () {
  function Chart(elementSelection, onsetHeight) {
    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

    _classCallCheck(this, Chart);

    var defaultConfig = {
      axes: {
        x: {
          title: 'X',
          description: 'X axis',
          url: '#'
        },
        y: {
          title: 'Y',
          description: 'Y axis',
          url: '#'
        }
      },
      margin: {
        top: 5,
        right: 50,
        bottom: 70 + onsetHeight,
        left: 55
      }
    };
    this.config = Object.assign({}, defaultConfig, options);

    var chartBB = elementSelection.node().getBoundingClientRect();
    var divWidth = chartBB.width;
    var divHeight = 480;

    // Create blank chart
    this.width = divWidth - this.config.margin.left - this.config.margin.right;
    this.height = divHeight - this.config.margin.top - this.config.margin.bottom;

    // Add svg
    this.svg = elementSelection.append('svg').attr('width', this.width + this.config.margin.left + this.config.margin.right).attr('height', this.height + this.config.margin.top + this.config.margin.bottom).append('g').attr('transform', 'translate(' + this.config.margin.left + ',' + this.config.margin.top + ')');

    this.infoTooltip = new commonComponents.InfoTooltip(elementSelection);
    this.elementSelection = elementSelection;
    this.onsetHeight = onsetHeight;

    // Supported event hooks
    this.hooks = {
      'jump-to-index': [],
      'forward-index': [],
      'backward-index': []
    };
  }

  _createClass(Chart, [{
    key: 'plot',
    value: function plot(data) {}
  }, {
    key: 'update',
    value: function update(idx) {}

    /**
     * Dispatch a hook
     */

  }, {
    key: 'dispatchHook',
    value: function dispatchHook(hookName, data) {
      this.hooks[hookName].forEach(function (hf) {
        return hf(data);
      });
    }

    /**
     * Append hook function if the hookName is supported
     */

  }, {
    key: 'addHook',
    value: function addHook(hookName, hookFunction) {
      if (hookName in this.hooks) {
        this.hooks[hookName].push(hookFunction);
      } else {
        throw new errors.HookNotUnderstoodException();
      }
      this.hooks[hookName] = this.hooks[hookName] || [];
    }
  }]);

  return Chart;
}();

exports.default = Chart;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _d = __webpack_require__(0);

var d3 = _interopRequireWildcard(_d);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Prediction marker for distribution chart
 */
var Prediction = function () {
  function Prediction(svg, id, meta, color) {
    _classCallCheck(this, Prediction);

    // Prediction group
    var predictionGroup = svg.append('g').attr('class', 'prediction-group').attr('id', id + '-marker');

    predictionGroup.append('path').attr('class', 'area-prediction').style('fill', color);

    predictionGroup.append('path').attr('class', 'line-prediction').style('stroke', color);

    this.predictionGroup = predictionGroup;

    this.color = color;
    this.id = id;
    this.meta = meta;
    // Tells if the prediction is hidden by some other component
    this._hidden = false;
    // Tells if data is available to be shown for current time
    this.noData = true;
  }

  _createClass(Prediction, [{
    key: 'plot',
    value: function plot(parent, curveData) {
      if (curveData.data === null) {
        // There is no data for current point, hide the markers without
        // setting exposed hidden flag
        this.noData = true;
        this.hideMarkers();
      } else {
        this.noData = false;
        if (!this.hidden) {
          // No one is hiding me
          this.showMarkers();
        }

        var line = d3.line().x(function (d) {
          return parent.xScale(d[0]);
        }).y(function (d) {
          return parent.yScale(d[1]);
        });

        this.predictionGroup.select('.line-prediction').datum(curveData.data).transition().duration(200).attr('d', line);

        var area = d3.area().x(function (d) {
          return parent.xScale(d[0]);
        }).y1(function (d) {
          return parent.yScale(0);
        }).y0(function (d) {
          return parent.yScale(d[1]);
        });

        this.predictionGroup.select('.area-prediction').datum(curveData.data).transition().duration(200).attr('d', area);
      }
      this.displayedData = curveData.data;
    }
  }, {
    key: 'query',
    value: function query(index) {
      return !this.noData && !this.hidden && this.displayedData[index];
    }

    /**
     * Check if we are hidden
     */

  }, {
    key: 'hideMarkers',
    value: function hideMarkers() {
      this.predictionGroup.style('visibility', 'hidden');
    }
  }, {
    key: 'showMarkers',
    value: function showMarkers() {
      this.predictionGroup.style('visibility', null);
    }

    /**
     * Remove the markers
     */

  }, {
    key: 'clear',
    value: function clear() {
      this.predictionGroup.remove();
    }
  }, {
    key: 'hidden',
    get: function get() {
      return this._hidden;
    },
    set: function set(hide) {
      if (hide) {
        this.hideMarkers();
      } else {
        if (!this.noData) {
          this.showMarkers();
        }
      }
      this._hidden = hide;
    }
  }]);

  return Prediction;
}();

exports.default = Prediction;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Convert MMWR weeks <--> dates

Object.defineProperty(exports, "__esModule", { value: true });
var moment = __webpack_require__(37);
var MMWRDate = (function () {
    function MMWRDate(year, week, day) {
        this.year = year;
        this.week = week;
        this.day = day;
    }
    Object.defineProperty(MMWRDate.prototype, "startMomentDate", {
        /**
         * Return year start moment date
         */
        get: function () {
            var janOne = moment(this.year + '0101');
            var diff = 7 * +(janOne.isoWeekday() > 3) - janOne.isoWeekday();
            return janOne.add(diff, 'days');
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Return a moment representation
     */
    MMWRDate.prototype.toMomentDate = function () {
        var dayOne = this.startMomentDate;
        var diff = 7 * (this.week - 1);
        if (this.day) {
            diff += this.day - 1;
        }
        return dayOne.add(diff, 'days');
    };
    /**
     * Set values using given moment date
     */
    MMWRDate.prototype.fromMomentDate = function (date) {
        if (date === void 0) { date = moment(); }
        var year = date.year();
        var startDates = [year - 1, year, year + 1]
            .map(function (y) {
            var md = new MMWRDate(y);
            return md.startMomentDate;
        });
        var diffs = startDates.map(function (d) { return date.diff(d); });
        var startId = 1;
        if (diffs[1] < 0)
            startId = 0;
        else if (diffs[2] >= 0)
            startId = 2;
        var startDate = startDates[startId];
        this.year = moment(startDate).add(7, 'days').year();
        this.week = Math.floor(date.diff(startDate, 'days') / 7) + 1;
        this.day = (date.isoWeekday() % 7) + 1;
    };
    Object.defineProperty(MMWRDate.prototype, "nWeeks", {
        /**
         * Number of weeks in this MMWR season
         */
        get: function () {
            var md = new MMWRDate(this.year, 53);
            md.fromMomentDate(md.toMomentDate());
            return md.year === this.year ? 53 : 52;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Return number of weeks differing from this
     */
    MMWRDate.prototype.diffWeek = function (mdate) {
        if (this.year === mdate.year) {
            return this.week - mdate.week;
        }
        else {
            // Order of dates [low, high]
            var ds = [this, mdate];
            var sign = -1;
            if (this.year > mdate.year) {
                ds = [mdate, this];
                sign = 1;
            }
            var diff = ds[1].week + ds[0].nWeeks - ds[0].week;
            var begin = ds[0].year + 1;
            while (begin < ds[1].year) {
                diff += ds[0].nWeeks;
                begin++;
            }
            return sign * diff;
        }
    };
    /**
     * Apply week delta
     */
    MMWRDate.prototype.applyWeekDiff = function (delta) {
        var newWeek;
        while (true) {
            newWeek = this.week + delta;
            if (delta > 0) {
                if (newWeek > this.nWeeks) {
                    delta = newWeek - this.nWeeks - 1;
                    this.week = 1;
                    this.year++;
                }
                else {
                    this.week = newWeek;
                    break;
                }
            }
            else {
                if (newWeek <= 0) {
                    this.year--;
                    this.week = this.nWeeks;
                    delta = newWeek;
                }
                else {
                    this.week = newWeek;
                    break;
                }
            }
        }
    };
    return MMWRDate;
}());
exports.MMWRDate = MMWRDate;
//# sourceMappingURL=index.js.map

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _d = __webpack_require__(0);

var d3 = _interopRequireWildcard(_d);

var _common = __webpack_require__(3);

var commonComponents = _interopRequireWildcard(_common);

var _distributionChart = __webpack_require__(16);

var distributionChartComponents = _interopRequireWildcard(_distributionChart);

var _distributionChart2 = __webpack_require__(4);

var utils = _interopRequireWildcard(_distributionChart2);

var _errors = __webpack_require__(2);

var errors = _interopRequireWildcard(_errors);

var _chart = __webpack_require__(5);

var _chart2 = _interopRequireDefault(_chart);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DistributionChart = function (_Chart) {
  _inherits(DistributionChart, _Chart);

  function DistributionChart(element) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, DistributionChart);

    var defaultConfig = {
      pointType: 'regular-week',
      confidenceIntervals: [],
      margin: {
        top: 5,
        right: 50,
        bottom: 80,
        left: 5
      }
    };

    var elementSelection = d3.select(element).attr('class', 'd3-foresight-chart d3-foresight-distribution-chart');

    // Initialize scales
    var _this = _possibleConstructorReturn(this, (DistributionChart.__proto__ || Object.getPrototypeOf(DistributionChart)).call(this, elementSelection, 0, Object.assign({}, defaultConfig, options)));

    _this.xScale = d3.scaleLinear().range([0, _this.width]);
    _this.xScaleDate = d3.scaleTime().range([0, _this.width]);
    _this.xScalePoint = d3.scalePoint().range([0, _this.width]);

    // Time axis for indicating current position
    _this.xAxis = new commonComponents.XAxisDate(_this.svg, _this.width, _this.height, 0, _this.onsetHeight, _this.config.axes.x, _this.infoTooltip);

    _this.distributionTooltip = new commonComponents.DistributionTooltip(elementSelection);

    // create 4 panels and assign new svgs to them
    var panelMargin = {
      top: 5, right: 10, bottom: 70, left: 50
    };
    var panelHeight = _this.height / 2;
    var panelWidth = _this.width / 2;
    var panelPositions = [[0, 0], [0, panelHeight], [panelWidth, 0], [panelWidth, panelHeight]];

    _this.panels = panelPositions.map(function (pos) {
      var svg = _this.svg.append('svg').attr('x', pos[0]).attr('y', pos[1]).attr('width', panelWidth).attr('height', panelHeight).append('g').attr('transform', 'translate(' + panelMargin.left + ', ' + panelMargin.top + ')');

      return new distributionChartComponents.DistributionPanel(svg, panelWidth - panelMargin.left - panelMargin.right, panelHeight - panelMargin.top - panelMargin.bottom, _this.infoTooltip, _this.distributionTooltip);
    });

    // Add dropdowns for curve selection
    _this.dropdowns = panelPositions.map(function (pos) {
      var wrapperWrapper = elementSelection.append('div');
      wrapperWrapper.style('text-align', 'center');

      var wrapper = wrapperWrapper.append('span');
      wrapper.attr('class', 'select is-small');
      var dd = wrapper.append('select');

      wrapperWrapper.style('position', 'absolute');
      wrapperWrapper.style('left', pos[0] + panelMargin.left / 2 + 'px');
      wrapperWrapper.style('width', panelWidth + 'px');
      wrapperWrapper.style('top', pos[1] + panelHeight - panelMargin.bottom + 30 + 'px');

      return dd;
    });

    _this.pointer = new distributionChartComponents.Pointer(_this);

    var panelConfig = {
      actual: false,
      observed: false,
      history: false,
      ci: false
    };

    // Control panel
    _this.controlPanel = new commonComponents.ControlPanel(_this, panelConfig, function (event, payload) {
      if (event === 'btn:next') {
        _this.dispatchHook('forward-index');
      } else if (event === 'btn:back') {
        _this.dispatchHook('backward-index');
      }
    });
    return _this;
  }

  // plot data


  _createClass(DistributionChart, [{
    key: 'plot',
    value: function plot(data) {
      var _this2 = this;

      // NOTE
      // Data has the following props
      // timePoints -> to plot the time axis
      // currentIdx -> to plot the pointer in onsetOffset
      // models -> list of n items for n models, each with:
      //   id
      //   meta
      //   curves (or maybe use predictions) list of t items for t targets:
      //     name -> text naming the target
      //     data -> series of (x, y) tuples about the distribution

      var curveNames = data.models[0].curves.map(function (t) {
        return t.name;
      });

      this.dropdowns.forEach(function (dd) {
        dd.selectAll('*').remove();
        curveNames.forEach(function (cn, idx) {
          var option = dd.append('option');
          option.text(cn);
          option.attr('value', idx);
        });
      });

      this.timePoints = data.timePoints;
      if (this.config.pointType.endsWith('-week')) {
        this.ticks = this.timePoints.map(function (tp) {
          return tp.week;
        });
      } else {
        throw new errors.UnknownPointTypeException();
      }
      this.xScaleDate.domain(utils.getXDateDomain(this.timePoints, this.config.pointType));
      this.xScalePoint.domain(this.ticks);
      this.xScale.domain([0, this.timePoints.length - 1]);
      this.xAxis.plot(this.xScalePoint, this.xScaleDate);

      // Plot pointer position
      this.pointer.plot(data.currentIdx, this.xScale, function (clickIndex) {
        _this2.dispatchHook('jump-to-index', clickIndex);
      });

      var yLimits = utils.getYLimits(data);

      // Provide curve data to the panels
      this.panels.forEach(function (p, idx) {
        if (!p.selectedCurveIdx) {
          p.selectedCurveIdx = idx;
          _this2.dropdowns[idx].property('value', idx);
        } else {
          _this2.dropdowns[idx].property('value', p.selectedCurveIdx);
        }
        p.plot(data, yLimits);
      });

      // Add event listeners to dropdown
      this.dropdowns.forEach(function (dd, idx) {
        var currentPanel = _this2.panels[idx];
        dd.on('change', function () {
          var selectedIdx = parseInt(d3.select(this).property('value'));
          currentPanel.selectedCurveIdx = selectedIdx;
          currentPanel.plot(data, yLimits);
        });
      });

      // Update models shown in control panel
      this.controlPanel.plot(this.panels[0].predictions, function (predictionId, hidePrediction) {
        _this2.panels.forEach(function (p) {
          var predMarker = p.predictions[p.predictions.map(function (p) {
            return p.id;
          }).indexOf(predictionId)];
          predMarker.hidden = hidePrediction;
        });
      });

      // Fade out models with no predictions
      this.controlPanel.update(this.panels[0].predictions);
    }
  }]);

  return DistributionChart;
}(_chart2.default);

exports.default = DistributionChart;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _d = __webpack_require__(0);

var d3 = _interopRequireWildcard(_d);

var _timeChart = __webpack_require__(29);

var utils = _interopRequireWildcard(_timeChart);

var _misc = __webpack_require__(1);

var misc = _interopRequireWildcard(_misc);

var _errors = __webpack_require__(2);

var errors = _interopRequireWildcard(_errors);

var _common = __webpack_require__(3);

var commonComponents = _interopRequireWildcard(_common);

var _timeChart2 = __webpack_require__(23);

var timeChartComponents = _interopRequireWildcard(_timeChart2);

var _chart = __webpack_require__(5);

var _chart2 = _interopRequireDefault(_chart);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TimeChart = function (_Chart) {
  _inherits(TimeChart, _Chart);

  function TimeChart(element) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, TimeChart);

    var defaultConfig = {
      baseline: {
        text: 'Baseline',
        description: 'Baseline value',
        url: '#'
      },
      pointType: 'regular-week',
      confidenceIntervals: []
    };

    var elementSelection = d3.select(element).attr('class', 'd3-foresight-chart d3-foresight-time-chart');

    // Initialize scales
    var _this = _possibleConstructorReturn(this, (TimeChart.__proto__ || Object.getPrototypeOf(TimeChart)).call(this, elementSelection, 30, Object.assign({}, defaultConfig, options)));

    _this.xScale = d3.scaleLinear().range([0, _this.width]);
    _this.xScaleDate = d3.scaleTime().range([0, _this.width]);
    _this.xScalePoint = d3.scalePoint().range([0, _this.width]);
    _this.yScale = d3.scaleLinear().range([_this.height, 0]);

    _this.yAxis = new commonComponents.YAxis(_this.svg, _this.height, 0, _this.config.axes.y, _this.infoTooltip);
    _this.xAxis = new commonComponents.XAxisDate(_this.svg, _this.width, _this.height, 0, _this.onsetHeight, _this.config.axes.x, _this.infoTooltip);

    _this.timeChartTooltip = new commonComponents.TimeChartTooltip(elementSelection);
    _this.timerect = new timeChartComponents.TimeRect(_this);
    _this.overlay = new timeChartComponents.Overlay(_this);
    _this.history = new timeChartComponents.HistoricalLines(_this);
    _this.baseline = new timeChartComponents.Baseline(_this);
    _this.actual = new timeChartComponents.Actual(_this);
    _this.observed = new timeChartComponents.Observed(_this);
    _this.predictions = [];
    _this.cid = _this.config.confidenceIntervals.length - 1;

    var showCi = _this.cid !== -1;
    var panelConfig = {
      actual: true,
      observed: true,
      history: true,
      ci: showCi
    };

    // Control panel
    _this.controlPanel = new commonComponents.ControlPanel(_this, panelConfig, function (event, payload) {
      if (event === 'legend:history') {
        _this.history.hidden = !_this.history.hidden;
      } else if (event === 'legend:ci') {
        _this.predictions.forEach(function (p) {
          _this.cid = p.cid = payload;
          p.update(_this.currentIdx);
        });
      } else if (event === 'btn:next') {
        _this.moveForward();
        _this.dispatchHook('forward-index');
      } else if (event === 'btn:back') {
        _this.moveBackward();
        _this.dispatchHook('backward-index');
      }
    });
    return _this;
  }

  // plot data


  _createClass(TimeChart, [{
    key: 'plot',
    value: function plot(data) {
      var _this2 = this;

      this.timePoints = data.timePoints;
      if (this.config.pointType.endsWith('-week')) {
        this.ticks = this.timePoints.map(function (tp) {
          return tp.week;
        });
      } else {
        throw new errors.UnknownPointTypeException();
      }

      this.actualIndices = data.actual.map(function (d, idx) {
        return d ? idx : null;
      }).filter(function (d) {
        return d !== null;
      });

      // Update domains
      this.yScale.domain(utils.getYDomain(data));
      this.xScale.domain(utils.getXDomain(this.timePoints));
      this.xScaleDate.domain(utils.getXDateDomain(this.timePoints, this.config.pointType));
      this.xScalePoint.domain(this.ticks);

      this.xAxis.plot(this.xScalePoint, this.xScaleDate);
      this.yAxis.plot(this.yScale);

      // Check if it is live data
      var showNowLine = this.actualIndices.length < this.timePoints.length;
      this.overlay.plot(this, showNowLine);

      // Update markers with data
      this.timerect.plot(this);
      this.baseline.plot(this, data.baseline);
      this.actual.plot(this, data.actual);
      this.observed.plot(this, data.observed);

      // Reset history lines
      this.history.plot(this, data.history);

      var totalModels = data.models.length;
      var onsetDiff = (this.onsetHeight - 2) / (totalModels + 1);

      // Setup colors
      if (data.models.length > 30) {
        this.colors = misc.colors50;
      } else if (data.models.length > 20) {
        this.colors = misc.colors30;
      } else if (data.models.length > 10) {
        this.colors = d3.schemeCategory20;
      } else {
        this.colors = d3.schemeCategory10;
      }

      // Clear markers not needed
      var currentPredictionIds = data.models.map(function (m) {
        return m.id;
      });
      this.predictions = this.predictions.filter(function (p) {
        if (currentPredictionIds.indexOf(p.id) === -1) {
          p.clear();
          return false;
        } else {
          return true;
        }
      });

      // Generate markers for predictions if not already there
      // Assume unique model ids
      data.models.forEach(function (m, idx) {
        var predMarker = void 0;
        var markerIndex = _this2.predictions.map(function (p) {
          return p.id;
        }).indexOf(m.id);
        if (markerIndex === -1) {
          // The marker is not present from previous calls to plot
          var onsetYPos = (idx + 1) * onsetDiff + _this2.height + 1;
          predMarker = new timeChartComponents.Prediction(_this2, m.id, m.meta, _this2.colors[idx], onsetYPos);
          _this2.predictions.push(predMarker);
        } else {
          predMarker = _this2.predictions[markerIndex];
        }
        predMarker.plot(_this2, m.predictions, utils.getPredictionStartingPoints(data));
      });

      // Update models shown in control panel
      this.controlPanel.plot(this.predictions, function (predictionId, hidePrediction) {
        var predMarker = _this2.predictions[_this2.predictions.map(function (p) {
          return p.id;
        }).indexOf(predictionId)];
        predMarker.hidden = hidePrediction;
      });

      // Hot start the chart
      this.currentIdx = 0;
      this.update(this.currentIdx);
    }

    /**
     * Update marker position
     */

  }, {
    key: 'update',
    value: function update(idx) {
      this.currentIdx = idx;
      this.timerect.update(idx);
      this.predictions.forEach(function (p) {
        p.update(idx);
      });
      this.overlay.update(this.predictions);
      this.observed.update(idx);
      this.controlPanel.update(this.predictions);
    }

    /**
     * Move chart one step ahead
     */

  }, {
    key: 'moveForward',
    value: function moveForward() {
      this.update(Math.min(this.currentIdx + 1, this.actualIndices[this.actualIndices.length - 1]));
    }

    /**
     * Move chart one step back
     */

  }, {
    key: 'moveBackward',
    value: function moveBackward() {
      this.update(Math.max(this.currentIdx - 1, this.actualIndices[0]));
    }
  }]);

  return TimeChart;
}(_chart2.default);

exports.default = TimeChart;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(30);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(32)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../node_modules/css-loader/index.js!../../node_modules/sass-loader/lib/loader.js!./style.scss", function() {
			var newContent = require("!!../../node_modules/css-loader/index.js!../../node_modules/sass-loader/lib/loader.js!./style.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.XAxisDate = exports.XAxis = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _d = __webpack_require__(0);

var d3 = _interopRequireWildcard(_d);

var _textures = __webpack_require__(33);

var _textures2 = _interopRequireDefault(_textures);

var _misc = __webpack_require__(1);

var mutils = _interopRequireWildcard(_misc);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Simple linear X axis with informative label
 */
var XAxis = exports.XAxis = function () {
  function XAxis(svg, width, height, yOffset, axisConfig, infoTooltip) {
    _classCallCheck(this, XAxis);

    var axisGroup = svg.append('g').attr('class', 'axis axis-x').attr('transform', 'translate(0, ' + (height - yOffset) + ')');

    var xText = axisGroup.append('text').attr('class', 'title').attr('text-anchor', 'start').attr('transform', 'translate(' + (width + 10) + ', -15)');

    // Setup multiline text
    var xTitle = axisConfig.title;
    if (Array.isArray(xTitle)) {
      xText.append('tspan').text(xTitle[0]).attr('x', 0);
      xTitle.slice(1).forEach(function (txt) {
        xText.append('tspan').text(txt).attr('x', 0).attr('dy', '1em');
      });
    } else {
      xText.append('tspan').text(xTitle).attr('x', 0);
    }

    xText.style('cursor', 'pointer').on('mouseover', function () {
      return infoTooltip.show();
    }).on('mouseout', function () {
      return infoTooltip.hide();
    }).on('mousemove', function () {
      infoTooltip.renderText({
        title: null,
        text: axisConfig.description
      });
      var pos = mutils.getMousePosition(d3.select('.overlay'));
      infoTooltip.move({
        x: pos[0],
        y: pos[1]
      }, 'left');
    }).on('click', function () {
      window.open(axisConfig.url, '_blank');
    });
    this.svg = svg;
    this.width = width;
  }

  _createClass(XAxis, [{
    key: 'plot',
    value: function plot(xScale, maxTicks) {
      var xAxis = d3.axisBottom(xScale);
      var totalTicks = xScale.domain().length;
      if (maxTicks && maxTicks < totalTicks / 2) {
        // Show upto maxTicks ticks
        var showAt = parseInt(totalTicks / maxTicks);
        xAxis.tickValues(xScale.domain().filter(function (d, i) {
          return !(i % showAt);
        }));
      }
      this.svg.select('.axis-x').transition().duration(200).call(xAxis);
    }
  }]);

  return XAxis;
}();

/**
 * X axis with week numbers, time and onset panel
 */


var XAxisDate = exports.XAxisDate = function () {
  function XAxisDate(svg, width, height, yOffset, onsetOffset, axisConfig, infoTooltip) {
    _classCallCheck(this, XAxisDate);

    // Keep onset panel between xaxis and plot
    var xAxisPos = height + onsetOffset;
    // Main axis with ticks below the onset panel
    svg.append('g').attr('class', 'axis axis-x').attr('transform', 'translate(0,' + xAxisPos + ')');

    var axisXDate = svg.append('g').attr('class', 'axis axis-x-date').attr('transform', 'translate(0,' + (xAxisPos + 25) + ')');

    var xText = axisXDate.append('text').attr('class', 'title').attr('text-anchor', 'start').attr('transform', 'translate(' + (width + 10) + ',-15)');

    // Setup multiline text
    var xTitle = axisConfig.title;
    if (Array.isArray(xTitle)) {
      xText.append('tspan').text(xTitle[0]).attr('x', 0);
      xTitle.slice(1).forEach(function (txt) {
        xText.append('tspan').text(txt).attr('x', 0).attr('dy', '1em');
      });
    } else {
      xText.append('tspan').text(xTitle).attr('x', 0);
    }

    xText.style('cursor', 'pointer').on('mouseover', function () {
      return infoTooltip.show();
    }).on('mouseout', function () {
      return infoTooltip.hide();
    }).on('mousemove', function () {
      infoTooltip.renderText({
        title: null,
        text: axisConfig.description
      });
      var pos = mutils.getMousePosition(d3.select('.overlay'));
      infoTooltip.move({
        x: pos[0],
        y: pos[1]
      }, 'left');
    }).on('click', function () {
      window.open(axisConfig.url, '_blank');
    });

    // Setup reverse axis (over onset offset)
    // Clone of axis above onset panel, without text
    svg.append('g').attr('class', 'axis axis-x-ticks').attr('transform', 'translate(0, ' + (height - yOffset) + ')');

    // Create onset panel
    var onsetTexture = _textures2.default.lines().lighter().strokeWidth(0.5).size(8).stroke('#ccc');
    svg.call(onsetTexture);

    svg.append('rect').attr('class', 'onset-texture').attr('height', onsetOffset).attr('width', width).attr('x', 0).attr('y', height).style('fill', onsetTexture.url());

    this.svg = svg;
    this.width = width;
  }

  _createClass(XAxisDate, [{
    key: 'plot',
    value: function plot(xScalePoint, xScaleDate) {
      var xAxis = d3.axisBottom(xScalePoint).tickValues(xScalePoint.domain().filter(function (d, i) {
        return !(i % 2);
      }));

      var xAxisReverseTick = d3.axisTop(xScalePoint).tickValues(xScalePoint.domain().filter(function (d, i) {
        return !(i % 2);
      }));

      var xAxisDate = d3.axisBottom(xScaleDate).ticks(d3.timeMonth).tickFormat(d3.timeFormat('%b %y'));

      // Mobile view fix
      if (this.width < 420) {
        xAxisDate.ticks(2);
        xAxis.tickValues(xScalePoint.domain().filter(function (d, i) {
          return !(i % 10);
        }));
      }

      this.svg.select('.axis-x').transition().duration(200).call(xAxis);

      // Copy over ticks above the onsetpanel
      var tickOnlyAxis = this.svg.select('.axis-x-ticks').transition().duration(200).call(xAxisReverseTick);

      tickOnlyAxis.selectAll('text').remove();

      this.svg.select('.axis-x-date').transition().duration(200).call(xAxisDate);
    }
  }]);

  return XAxisDate;
}();

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.YAxis = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _d = __webpack_require__(0);

var d3 = _interopRequireWildcard(_d);

var _misc = __webpack_require__(1);

var mutils = _interopRequireWildcard(_misc);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Simple linear Y axis with informative label
 */
var YAxis = exports.YAxis = function () {
  function YAxis(svg, height, xOffset, axisConfig, infoTooltip) {
    _classCallCheck(this, YAxis);

    var axis = svg.append('g').attr('class', 'axis axis-y').attr('transform', 'translate(' + xOffset + ', 0)');

    axis.append('text').attr('class', 'title').attr('transform', 'translate(-45 , ' + height / 2 + ') rotate(-90)').attr('dy', '.71em').style('text-anchor', 'middle').text(axisConfig.title).style('cursor', 'pointer').on('mouseover', function () {
      return infoTooltip.show();
    }).on('mouseout', function () {
      return infoTooltip.hide();
    }).on('mousemove', function () {
      infoTooltip.renderText({
        title: null,
        text: axisConfig.description
      });
      var pos = mutils.getMousePosition(d3.select('.overlay'));
      infoTooltip.move({
        x: pos[0],
        y: pos[1]
      });
    }).on('click', function () {
      window.open(axisConfig.url, '_blank');
    });

    this.svg = svg;
  }

  _createClass(YAxis, [{
    key: 'plot',
    value: function plot(yScale, maxTicks) {
      var yAxis = d3.axisLeft(yScale).tickFormat(d3.format('.2f'));
      if (maxTicks) yAxis.ticks(maxTicks);
      this.svg.select('.axis-y').transition().duration(200).call(yAxis);
    }
  }]);

  return YAxis;
}();

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _d = __webpack_require__(0);

var d3 = _interopRequireWildcard(_d);

var _palette = __webpack_require__(36);

var _palette2 = _interopRequireDefault(_palette);

var _misc = __webpack_require__(1);

var mutils = _interopRequireWildcard(_misc);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Side buttons in control panel
 */
var ControlButtons = function () {
  function ControlButtons(panelSelection, infoTooltip, panelConfig, eventHook) {
    _classCallCheck(this, ControlButtons);

    var navControls = panelSelection.append('div').attr('class', 'nav-controls');

    var buttonData = [{
      name: 'legendBtn',
      icon: 'fa-map-o',
      tooltipText: 'Toggle Legend',
      event: 'btn:legend'
    }, {
      name: 'backBtn',
      icon: 'fa-arrow-left',
      tooltipText: 'Move backward',
      event: 'btn:back'
    }, {
      name: 'nextBtn',
      icon: 'fa-arrow-right',
      tooltipText: 'Move forward',
      event: 'btn:next'
    }];

    // Save all the buttons for toggling state and stuff
    this.buttons = buttonData.map(function (data) {
      var btn = navControls.append('a').attr('class', 'button is-small is-info is-outlined');
      btn.append('span').attr('class', 'icon is-small').append('i').attr('class', 'fa ' + data.icon);
      btn.on('mouseover', function () {
        return infoTooltip.show();
      }).on('mouseout', function () {
        return infoTooltip.hide();
      }).on('mousemove', function () {
        infoTooltip.renderText({
          title: null,
          text: data.tooltipText
        });
        var pos = mutils.getMousePosition(d3.select(this));
        infoTooltip.move({
          x: pos[0],
          y: pos[1]
        }, 'left');
      }).on('click', function () {
        return eventHook(data.event);
      });
      navControls.append('br');
      return btn;
    });
  }

  _createClass(ControlButtons, [{
    key: 'toggleLegendBtn',
    value: function toggleLegendBtn() {
      this.buttons[0].classed('is-outlined', !this.buttons[0].classed('is-outlined'));
    }
  }]);

  return ControlButtons;
}();

/**
 * Legend nav drawer
 * @param panelSelection - D3 selection from controlpanel
 * @param infoTooltip
 * @param confidenceIntervals - List of confidence intervals
 * @param eventHook - Event hook callback to be used by controlpanel
 */


var LegendDrawer = function () {
  function LegendDrawer(panelSelection, confidenceIntervals, panelConfig, infoTooltip, eventHook) {
    var _this = this;

    _classCallCheck(this, LegendDrawer);

    var legendGroup = panelSelection.append('div').attr('class', 'legend nav-drawer');

    // Items above the controls (actual, observed, history)
    var legendActualContainer = legendGroup.append('div').attr('class', 'legend-actual-container');

    // Control buttons (CI, show/hide, search)
    var legendControlContainer = legendGroup.append('div').attr('class', 'legend-control-container');

    var legendCIItem = void 0,
        legendCIButtons = void 0;
    if (panelConfig.ci) {
      legendCIItem = legendControlContainer.append('div').attr('class', 'item control-item');
      legendCIItem.append('span').text('CI');
      legendCIButtons = legendCIItem.append('span');
    }

    var legendShowHideItem = legendControlContainer.append('div').attr('class', 'item control-item');
    legendShowHideItem.append('span').text('Show');
    var legendShowHideButtons = legendShowHideItem.append('span');

    // Add filter box
    this.legendSearchItem = legendControlContainer.append('div').attr('class', 'item').style('display', 'none');
    this.searchBox = this.legendSearchItem.append('input').attr('class', 'input is-small search-input').attr('type', 'text').attr('placeholder', 'Filter models');

    // Prediction items
    legendGroup.append('div').attr('class', 'legend-prediction-container');

    var actualItems = [{
      class: 'legend-item-actual',
      color: _palette2.default.actual,
      text: 'Actual',
      tooltipData: {
        title: 'Actual Data',
        text: 'Latest data available for the week'
      }
    }, {
      class: 'legend-item-observed',
      color: _palette2.default.observed,
      text: 'Observed',
      tooltipData: {
        title: 'Observed Data',
        text: 'Data available for weeks when the predictions were made'
      }
    }, {
      class: 'legend-item-history',
      color: _palette2.default['history-highlight'],
      text: 'History',
      tooltipData: {
        title: 'Historical Data',
        text: 'Toggle historical data lines'
      }
    }];

    var flags = [panelConfig.actual, panelConfig.observed, panelConfig.history];
    var rowsToShow = actualItems.filter(function (item, idx) {
      return flags[idx];
    });

    // Add rows for actual lines
    this.actualItems = rowsToShow.map(function (data) {
      var item = legendActualContainer.append('div').attr('class', 'item ' + data.id);

      item.append('i').attr('class', 'fa fa-circle').style('color', data.color);

      item.append('span').attr('class', 'item-title').text(data.text);

      item.on('mouseover', function () {
        return infoTooltip.show();
      }).on('mouseout', function () {
        return infoTooltip.hide();
      }).on('mousemove', function () {
        infoTooltip.renderText(data.tooltipData);
        var pos = mutils.getMousePosition(d3.select(this));
        infoTooltip.move({
          x: pos[0],
          y: pos[1]
        }, 'left');
      });
      return item;
    });

    if (panelConfig.history) {
      // Add extra props to history item
      var historyItem = this.actualItems[2];
      historyItem.style('cursor', 'pointer');
      this.historyIcon = historyItem.select('i');
      historyItem.on('click', function () {
        _this.toggleHistoryIcon();
        eventHook('legend:history');
      });
    }

    if (panelConfig.ci) {
      this.confButtons = [].concat(_toConsumableArray(confidenceIntervals), ['none']).map(function (c, idx) {
        var confButton = legendCIButtons.append('span').attr('class', 'toggle-button').style('cursor', 'pointer').text(c);

        confButton.on('click', function () {
          legendCIButtons.selectAll('.toggle-button').classed('selected', false);
          d3.select(this).classed('selected', true);
          eventHook('legend:ci', c === 'none' ? null : idx);
        }).on('mouseover', function () {
          return infoTooltip.show();
        }).on('mouseout', function () {
          return infoTooltip.hide();
        }).on('mousemove', function () {
          infoTooltip.renderText({
            title: 'Confidence Interval',
            text: 'Select confidence interval for prediction markers'
          });
          var pos = mutils.getMousePosition(d3.select(this));
          infoTooltip.move({
            x: pos[0],
            y: pos[1]
          }, 'left');
        });
        return confButton;
      });
    }

    var that = this;

    // Show / hide all
    this.showHideButtons = ['all', 'none'].map(function (c, idx) {
      var showHideButton = legendShowHideButtons.append('span').attr('class', 'toggle-button').style('cursor', 'pointer').text(c);

      showHideButton.on('click', function () {
        // Toggle prediction entries
        that.showHidePredItem(d3.select(this).text() === 'all');

        // Set button active colors
        legendShowHideButtons.selectAll('.toggle-button').classed('selected', false);
        d3.select(this).classed('selected', true);
      }).on('mouseover', function () {
        return infoTooltip.show();
      }).on('mouseout', function () {
        return infoTooltip.hide();
      }).on('mousemove', function () {
        infoTooltip.renderText({
          title: 'Toggle visibility',
          text: 'Show / hide all predictions'
        });
        var pos = mutils.getMousePosition(d3.select(this));
        infoTooltip.move({
          x: pos[0],
          y: pos[1]
        }, 'left');
      });
      return showHideButton;
    });

    this.infoTooltip = infoTooltip;
    this.drawerSelection = legendGroup;
  }

  _createClass(LegendDrawer, [{
    key: 'toggleHistoryIcon',
    value: function toggleHistoryIcon() {
      var isActive = this.historyIcon.classed('fa-circle');

      this.historyIcon.classed('fa-circle', !isActive);
      this.historyIcon.classed('fa-circle-o', isActive);
    }
  }, {
    key: 'toggleConfidenceBtn',
    value: function toggleConfidenceBtn(idx) {
      var btn = this.confButtons[idx];
      btn.classed('selected', !btn.classed('selected'));
    }
  }, {
    key: 'toggleDrawer',
    value: function toggleDrawer() {
      if (this.drawerSelection.style('display') === 'none') {
        this.drawerSelection.style('display', null);
      } else {
        this.drawerSelection.style('display', 'none');
      }
    }

    // Show / hide the "row items divs" while filtering with the search box

  }, {
    key: 'showRows',
    value: function showRows(visibilityStates) {
      this.rows.forEach(function (row, idx) {
        if (visibilityStates[idx]) {
          row.style('display', null);
        } else {
          row.style('display', 'none');
        }
      });
    }
  }, {
    key: 'resetShowHideButtons',
    value: function resetShowHideButtons() {
      this.showHideButtons.forEach(function (button) {
        return button.classed('selected', false);
      });
    }

    // Show / hide all the items markers (not the legend div)

  }, {
    key: 'showHidePredItem',
    value: function showHidePredItem(show) {
      this.rows.forEach(function (predItem) {
        if (predItem.select('i').classed('fa-circle') !== show) {
          predItem.on('click')();
        }
      });
    }
  }, {
    key: 'plot',
    value: function plot(predictions, eventHook) {
      var _this3 = this;

      // Clear entries
      var predictionContainer = this.drawerSelection.select('.legend-prediction-container');
      predictionContainer.selectAll('*').remove();

      // Meta data info tooltip
      var infoTooltip = this.infoTooltip;
      var that = this;

      // Don't show search bar if predictions are less than or equal to maxNPreds
      var maxNPreds = 10;
      if (predictions.length > maxNPreds) {
        this.legendSearchItem.style('display', null);
        // Bind search event
        this.searchBox.keyup = null;
        this.searchBox.on('keyup', function () {
          var _this2 = this;

          // Do a full text search on key event
          var searchBase = predictions.map(function (p) {
            return (p.id + ' ' + p.meta.name + ' + ' + p.meta.description).toLowerCase();
          });
          that.showRows(searchBase.map(function (sb) {
            return sb.includes(_this2.value.toLowerCase());
          }));
        });
      } else {
        this.legendSearchItem.style('display', 'none');
      }

      // Add prediction items
      this.rows = predictions.map(function (p) {
        var predItem = predictionContainer.append('div').attr('class', 'item legend-item-' + p.id).style('cursor', 'pointer');

        var predIcon = predItem.append('i').attr('class', 'fa').style('color', p.color);

        var showThis = !p.hidden;
        predIcon.classed('fa-circle', showThis);
        predIcon.classed('fa-circle-o', !showThis);

        predItem.append('span').attr('class', 'item-title').html(p.id);

        var urlItem = predItem.append('a').attr('href', p.meta.url).attr('target', '_blank').append('i').attr('class', 'fa fa-external-link model-url');

        urlItem.on('mousemove', function () {
          d3.event.stopPropagation();
          infoTooltip.renderText({
            text: 'Show details'
          });
          var pos = mutils.getMousePosition(d3.select(this));
          infoTooltip.move({
            x: pos[0],
            y: pos[1]
          }, 'left');
        }).on('click', function () {
          return d3.event.stopPropagation();
        });

        predItem.on('click', function () {
          var isActive = predIcon.classed('fa-circle');

          predIcon.classed('fa-circle', !isActive);
          predIcon.classed('fa-circle-o', isActive);

          // Reset show all/none buttons on any of these clicks
          _this3.resetShowHideButtons();
          eventHook(p.id, isActive);
        });

        predItem.on('mouseover', function () {
          return infoTooltip.show();
        }).on('mouseout', function () {
          return infoTooltip.hide();
        }).on('mousemove', function () {
          infoTooltip.renderText({
            title: p.meta.name,
            text: p.meta.description
          });
          var pos = mutils.getMousePosition(d3.select(this));
          infoTooltip.move({
            x: pos[0],
            y: pos[1]
          }, 'left');
        });
        return predItem;
      });
    }
  }, {
    key: 'update',
    value: function update(predictions) {
      var _this4 = this;

      predictions.forEach(function (p) {
        var pDiv = _this4.drawerSelection.select('.legend-item-' + p.id);
        pDiv.classed('na', p.noData);
      });
    }
  }]);

  return LegendDrawer;
}();

/**
 * Chart controls
 * nav-drawers and buttons
 */


var ControlPanel = function () {
  function ControlPanel(parent, panelConfig, panelHook) {
    var _this5 = this;

    _classCallCheck(this, ControlPanel);

    // Main panel selection
    var panelSelection = parent.elementSelection.append('div').attr('class', 'd3-foresight-controls');

    this.config = panelConfig;

    // Add legend drawer
    this.legendDrawer = new LegendDrawer(panelSelection, parent.config.confidenceIntervals, this.config, parent.infoTooltip, panelHook);

    if (this.config.ci) {
      this.legendDrawer.toggleConfidenceBtn(parent.cid);
    }

    // Buttons on the side of panel
    this.controlButtons = new ControlButtons(panelSelection, parent.infoTooltip, this.config, function (event) {
      if (['btn:next', 'btn:back'].includes(event)) {
        // Simple triggers, pass directly
        panelHook(event);
      } else {
        if (event === 'btn:legend') {
          _this5.legendDrawer.toggleDrawer();
          _this5.controlButtons.toggleLegendBtn();
        }
      }
    });

    // Turn on legend by default
    this.controlButtons.toggleLegendBtn();
  }

  _createClass(ControlPanel, [{
    key: 'plot',
    value: function plot(predictions, panelHook) {
      this.legendDrawer.plot(predictions, panelHook);
    }
  }, {
    key: 'update',
    value: function update(predictions) {
      this.legendDrawer.update(predictions);
    }
  }]);

  return ControlPanel;
}();

exports.default = ControlPanel;

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Tooltip super
 */
var Tooltip = function () {
  function Tooltip(rootSelector, tooltipClass) {
    _classCallCheck(this, Tooltip);

    this.selection = rootSelector.append('div').attr('class', 'd3-foresight-tooltip ' + tooltipClass).style('display', 'none');
    this.selection.text('undefined');
    this.offset = 15;
  }

  _createClass(Tooltip, [{
    key: 'show',
    value: function show() {
      this.selection.style('display', null);
    }
  }, {
    key: 'hide',
    value: function hide() {
      this.selection.style('display', 'none');
    }
  }, {
    key: 'move',
    value: function move(position) {
      var direction = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'right';

      this.selection.style('top', position.y + this.offset + 'px').style('left', position.x + (direction === 'right' ? this.offset : -this.width - this.offset) + 'px');
    }
  }, {
    key: 'render',
    value: function render(html) {
      this.selection.html(html);
    }
  }, {
    key: 'width',
    get: function get() {
      return this.selection.node().getBoundingClientRect().width;
    }
  }]);

  return Tooltip;
}();

/**
 * Tooltip used in timechart's overlay div
 */


var TimeChartTooltip = exports.TimeChartTooltip = function (_Tooltip) {
  _inherits(TimeChartTooltip, _Tooltip);

  function TimeChartTooltip(rootSelector) {
    _classCallCheck(this, TimeChartTooltip);

    return _possibleConstructorReturn(this, (TimeChartTooltip.__proto__ || Object.getPrototypeOf(TimeChartTooltip)).call(this, rootSelector, 'd3-foresight-time-chart-tooltip'));
  }

  _createClass(TimeChartTooltip, [{
    key: 'renderText',
    value: function renderText(data) {
      this.render('<div class="text">' + data + '</div>');
    }
  }, {
    key: 'renderValues',
    value: function renderValues(observedObj, actualObj, predObjs, index) {
      var html = '';
      // Ask for observed value
      var observedValue = observedObj.query(index);

      if (observedValue) {
        html += '<div class="observed">\n                 Observed\n                 <span class="bold">\n                   ' + observedValue.toFixed(2) + '\n                 </span>\n               </div>';
      }

      // Ask actual
      var actualValue = actualObj.query(index);
      if (actualValue) {
        html += '<div class="actual">\n                 Actual\n                 <span class="bold">\n                   ' + actualValue.toFixed(2) + '\n                 </span>\n               </div>';
      }

      // Show upto maxNPreds predictions
      var maxNPreds = 10;
      var visiblePreds = predObjs.filter(function (p) {
        return p.query(index);
      });

      if (visiblePreds.length > 0) {
        // Add note regarding which prediction is getting displayed
        var aheadIndex = visiblePreds[0].displayedIdx(index);
        if (aheadIndex !== null) {
          html = '<div class="text"><em>' + (aheadIndex + 1) + ' week' + (aheadIndex ? 's' : '') + ' ahead</em></div>' + html;
        }
      }

      visiblePreds.slice(0, maxNPreds).map(function (p) {
        var data = p.query(index);
        html += '<div class="prediction" style="background:' + p.color + '">\n                 ' + p.id + '\n                 <span class="bold">\n                   ' + data.toFixed(2) + '\n                 </span>\n               </div>';
      });

      // Notify regarding overflow
      if (visiblePreds.length > maxNPreds) {
        html += '<div class="actual">\n                 <em>Truncated list. Please <br>\n                 select fewer than <br>\n                 ' + (maxNPreds + 1) + ' predictions</em>\n               </div>';
      }

      this.render(html);
    }
  }, {
    key: 'renderPoint',
    value: function renderPoint(id, data, color) {
      var html = '<div class="point head" style="background:' + color + '">' + id + '</div>';
      data.map(function (d) {
        html += '<div class="point">\n                 ' + d.key + '\n                 <span class="bold">' + d.value.toFixed(2) + '</span>\n               </div>';
      });
      this.render(html);
    }
  }]);

  return TimeChartTooltip;
}(Tooltip);

/**
 * Tooltip used in control panel and axes labels
 */


var InfoTooltip = exports.InfoTooltip = function (_Tooltip2) {
  _inherits(InfoTooltip, _Tooltip2);

  function InfoTooltip(rootSelector) {
    _classCallCheck(this, InfoTooltip);

    return _possibleConstructorReturn(this, (InfoTooltip.__proto__ || Object.getPrototypeOf(InfoTooltip)).call(this, rootSelector, 'd3-foresight-info-tooltip'));
  }

  _createClass(InfoTooltip, [{
    key: 'renderText',
    value: function renderText(data) {
      var html = '';
      if (data.title) {
        html += '<div class="title">' + data.title + '</div>';
      }
      if (data.text) {
        html += '<div class="text">' + data.text + '</div>';
      }
      this.render(html);
    }
  }]);

  return InfoTooltip;
}(Tooltip);

/**
 * Tooltip for probability distributions
 */


var DistributionTooltip = exports.DistributionTooltip = function (_Tooltip3) {
  _inherits(DistributionTooltip, _Tooltip3);

  function DistributionTooltip(rootSelector) {
    _classCallCheck(this, DistributionTooltip);

    return _possibleConstructorReturn(this, (DistributionTooltip.__proto__ || Object.getPrototypeOf(DistributionTooltip)).call(this, rootSelector, 'd3-foresight-distribution-tooltip'));
  }

  _createClass(DistributionTooltip, [{
    key: 'renderValues',
    value: function renderValues(predictions, index, binVal) {
      var html = '';
      var maxNPreds = 10;
      var visiblePreds = predictions.filter(function (p) {
        return p.query(index);
      });

      if (visiblePreds.length > 0) {
        html += '<div class="text"><em>Bin: ' + binVal + '</em></div>';
      }

      visiblePreds.slice(0, maxNPreds).map(function (p) {
        var data = p.query(index)[1];
        html += '<div class="prediction" style="background:' + p.color + '">\n                 ' + p.id + '\n                 <span class="bold">\n                   ' + data.toFixed(2) + '\n                 </span>\n               </div>';
      });

      // Notify regarding overflow
      if (visiblePreds.length > maxNPreds) {
        html += '<div class="actual">\n                 <em>Truncated list. Please <br>\n                 select fewer than <br>\n                 ' + (maxNPreds + 1) + ' predictions</em>\n               </div>';
      }

      this.render(html);
    }
  }]);

  return DistributionTooltip;
}(Tooltip);

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _d = __webpack_require__(0);

var d3 = _interopRequireWildcard(_d);

var _common = __webpack_require__(3);

var commonComponents = _interopRequireWildcard(_common);

var _prediction = __webpack_require__(6);

var _prediction2 = _interopRequireDefault(_prediction);

var _distributionChart = __webpack_require__(4);

var utils = _interopRequireWildcard(_distributionChart);

var _overlay = __webpack_require__(18);

var _overlay2 = _interopRequireDefault(_overlay);

var _noPredText = __webpack_require__(17);

var _noPredText2 = _interopRequireDefault(_noPredText);

var _misc = __webpack_require__(1);

var misc = _interopRequireWildcard(_misc);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * A panel displaying distributions for one curve
 */
var DistributionPanel = function () {
  function DistributionPanel(svg, width, height, infoTooltip, distributionTooltip) {
    _classCallCheck(this, DistributionPanel);

    this.xScale = d3.scalePoint().range([0, width]);
    this.yScale = d3.scaleLinear().range([height, 0]);

    this.xAxis = new commonComponents.XAxis(svg, width, height, 0, {}, infoTooltip);
    this.yAxis = new commonComponents.YAxis(svg, height, 0, {
      title: 'Probability',
      description: 'Probability assigned to x-axis bins'
    }, infoTooltip);

    this.svg = svg;
    this.height = height;
    this.width = width;
    this.predictions = [];
    this.selectedCurveIdx = null;
    this.distributionTooltip = distributionTooltip;
    this.overlay = new _overlay2.default(this);
    this.noPredText = new _noPredText2.default(this);
  }

  _createClass(DistributionPanel, [{
    key: 'plot',
    value: function plot(data, yLimits) {
      var _this = this;

      this.xScale.domain(utils.getXDomain(data, this.selectedCurveIdx));
      this.yScale.domain([0, yLimits[this.selectedCurveIdx]]);

      this.xAxis.plot(this.xScale, 10);
      this.yAxis.plot(this.yScale, 5);

      // Setup colors
      if (data.models.length > 30) {
        this.colors = misc.colors50;
      } else if (data.models.length > 20) {
        this.colors = misc.colors30;
      } else if (data.models.length > 10) {
        this.colors = d3.schemeCategory20;
      } else {
        this.colors = d3.schemeCategory10;
      }

      // Clear markers not needed
      var currentPredictionIds = data.models.map(function (m) {
        return m.id;
      });
      this.predictions = this.predictions.filter(function (p) {
        if (currentPredictionIds.indexOf(p.id) === -1) {
          p.clear();
          return false;
        } else {
          return true;
        }
      });

      // Generate markers for predictions if not already there
      // Assume unique model ids
      data.models.forEach(function (m, idx) {
        var predMarker = void 0;
        var markerIndex = _this.predictions.map(function (p) {
          return p.id;
        }).indexOf(m.id);
        if (markerIndex === -1) {
          // The marker is not present from previous calls to plot
          predMarker = new _prediction2.default(_this.svg, m.id, m.meta, _this.colors[idx]);
          _this.predictions.push(predMarker);
        } else {
          predMarker = _this.predictions[markerIndex];
        }
        predMarker.plot(_this, m.curves[_this.selectedCurveIdx]);
      });

      // Check if all markers have noData. That means we can show NA text.
      this.noPredText.hidden = this.predictions.filter(function (p) {
        return p.noData;
      }).length !== this.predictions.length;
    }
  }]);

  return DistributionPanel;
}();

exports.default = DistributionPanel;

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _prediction = __webpack_require__(6);

Object.defineProperty(exports, 'Prediction', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_prediction).default;
  }
});

var _pointer = __webpack_require__(19);

Object.defineProperty(exports, 'Pointer', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_pointer).default;
  }
});

var _distributionPanel = __webpack_require__(15);

Object.defineProperty(exports, 'DistributionPanel', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_distributionPanel).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var NoPredText = function () {
  function NoPredText(parent) {
    _classCallCheck(this, NoPredText);

    this.text = parent.svg.append('text').attr('class', 'no-pred-text').attr('transform', 'translate(30 , 30)');

    this.text.append('tspan').text('Predictions not available').attr('x', 0);

    this.text.append('tspan').text('for selected time').attr('x', 0).attr('dy', '2em');
  }

  _createClass(NoPredText, [{
    key: 'hidden',
    set: function set(val) {
      this.text.style('display', val ? 'none' : null);
    },
    get: function get() {
      return this.text.style('display') === 'none';
    }
  }]);

  return NoPredText;
}();

exports.default = NoPredText;

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _d = __webpack_require__(0);

var d3 = _interopRequireWildcard(_d);

var _misc = __webpack_require__(1);

var mutils = _interopRequireWildcard(_misc);

var _distributionChart = __webpack_require__(4);

var utils = _interopRequireWildcard(_distributionChart);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Overlay = function Overlay(parent) {
  _classCallCheck(this, Overlay);

  var svg = parent.svg;
  var height = parent.height;
  var width = parent.width;
  var distributionTooltip = parent.distributionTooltip;
  var xScale = parent.xScale;

  // Add mouse hover line
  var line = svg.append('line').attr('class', 'hover-line').attr('x1', 0).attr('y1', 0).attr('x2', 0).attr('y2', height).style('display', 'none');

  svg.append('rect').attr('class', 'overlay').attr('height', height).attr('width', width).on('mouseover', function () {
    line.style('display', null);
    distributionTooltip.show();
  }).on('mouseout', function () {
    line.style('display', 'none');
    distributionTooltip.hide();
  }).on('mousemove', function () {
    var mouse = d3.mouse(this);
    // Snap x to nearest tick
    var index = Math.round(mouse[0] / xScale.range()[1] * xScale.domain().length);
    var snappedX = xScale(xScale.domain()[index]);

    // Move the cursor
    line.transition().duration(50).attr('x1', snappedX).attr('x2', snappedX);

    // Format bin value to display
    var binVal = utils.formatBin(xScale.domain(), index);
    distributionTooltip.renderValues(parent.predictions, index, binVal);

    // Tooltip position
    var pos = mutils.getMousePosition(d3.select(this));
    distributionTooltip.move({
      x: pos[0],
      y: pos[1]
    });
  });
};

exports.default = Overlay;

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _d = __webpack_require__(0);

var d3 = _interopRequireWildcard(_d);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Return triangle points for drawing polyline centered at origin
 */
var generateTrianglePoints = function generateTrianglePoints(origin) {
  var side = 15;
  return [[origin[0] - side / 2, origin[1] - side / Math.sqrt(2)], [origin[0] + side / 2, origin[1] - side / Math.sqrt(2)], [origin[0], origin[1] - 2]].map(function (p) {
    return p[0] + ',' + p[1];
  }).join(' ');
};

/**
 * Pointer over current position in time axis
 */

var Pointer = function () {
  function Pointer(parent) {
    _classCallCheck(this, Pointer);

    var group = parent.svg.append('g').attr('class', 'time-pointer-group');

    // Save fixed y position
    this.yPos = parent.height;

    group.append('polyline').attr('class', 'pointer-triangle').attr('points', generateTrianglePoints([0, this.yPos]));

    // Add overlay over axis to allow clicks
    group.append('rect').attr('class', 'pointer-overlay').attr('height', 80).attr('width', parent.width).attr('x', 0).attr('y', parent.height - 30);

    this.group = group;
  }

  _createClass(Pointer, [{
    key: 'plot',
    value: function plot(currentIdx, xScale, clickCallback) {
      this.group.select('.pointer-triangle').transition().duration(300).attr('points', generateTrianglePoints([xScale(currentIdx), this.yPos]));

      this.group.select('.pointer-overlay').on('click', function () {
        clickCallback(Math.round(xScale.invert(d3.mouse(this)[0])));
      });
    }
  }]);

  return Pointer;
}();

exports.default = Pointer;

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _d = __webpack_require__(0);

var d3 = _interopRequireWildcard(_d);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Actual line
 */
var Actual = function () {
  function Actual(parent) {
    _classCallCheck(this, Actual);

    var group = parent.svg.append('g').attr('class', 'actual-group');

    group.append('path').attr('class', 'line-actual');

    this.group = group;
  }

  _createClass(Actual, [{
    key: 'plot',
    value: function plot(parent, actualData) {
      var line = d3.line().x(function (d) {
        return parent.xScale(d.x);
      }).y(function (d) {
        return parent.yScale(d.y);
      });

      // Save data for queries
      this.data = actualData.map(function (data, idx) {
        return {
          x: idx,
          y: data
        };
      });

      this.group.select('.line-actual').datum(this.data.filter(function (d) {
        return d.y;
      })).transition().duration(200).attr('d', line);

      // Only plot non nulls
      var circles = this.group.selectAll('.point-actual').data(this.data.filter(function (d) {
        return d.y;
      }));

      circles.exit().remove();

      circles.enter().append('circle').merge(circles).attr('class', 'point-actual').transition(200).ease(d3.easeQuadOut).attr('cx', function (d) {
        return parent.xScale(d.x);
      }).attr('cy', function (d) {
        return parent.yScale(d.y);
      }).attr('r', 2);
    }
  }, {
    key: 'query',
    value: function query(idx) {
      return this.data[idx].y;
    }
  }]);

  return Actual;
}();

exports.default = Actual;

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _d = __webpack_require__(0);

var d3 = _interopRequireWildcard(_d);

var _misc = __webpack_require__(1);

var mutils = _interopRequireWildcard(_misc);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Baseline
 */
var Baseline = function () {
  function Baseline(parent) {
    _classCallCheck(this, Baseline);

    var config = parent.config;
    var infoTooltip = parent.infoTooltip;

    var group = parent.svg.append('g').attr('class', 'baseline-group');

    group.append('line').attr('x1', 0).attr('y1', parent.height).attr('x2', parent.width).attr('y2', parent.height).attr('class', 'baseline');

    var text = group.append('text').attr('class', 'title').attr('transform', 'translate(' + (parent.width + 10) + ', 0)');

    // Setup multiline text
    var baselineText = config.baseline.text;
    if (Array.isArray(baselineText)) {
      text.append('tspan').text(baselineText[0]).attr('x', 0);
      baselineText.slice(1).forEach(function (txt) {
        text.append('tspan').text(txt).attr('x', 0).attr('dy', '1em');
      });
    } else {
      text.append('tspan').text(baselineText).attr('x', 0);
    }

    text.style('cursor', 'pointer').on('mouseover', function () {
      return infoTooltip.show();
    }).on('mouseout', function () {
      return infoTooltip.hide();
    }).on('mousemove', function () {
      infoTooltip.renderText({
        title: null,
        text: config.baseline.description
      });

      var pos = mutils.getMousePosition(d3.select('.overlay'));
      infoTooltip.move({
        x: pos[0],
        y: pos[1]
      }, 'left');
    }).on('click', function () {
      window.open(config.baseline.url, '_blank');
    });

    this.group = group;
  }

  _createClass(Baseline, [{
    key: 'plot',
    value: function plot(parent, baselineData) {
      if (baselineData) this.show();else {
        this.hide();
        return;
      }

      this.group.select('.baseline').transition().duration(300).attr('y1', parent.yScale(baselineData)).attr('y2', parent.yScale(baselineData));

      this.group.select('.title').transition().duration(300).attr('dy', parent.yScale(baselineData));
    }

    // Hide baseline

  }, {
    key: 'hide',
    value: function hide() {
      this.group.style('visibility', 'hidden');
    }

    // Show baseline

  }, {
    key: 'show',
    value: function show() {
      this.group.style('visibility', null);
    }
  }]);

  return Baseline;
}();

exports.default = Baseline;

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _d = __webpack_require__(0);

var d3 = _interopRequireWildcard(_d);

var _misc = __webpack_require__(1);

var mutils = _interopRequireWildcard(_misc);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Historical lines
 */
var HistoricalLines = function () {
  function HistoricalLines(parent) {
    _classCallCheck(this, HistoricalLines);

    this.group = parent.svg.append('g').attr('class', 'history-group');
    this.timeChartTooltip = parent.timeChartTooltip;
  }

  _createClass(HistoricalLines, [{
    key: 'plot',
    value: function plot(parent, historicalData) {
      var _this = this;

      this.clear();
      var timeChartTooltip = this.timeChartTooltip;

      var line = d3.line().x(function (d) {
        return parent.xScale(d.x);
      }).y(function (d) {
        return parent.yScale(d.y);
      });

      historicalData.map(function (hd) {
        var plottingData = hd.actual.map(function (data, idx) {
          return {
            x: idx,
            y: data
          };
        });

        var path = _this.group.append('path').attr('class', 'line-history').attr('id', hd.id + '-history');

        path.datum(plottingData).transition().duration(200).attr('d', line);

        path.on('mouseover', function () {
          d3.select('.line-history.highlight').datum(plottingData).attr('d', line);
          timeChartTooltip.show();
        }).on('mouseout', function () {
          d3.select('.line-history.highlight').datum([]).attr('d', line);
          timeChartTooltip.hide();
        }).on('mousemove', function (event) {
          timeChartTooltip.renderText(hd.id);
          var pos = mutils.getMousePosition(d3.select('.overlay'));
          timeChartTooltip.move({
            x: pos[0],
            y: pos[1]
          });
        });
      });

      // Add highlight overlay
      this.group.append('path').attr('class', 'line-history highlight');
    }
  }, {
    key: 'clear',
    value: function clear() {
      this.group.selectAll('*').transition().duration(200).remove();
    }
  }, {
    key: 'hidden',
    get: function get() {
      return this.group.style('visibility') === 'hidden';
    },
    set: function set(value) {
      this.group.style('visibility', value ? 'hidden' : null);
    }
  }]);

  return HistoricalLines;
}();

exports.default = HistoricalLines;

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _actual = __webpack_require__(20);

Object.defineProperty(exports, 'Actual', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_actual).default;
  }
});

var _baseline = __webpack_require__(21);

Object.defineProperty(exports, 'Baseline', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_baseline).default;
  }
});

var _historicalLines = __webpack_require__(22);

Object.defineProperty(exports, 'HistoricalLines', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_historicalLines).default;
  }
});

var _observed = __webpack_require__(24);

Object.defineProperty(exports, 'Observed', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_observed).default;
  }
});

var _timerect = __webpack_require__(27);

Object.defineProperty(exports, 'TimeRect', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_timerect).default;
  }
});

var _prediction = __webpack_require__(26);

Object.defineProperty(exports, 'Prediction', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_prediction).default;
  }
});

var _overlay = __webpack_require__(25);

Object.defineProperty(exports, 'Overlay', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_overlay).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _d = __webpack_require__(0);

var d3 = _interopRequireWildcard(_d);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Observed (at the time of prediction) line
 */
var Observed = function () {
  function Observed(parent) {
    _classCallCheck(this, Observed);

    var group = parent.svg.append('g').attr('class', 'observed-group');

    group.append('path').attr('class', 'line-observed');

    this.group = group;
  }

  _createClass(Observed, [{
    key: 'plot',
    value: function plot(parent, observedData) {
      // Save data for queries and updates
      this.observedData = observedData;
      this.xScale = parent.xScale;
      this.yScale = parent.yScale;
    }
  }, {
    key: 'update',
    value: function update(idx) {
      var _this = this;

      var filteredData = [];

      try {
        var _loop = function _loop(i) {
          var yLags = _this.observedData[idx - i].slice().filter(function (d) {
            return d.lag <= i;
          });
          filteredData.push({
            x: idx - i,
            y: yLags.sort(function (a, b) {
              return b.lag - a.lag;
            })[0].value
          });
        };

        for (var i = 0; i <= idx; i++) {
          _loop(i);
        }
      } catch (e) {
        filteredData = [];
      }

      var circles = this.group.selectAll('.point-observed').data(filteredData);

      circles.exit().remove();

      circles.enter().append('circle').merge(circles).attr('class', 'point-observed').transition().duration(200).ease(d3.easeQuadOut).attr('cx', function (d) {
        return _this.xScale(d.x);
      }).attr('cy', function (d) {
        return _this.yScale(d.y);
      }).attr('r', 2);

      var line = d3.line().x(function (d) {
        return _this.xScale(d.x);
      }).y(function (d) {
        return _this.yScale(d.y);
      });

      this.group.select('.line-observed').datum(filteredData).transition().duration(200).attr('d', line);

      filteredData.reverse();
      this.filteredData = filteredData;
    }
  }, {
    key: 'query',
    value: function query(idx) {
      try {
        return this.filteredData[idx].y;
      } catch (e) {
        return false;
      }
    }
  }]);

  return Observed;
}();

exports.default = Observed;

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _d = __webpack_require__(0);

var d3 = _interopRequireWildcard(_d);

var _misc = __webpack_require__(1);

var mutils = _interopRequireWildcard(_misc);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Overlay = function () {
  function Overlay(parent) {
    _classCallCheck(this, Overlay);

    var svg = parent.svg;
    var height = parent.height;
    var onsetHeight = parent.onsetHeight;
    var width = parent.width;
    var timeChartTooltip = parent.timeChartTooltip;
    var xScale = parent.xScale;
    var chartHeight = height + onsetHeight;

    // Add text for no prediction
    this.noPredText = parent.elementSelection.append('div').attr('class', 'no-pred-text').html('Predictions not available <br> for selected time');

    // Add mouse hover line
    var line = svg.append('line').attr('class', 'hover-line').attr('x1', 0).attr('y1', 0).attr('x2', 0).attr('y2', chartHeight).style('display', 'none');

    // Add now line
    var nowGroup = svg.append('g').attr('class', 'now-group');

    nowGroup.append('line').attr('class', 'now-line').attr('x1', 0).attr('y1', 0).attr('x2', 0).attr('y2', chartHeight);
    nowGroup.append('text').attr('class', 'now-text').attr('transform', 'translate(15, 10) rotate(-90)').style('text-anchor', 'end').text('Today');
    this.nowGroup = nowGroup;

    svg.append('rect').attr('class', 'overlay').attr('height', chartHeight).attr('width', width).on('mouseover', function () {
      line.style('display', null);
      timeChartTooltip.show();
    }).on('mouseout', function () {
      line.style('display', 'none');
      timeChartTooltip.hide();
    });

    // Add mouse move and click events
    d3.select('.overlay').on('mousemove', function () {
      var mouse = d3.mouse(this);
      // Snap x to nearest tick
      var index = Math.round(xScale.invert(mouse[0]));
      var snappedX = xScale(index);

      // Move the cursor
      d3.select('.hover-line').transition().duration(50).attr('x1', snappedX).attr('x2', snappedX);

      timeChartTooltip.renderValues(parent.observed, parent.actual, parent.predictions, index);

      // Find position for tooltip
      var pos = mutils.getMousePosition(d3.select(this));
      timeChartTooltip.move({
        x: pos[0],
        y: pos[1]
      });
    }).on('click', function () {
      parent.dispatchHook('jump-to-index', Math.round(xScale.invert(d3.mouse(this)[0])));
    });
  }

  _createClass(Overlay, [{
    key: 'plot',
    value: function plot(parent, showNowLine) {
      if (showNowLine) {
        var nowPos = parent.xScaleDate(new Date());
        this.nowGroup.select('.now-line').attr('x1', nowPos).attr('x2', nowPos);
        this.nowGroup.select('.now-text').attr('dy', nowPos);
        this.nowGroup.style('display', null);
      } else {
        this.nowGroup.style('display', 'none');
      }
    }
  }, {
    key: 'update',
    value: function update(predictions) {
      // Update no prediction text
      this.noPredText.transition().duration(100).style('display', predictions.filter(function (p) {
        return p.noData;
      }).length !== 0 ? null : 'none');
    }
  }]);

  return Overlay;
}();

exports.default = Overlay;

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _d = __webpack_require__(0);

var d3 = _interopRequireWildcard(_d);

var _misc = __webpack_require__(1);

var mutils = _interopRequireWildcard(_misc);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Prediction marker with following components
 * - Area
 * - Line and dots
 * - Onset
 * - Peak
 */
var Prediction = function () {
  function Prediction(parent, id, meta, color, onsetY) {
    _classCallCheck(this, Prediction);

    var colorPoint = mutils.hexToRgba(color, 0.8);
    var colorRange = mutils.hexToRgba(color, 0.6);

    // Prediction group
    var predictionGroup = parent.svg.append('g').attr('class', 'prediction-group').attr('id', id + '-marker');

    predictionGroup.append('path').attr('class', 'area-prediction').style('fill', color);

    predictionGroup.append('path').attr('class', 'line-prediction').style('stroke', color);

    predictionGroup.selectAll('.point-prediction').enter().append('circle').attr('class', 'point-prediction').style('stroke', color);

    this.predictionGroup = predictionGroup;

    // Create onset group
    var onsetGroup = parent.svg.append('g').attr('class', 'onset-group').attr('id', id + '-marker');

    var stp = 6;

    onsetGroup.append('line').attr('y1', onsetY).attr('y2', onsetY).attr('class', 'range onset-range').style('stroke', colorRange);

    onsetGroup.append('line').attr('y1', onsetY - stp / 2).attr('y2', onsetY + stp / 2).attr('class', 'stopper onset-stopper onset-low').style('stroke', colorRange);

    onsetGroup.append('line').attr('y1', onsetY - stp / 2).attr('y2', onsetY + stp / 2).attr('class', 'stopper onset-stopper onset-high').style('stroke', colorRange);

    onsetGroup.append('circle').attr('r', 3).attr('cy', onsetY).attr('class', 'onset-mark').style('stroke', 'transparent').style('fill', colorPoint);

    this.onsetGroup = onsetGroup;

    // Peak group
    var peakGroup = parent.svg.append('g').attr('class', 'peak-group').attr('id', id + '-marker');

    peakGroup.append('line').attr('class', 'range peak-range peak-range-x').style('stroke', colorRange);

    peakGroup.append('line').attr('class', 'range peak-range peak-range-y').style('stroke', colorRange);

    peakGroup.append('line').attr('class', 'stopper peak-stopper peak-low-x').style('stroke', colorRange);

    peakGroup.append('line').attr('class', 'stopper peak-stopper peak-high-x').style('stroke', colorRange);

    peakGroup.append('line').attr('class', 'stopper peak-stopper peak-low-y').style('stroke', colorRange);

    peakGroup.append('line').attr('class', 'stopper peak-stopper peak-high-y').style('stroke', colorRange);

    peakGroup.append('circle').attr('r', 5).attr('class', 'peak-mark').style('stroke', 'transparent').style('fill', colorPoint);

    this.peakGroup = peakGroup;

    this.color = color;
    this.id = id;
    this.meta = meta;
    this.cid = parent.cid;
    // Tells if the prediction is hidden by some other component
    this._hidden = false;
    // Tells if data is available to be shown for current time
    this.noData = true;
  }

  _createClass(Prediction, [{
    key: 'plot',
    value: function plot(parent, modelData, startingPointsData) {
      this.modelData = modelData;
      this.startingPointsData = startingPointsData;
      this.xScale = parent.xScale;
      this.yScale = parent.yScale;
      this.ticks = parent.ticks;
      this.timeChartTooltip = parent.timeChartTooltip;
      this.displayedData = Array(this.modelData.length).fill(false);
    }
  }, {
    key: 'update',
    value: function update(idx) {
      var _this = this;

      var color = this.color;
      var colorHover = mutils.hexToRgba(color, 0.3);
      var id = this.id;
      var ticks = this.ticks;

      if (this.modelData[idx] === null) {
        // There is no data for current point, hide the markers without
        // setting exposed hidden flag
        this.noData = true;
        this.hideMarkers();
      } else {
        this.noData = false;
        if (!this.hidden) {
          // No one is hiding me
          this.showMarkers();
        }

        var cid = this.cid;
        var timeChartTooltip = this.timeChartTooltip;

        // Move things
        var onset = this.modelData[idx].onsetTime;

        this.onsetGroup.select('.onset-mark').transition().duration(200).attr('cx', this.xScale(onset.point));

        this.onsetGroup.select('.onset-mark').on('mouseover', function () {
          d3.select(this).transition().duration(300).style('stroke', colorHover);
          timeChartTooltip.show();
          timeChartTooltip.renderPoint(id, [{
            key: 'Season Onset',
            value: ticks[onset.point]
          }], color);
        }).on('mouseout', function () {
          d3.select(this).transition().duration(200).style('stroke', 'transparent');
          timeChartTooltip.hide();
        }).on('mousemove', function () {
          var pos = mutils.getMousePosition(d3.select('.overlay'));
          timeChartTooltip.move({
            x: pos[0],
            y: pos[1]
          });
        });

        if (cid === null) {
          ['.range', '.stopper'].forEach(function (cls) {
            _this.onsetGroup.selectAll(cls).attr('visibility', 'hidden');
          });
        } else {
          ['.range', '.stopper'].forEach(function (cls) {
            _this.onsetGroup.selectAll(cls).attr('visibility', null);
          });

          this.onsetGroup.select('.onset-range').transition().duration(200).attr('x1', this.xScale(onset.low[cid])).attr('x2', this.xScale(onset.high[cid]));

          this.onsetGroup.select('.onset-low').transition().duration(200).attr('x1', this.xScale(onset.low[cid])).attr('x2', this.xScale(onset.low[cid]));

          this.onsetGroup.select('.onset-high').transition().duration(200).attr('x1', this.xScale(onset.high[cid])).attr('x2', this.xScale(onset.high[cid]));
        }

        var pw = this.modelData[idx].peakTime;
        var pp = this.modelData[idx].peakValue;

        var leftW = this.xScale(pw.point);
        var leftP = this.yScale(pp.point);
        this.peakGroup.select('.peak-mark').transition().duration(200).attr('cx', leftW).attr('cy', leftP);

        this.peakGroup.select('.peak-mark').on('mouseover', function () {
          d3.select(this).transition().duration(300).style('stroke', colorHover);
          timeChartTooltip.show();
          timeChartTooltip.renderPoint(id, [{
            key: 'Peak Percent',
            value: pp.point
          }, {
            key: 'Peak Week',
            value: ticks[pw.point]
          }], color);
        }).on('mouseout', function () {
          d3.select(this).transition().duration(200).style('stroke', 'transparent');
          timeChartTooltip.hide();
        }).on('mousemove', function () {
          var pos = mutils.getMousePosition(d3.select('.overlay'));
          timeChartTooltip.move({
            x: pos[0],
            y: pos[1]
          });
        });

        if (cid === null) {
          ['.range', '.stopper'].forEach(function (cls) {
            _this.peakGroup.selectAll(cls).attr('visibility', 'hidden');
          });
        } else {
          ['.range', '.stopper'].forEach(function (cls) {
            _this.peakGroup.selectAll(cls).attr('visibility', null);
          });
          this.peakGroup.select('.peak-range-x').transition().duration(200).attr('x1', this.xScale(pw.low[cid])).attr('x2', this.xScale(pw.high[cid])).attr('y1', this.yScale(pp.point)).attr('y2', this.yScale(pp.point));

          this.peakGroup.select('.peak-range-y').transition().duration(200).attr('x1', this.xScale(pw.point)).attr('x2', this.xScale(pw.point)).attr('y1', this.yScale(pp.low[cid])).attr('y2', this.yScale(pp.high[cid]));

          this.peakGroup.select('.peak-low-x').transition().duration(200).attr('x1', this.xScale(pw.low[cid])).attr('x2', this.xScale(pw.low[cid])).attr('y1', this.yScale(pp.point) - 5).attr('y2', this.yScale(pp.point) + 5);

          this.peakGroup.select('.peak-high-x').transition().duration(200).attr('x1', this.xScale(pw.high[cid])).attr('x2', this.xScale(pw.high[cid])).attr('y1', this.yScale(pp.point) - 5).attr('y2', this.yScale(pp.point) + 5);

          leftW = this.xScale(pw.point);
          this.peakGroup.select('.peak-low-y').transition().duration(200).attr('x1', (!leftW ? 0 : leftW) - 5).attr('x2', (!leftW ? 0 : leftW) + 5).attr('y1', this.yScale(pp.low[cid])).attr('y2', this.yScale(pp.low[cid]));

          this.peakGroup.select('.peak-high-y').transition().duration(200).attr('x1', (!leftW ? 0 : leftW) - 5).attr('x2', (!leftW ? 0 : leftW) + 5).attr('y1', this.yScale(pp.high[cid])).attr('y2', this.yScale(pp.high[cid]));
        }

        // Move main pointers
        var predData = this.modelData[idx];
        var startData = this.startingPointsData[idx];

        // Actual point/area to be shown
        var nextTimeData = [{
          index: idx,
          point: startData,
          low: startData,
          high: startData
        }];

        var idxOverflow = Math.min(0, this.modelData.length - (idx + predData.series.length));
        var displayLimit = predData.series.length - idxOverflow;

        for (var i = 0; i < displayLimit; i++) {
          if (cid === null) {
            nextTimeData.push({
              index: i + idx + 1,
              point: predData.series[i].point,
              low: predData.series[i].point,
              high: predData.series[i].point
            });
          } else {
            nextTimeData.push({
              index: i + idx + 1,
              point: predData.series[i].point,
              low: predData.series[i].low[cid],
              high: predData.series[i].high[cid]
            });
          }
        }

        // Save indexed data for query
        this.displayedData = Array(this.modelData.length).fill(false);
        nextTimeData.slice(1).forEach(function (d) {
          _this.displayedData[d.index] = d.point;
        });

        var circles = this.predictionGroup.selectAll('.point-prediction').data(nextTimeData.slice(1));

        circles.exit().remove();

        circles.enter().append('circle').merge(circles).attr('class', 'point-prediction').transition().duration(200).ease(d3.easeQuadOut).attr('cx', function (d) {
          return _this.xScale(d.index);
        }).attr('cy', function (d) {
          return _this.yScale(d.point);
        }).attr('r', 3).style('stroke', this.color);

        var line = d3.line().x(function (d) {
          return _this.xScale(d.index);
        }).y(function (d) {
          return _this.yScale(d.point);
        });

        this.predictionGroup.select('.line-prediction').datum(nextTimeData).transition().duration(200).attr('d', line);

        var area = d3.area().x(function (d) {
          return _this.xScale(d.index);
        }).y1(function (d) {
          return _this.yScale(d.low);
        }).y0(function (d) {
          return _this.yScale(d.high);
        });

        this.predictionGroup.select('.area-prediction').datum(nextTimeData).transition().duration(200).attr('d', area);
      }
    }

    /**
     * Check if we are hidden
     */

  }, {
    key: 'hideMarkers',
    value: function hideMarkers() {
      [this.onsetGroup, this.peakGroup, this.predictionGroup].forEach(function (elem) {
        elem.style('visibility', 'hidden');
      });
    }
  }, {
    key: 'showMarkers',
    value: function showMarkers() {
      [this.onsetGroup, this.peakGroup, this.predictionGroup].forEach(function (elem) {
        elem.style('visibility', null);
      });
    }

    /**
     * Remove the markers
     */

  }, {
    key: 'clear',
    value: function clear() {
      this.onsetGroup.remove();
      this.peakGroup.remove();
      this.predictionGroup.remove();
    }

    /**
     * Ask if we have something to show at the index
     */

  }, {
    key: 'query',
    value: function query(idx) {
      // Don't show anything if predictions are hidden
      return !this.noData && !this.hidden && this.displayedData[idx];
    }

    /**
     * Return index of asked idx among displayedData items
     */

  }, {
    key: 'displayedIdx',
    value: function displayedIdx(idx) {
      for (var i = 0; i < this.displayedData.length; i++) {
        if (this.displayedData[i]) return idx - i;
      }
      return null;
    }
  }, {
    key: 'hidden',
    get: function get() {
      return this._hidden;
    },
    set: function set(hide) {
      if (hide) {
        this.hideMarkers();
      } else {
        if (!this.noData) {
          this.showMarkers();
        }
      }
      this._hidden = hide;
    }
  }]);

  return Prediction;
}();

exports.default = Prediction;

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Time rectangle for navigation guidance
 */
var TimeRect = function () {
  function TimeRect(parent) {
    _classCallCheck(this, TimeRect);

    this.rect = parent.svg.append('rect').attr('x', 0).attr('y', 0).attr('width', 0).attr('height', parent.height).attr('class', 'timerect');
  }

  _createClass(TimeRect, [{
    key: 'plot',
    value: function plot(parent) {
      // Save local data
      this.xScale = parent.xScale;
    }
  }, {
    key: 'update',
    value: function update(idx) {
      this.rect.transition().duration(200).attr('width', this.xScale(idx));
    }
  }]);

  return TimeRect;
}();

exports.default = TimeRect;

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DistributionChart = exports.TimeChart = undefined;

var _timeChart = __webpack_require__(9);

Object.defineProperty(exports, 'TimeChart', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_timeChart).default;
  }
});

var _distributionChart = __webpack_require__(8);

Object.defineProperty(exports, 'DistributionChart', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_distributionChart).default;
  }
});

__webpack_require__(10);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getXDomain = exports.getYDomain = exports.getXDateDomain = exports.getPredictionStartingPoints = undefined;

var _d = __webpack_require__(0);

var d3 = _interopRequireWildcard(_d);

var _mmwrWeek = __webpack_require__(7);

var mmwr = _interopRequireWildcard(_mmwrWeek);

var _errors = __webpack_require__(2);

var errors = _interopRequireWildcard(_errors);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

/**
 * Return points where the predictions were made
 * This is used as the first point in prediction marker
 */
var getPredictionStartingPoints = exports.getPredictionStartingPoints = function getPredictionStartingPoints(data) {
  return data.observed.map(function (d) {
    // Handle zero length values
    try {
      if (d.length !== 0) {
        return d.filter(function (ld) {
          return ld.lag === 0;
        })[0].value;
      } else {
        return null;
      }
    } catch (e) {
      return null;
    }
  });
};

var getXDateDomain = exports.getXDateDomain = function getXDateDomain(timePoints, pointType) {
  return d3.extent(timePoints.map(function (d) {
    if (pointType === 'mmwr-week') {
      return new mmwr.MMWRDate(d.year, d.week).toMomentDate();
    } else if (pointType === 'regular-week') {
      return d3.timeParse('%Y-%W')(d.year + '-' + d.week);
    } else {
      throw new errors.UnknownPointTypeException();
    }
  }));
};

var getYDomain = exports.getYDomain = function getYDomain(data) {
  // Max from actual data
  var maxValues = [Math.max.apply(Math, _toConsumableArray(data.actual.filter(function (d) {
    return d;
  })))];
  // Max from observed data
  maxValues.push(Math.max.apply(Math, _toConsumableArray(data.observed.map(function (d) {
    return Math.max.apply(Math, _toConsumableArray(d.map(function (dl) {
      return dl.value;
    })));
  }))));
  // Max from historical data
  data.history.forEach(function (h) {
    maxValues.push(Math.max.apply(Math, _toConsumableArray(h.actual)));
  });
  // Max from all the models
  data.models.map(function (mdl) {
    maxValues.push(Math.max.apply(Math, _toConsumableArray(mdl.predictions.filter(function (m) {
      return m;
    }).map(function (d) {
      return Math.max.apply(Math, [].concat(_toConsumableArray(d.series.map(function (s) {
        return Math.max.apply(Math, _toConsumableArray(s.high));
      })), [Math.max.apply(Math, _toConsumableArray(d.peakValue.high))]));
    }))));
  });
  // HACK Clipping at 13 since we don't predict beyond that
  return [0, Math.min(13, 1.1 * Math.max.apply(Math, maxValues))];
};

var getXDomain = exports.getXDomain = function getXDomain(timePoints) {
  return [0, timePoints.length - 1];
};

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(31)();
// imports


// module
exports.push([module.i, ".d3-foresight-chart .axis path,\n.d3-foresight-chart .axis line {\n  fill: none;\n  stroke: #bbb; }\n\n.d3-foresight-chart .axis .title {\n  fill: #333;\n  font: 10px sans-serif; }\n\n.d3-foresight-time-chart .overlay {\n  cursor: pointer;\n  fill: none;\n  pointer-events: all; }\n\n.d3-foresight-time-chart .hover-line {\n  fill: none;\n  stroke: #bbb;\n  stroke-width: 1px; }\n\n.d3-foresight-time-chart .onset-group .onset-mark {\n  stroke-width: 6px; }\n\n.d3-foresight-time-chart .peak-group .peak-mark {\n  opacity: .9;\n  stroke-width: 10px; }\n  .d3-foresight-time-chart .peak-group .peak-mark:hover {\n    opacity: 1; }\n\n.d3-foresight-time-chart .peak-group .range {\n  stroke-dasharray: 5, 5;\n  stroke-width: .5px; }\n\n.d3-foresight-time-chart .prediction-group {\n  pointer-events: none; }\n  .d3-foresight-time-chart .prediction-group .line-prediction {\n    fill: none;\n    stroke-width: 1.5px; }\n  .d3-foresight-time-chart .prediction-group .point-prediction {\n    fill: #fff;\n    stroke-width: 1.5px; }\n  .d3-foresight-time-chart .prediction-group .area-prediction {\n    opacity: .2; }\n\n.d3-foresight-time-chart .observed-group {\n  pointer-events: none; }\n  .d3-foresight-time-chart .observed-group .line-observed {\n    fill: none;\n    opacity: .4;\n    stroke: #18817f;\n    stroke-width: 1.5px; }\n  .d3-foresight-time-chart .observed-group .point-observed {\n    fill: #18817f;\n    opacity: .7;\n    stroke: #18817f; }\n\n.d3-foresight-time-chart .actual-group {\n  pointer-events: none; }\n  .d3-foresight-time-chart .actual-group .line-actual {\n    fill: none;\n    opacity: .4;\n    stroke: #66d600;\n    stroke-width: 2.5px; }\n  .d3-foresight-time-chart .actual-group .point-actual {\n    fill: #66d600;\n    opacity: .4;\n    stroke: #66d600; }\n\n.d3-foresight-time-chart .baseline-group .baseline {\n  stroke: #333;\n  stroke-dasharray: 5, 5;\n  stroke-width: .5px; }\n\n.d3-foresight-time-chart .baseline-group .title {\n  fill: #333;\n  font-size: 10px; }\n\n.d3-foresight-time-chart .timerect {\n  fill: #f5f5f5; }\n\n.d3-foresight-time-chart .range,\n.d3-foresight-time-chart .stopper {\n  opacity: .6;\n  stroke: #666;\n  stroke-width: 1px; }\n\n.d3-foresight-time-chart .history-group .line-history {\n  fill: none;\n  stroke: #ddd;\n  stroke-width: 2px; }\n  .d3-foresight-time-chart .history-group .line-history.highlight {\n    pointer-events: none;\n    stroke: #ccc;\n    stroke-width: 3px; }\n\n.d3-foresight-time-chart .now-group .now-line {\n  stroke: #000;\n  stroke-dasharray: 10 5;\n  stroke-width: 1px; }\n\n.d3-foresight-time-chart .now-group .now-text {\n  fill: #666;\n  font-size: 10px;\n  text-transform: uppercase; }\n\n.d3-foresight-time-chart .no-pred-text {\n  font-size: 10px;\n  left: 80px;\n  letter-spacing: 1px;\n  line-height: 25px;\n  margin-bottom: 5px;\n  position: absolute;\n  text-transform: uppercase;\n  top: 30px; }\n\n.d3-foresight-distribution-chart .prediction-group {\n  pointer-events: none; }\n  .d3-foresight-distribution-chart .prediction-group .line-prediction {\n    fill: none;\n    stroke-width: 1.5px; }\n  .d3-foresight-distribution-chart .prediction-group .area-prediction {\n    opacity: .05; }\n\n.d3-foresight-distribution-chart .time-pointer-group .pointer-triangle {\n  fill: #333; }\n\n.d3-foresight-distribution-chart .time-pointer-group .pointer-overlay {\n  cursor: pointer;\n  fill: #333;\n  fill-opacity: 0; }\n\n.d3-foresight-distribution-chart .overlay {\n  fill: none;\n  pointer-events: all; }\n\n.d3-foresight-distribution-chart .hover-line {\n  fill: none;\n  stroke: #bbb;\n  stroke-width: 1px; }\n\n.d3-foresight-distribution-chart .no-pred-text {\n  fill: #333;\n  font-size: 10px;\n  letter-spacing: 1px;\n  text-transform: uppercase; }\n\n.d3-foresight-controls .nav-drawer {\n  background-color: #fff;\n  border-color: #ccc;\n  border-radius: 2px;\n  border-style: solid;\n  border-width: 1px;\n  box-shadow: 1px 1px 2px #ccc;\n  font-size: 11px;\n  min-width: 200px;\n  position: absolute;\n  right: 60px;\n  top: 12px;\n  user-select: none; }\n  .d3-foresight-controls .nav-drawer .legend-prediction-container {\n    max-height: 200px;\n    overflow-y: auto; }\n  .d3-foresight-controls .nav-drawer .legend-control-container {\n    background-color: #f5f5f5;\n    border-color: #ccc;\n    border-style: solid;\n    border-width: 1px 0;\n    padding: 5px 0; }\n    .d3-foresight-controls .nav-drawer .legend-control-container .control-item {\n      align-items: center;\n      display: flex;\n      justify-content: space-between;\n      margin: 5px 0; }\n    .d3-foresight-controls .nav-drawer .legend-control-container .control-item > span:first-child {\n      margin-right: 5px; }\n    .d3-foresight-controls .nav-drawer .legend-control-container .toggle-button {\n      background-color: #fff;\n      border-color: #ccc;\n      border-style: solid;\n      border-width: 1px;\n      padding: 2px 6px; }\n      .d3-foresight-controls .nav-drawer .legend-control-container .toggle-button.selected {\n        background-color: #3273dc;\n        border-color: #3273dc;\n        color: #fff; }\n      .d3-foresight-controls .nav-drawer .legend-control-container .toggle-button:first-child {\n        border-bottom-left-radius: 4px;\n        border-right-width: 1px;\n        border-top-left-radius: 4px; }\n      .d3-foresight-controls .nav-drawer .legend-control-container .toggle-button:last-child {\n        border-bottom-right-radius: 4px;\n        border-left-width: 0;\n        border-top-right-radius: 4px; }\n  .d3-foresight-controls .nav-drawer hr {\n    border: 0;\n    border-bottom: 1px dashed #ccc;\n    height: 1px;\n    margin: 5px 0; }\n  .d3-foresight-controls .nav-drawer .item {\n    padding: 4px 10px; }\n    .d3-foresight-controls .nav-drawer .item .fa {\n      display: inline-block;\n      font-size: 11px;\n      margin-right: 10px;\n      vertical-align: middle; }\n    .d3-foresight-controls .nav-drawer .item .item-title {\n      display: inline-block;\n      font-size: 11px;\n      vertical-align: middle; }\n    .d3-foresight-controls .nav-drawer .item .model-url {\n      color: #3273dc;\n      margin-left: 10px;\n      margin-right: 5px;\n      float: right; }\n    .d3-foresight-controls .nav-drawer .item.na {\n      color: #bbb; }\n      .d3-foresight-controls .nav-drawer .item.na .fa {\n        color: #bbb !important; }\n    .d3-foresight-controls .nav-drawer .item.legend-item-actual i {\n      color: #66d600; }\n    .d3-foresight-controls .nav-drawer .item.legend-item-observed i {\n      color: #18817f; }\n    .d3-foresight-controls .nav-drawer .item.legend-item-history {\n      cursor: pointer; }\n      .d3-foresight-controls .nav-drawer .item.legend-item-history i {\n        color: #ddd; }\n  .d3-foresight-controls .nav-drawer .center {\n    text-align: center; }\n\n.d3-foresight-controls .nav-controls {\n  background-color: #fff;\n  position: absolute;\n  right: 10px;\n  top: 10px; }\n  .d3-foresight-controls .nav-controls .icon {\n    margin-left: 0; }\n  .d3-foresight-controls .nav-controls a {\n    box-shadow: 1px 1px 1px #ccc;\n    margin: 2px 0;\n    width: 28px; }\n\n.d3-foresight-tooltip {\n  background-color: #fff;\n  border-radius: 1px;\n  box-shadow: 0 0 2px;\n  font-size: 11px;\n  position: fixed;\n  z-index: 100; }\n  .d3-foresight-tooltip .bold {\n    font-weight: bold; }\n\n.d3-foresight-info-tooltip {\n  max-width: 150px; }\n  .d3-foresight-info-tooltip .title {\n    padding: 5px 10px;\n    font-size: 13px;\n    margin-bottom: 0 !important;\n    margin-top: 5px; }\n  .d3-foresight-info-tooltip .text {\n    padding: 5px 10px;\n    margin-top: 0; }\n\n.d3-foresight-time-chart-tooltip .bold {\n  float: right;\n  font-weight: bold;\n  margin-left: 5px; }\n\n.d3-foresight-time-chart-tooltip .actual,\n.d3-foresight-time-chart-tooltip .observed {\n  padding: 5px 10px;\n  background-color: #fff;\n  color: #333; }\n\n.d3-foresight-time-chart-tooltip .prediction {\n  padding: 5px 10px;\n  color: #fff; }\n\n.d3-foresight-time-chart-tooltip .point,\n.d3-foresight-time-chart-tooltip .text {\n  padding: 5px 10px;\n  color: #333; }\n  .d3-foresight-time-chart-tooltip .point.head,\n  .d3-foresight-time-chart-tooltip .text.head {\n    color: #fff; }\n\n.d3-foresight-distribution-tooltip .bold {\n  float: right;\n  font-weight: bold;\n  margin-left: 5px; }\n\n.d3-foresight-distribution-tooltip .prediction {\n  padding: 5px 10px;\n  color: #fff; }\n\n.d3-foresight-distribution-tooltip .actual,\n.d3-foresight-distribution-tooltip .observed {\n  padding: 5px 10px;\n  background-color: #fff;\n  color: #333; }\n\n.d3-foresight-distribution-tooltip .text {\n  padding: 5px 10px;\n  color: #333; }\n  .d3-foresight-distribution-tooltip .text.head {\n    color: #fff; }\n", ""]);

// exports


/***/ }),
/* 31 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function() {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		var result = [];
		for(var i = 0; i < this.length; i++) {
			var item = this[i];
			if(item[2]) {
				result.push("@media " + item[2] + "{" + item[1] + "}");
			} else {
				result.push(item[1]);
			}
		}
		return result.join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};


/***/ }),
/* 32 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
var stylesInDom = {},
	memoize = function(fn) {
		var memo;
		return function () {
			if (typeof memo === "undefined") memo = fn.apply(this, arguments);
			return memo;
		};
	},
	isOldIE = memoize(function() {
		return /msie [6-9]\b/.test(self.navigator.userAgent.toLowerCase());
	}),
	getHeadElement = memoize(function () {
		return document.head || document.getElementsByTagName("head")[0];
	}),
	singletonElement = null,
	singletonCounter = 0,
	styleElementsInsertedAtTop = [];

module.exports = function(list, options) {
	if(typeof DEBUG !== "undefined" && DEBUG) {
		if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};
	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (typeof options.singleton === "undefined") options.singleton = isOldIE();

	// By default, add <style> tags to the bottom of <head>.
	if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

	var styles = listToStyles(list);
	addStylesToDom(styles, options);

	return function update(newList) {
		var mayRemove = [];
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			domStyle.refs--;
			mayRemove.push(domStyle);
		}
		if(newList) {
			var newStyles = listToStyles(newList);
			addStylesToDom(newStyles, options);
		}
		for(var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];
			if(domStyle.refs === 0) {
				for(var j = 0; j < domStyle.parts.length; j++)
					domStyle.parts[j]();
				delete stylesInDom[domStyle.id];
			}
		}
	};
}

function addStylesToDom(styles, options) {
	for(var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];
		if(domStyle) {
			domStyle.refs++;
			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}
			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];
			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}
			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles(list) {
	var styles = [];
	var newStyles = {};
	for(var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};
		if(!newStyles[id])
			styles.push(newStyles[id] = {id: id, parts: [part]});
		else
			newStyles[id].parts.push(part);
	}
	return styles;
}

function insertStyleElement(options, styleElement) {
	var head = getHeadElement();
	var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
	if (options.insertAt === "top") {
		if(!lastStyleElementInsertedAtTop) {
			head.insertBefore(styleElement, head.firstChild);
		} else if(lastStyleElementInsertedAtTop.nextSibling) {
			head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			head.appendChild(styleElement);
		}
		styleElementsInsertedAtTop.push(styleElement);
	} else if (options.insertAt === "bottom") {
		head.appendChild(styleElement);
	} else {
		throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
	}
}

function removeStyleElement(styleElement) {
	styleElement.parentNode.removeChild(styleElement);
	var idx = styleElementsInsertedAtTop.indexOf(styleElement);
	if(idx >= 0) {
		styleElementsInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement(options) {
	var styleElement = document.createElement("style");
	styleElement.type = "text/css";
	insertStyleElement(options, styleElement);
	return styleElement;
}

function createLinkElement(options) {
	var linkElement = document.createElement("link");
	linkElement.rel = "stylesheet";
	insertStyleElement(options, linkElement);
	return linkElement;
}

function addStyle(obj, options) {
	var styleElement, update, remove;

	if (options.singleton) {
		var styleIndex = singletonCounter++;
		styleElement = singletonElement || (singletonElement = createStyleElement(options));
		update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
		remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
	} else if(obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function") {
		styleElement = createLinkElement(options);
		update = updateLink.bind(null, styleElement);
		remove = function() {
			removeStyleElement(styleElement);
			if(styleElement.href)
				URL.revokeObjectURL(styleElement.href);
		};
	} else {
		styleElement = createStyleElement(options);
		update = applyToTag.bind(null, styleElement);
		remove = function() {
			removeStyleElement(styleElement);
		};
	}

	update(obj);

	return function updateStyle(newObj) {
		if(newObj) {
			if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
				return;
			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;
		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag(styleElement, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (styleElement.styleSheet) {
		styleElement.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = styleElement.childNodes;
		if (childNodes[index]) styleElement.removeChild(childNodes[index]);
		if (childNodes.length) {
			styleElement.insertBefore(cssNode, childNodes[index]);
		} else {
			styleElement.appendChild(cssNode);
		}
	}
}

function applyToTag(styleElement, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		styleElement.setAttribute("media", media)
	}

	if(styleElement.styleSheet) {
		styleElement.styleSheet.cssText = css;
	} else {
		while(styleElement.firstChild) {
			styleElement.removeChild(styleElement.firstChild);
		}
		styleElement.appendChild(document.createTextNode(css));
	}
}

function updateLink(linkElement, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	if(sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = linkElement.href;

	linkElement.href = URL.createObjectURL(blob);

	if(oldSrc)
		URL.revokeObjectURL(oldSrc);
}


/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(34)


/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

// Generated by CoffeeScript 1.12.4
(function() {
  var rand, umd,
    slice = [].slice;

  rand = function() {
    return ((Math.random().toString(36)) + "00000000000000000").replace(/[^a-z]+/g, "").slice(0, 5);
  };

  umd = function(factory) {
    if (true) {
      return module.exports = factory();
    } else if (typeof define === 'function' && define.amd) {
      return define([], factory);
    } else {
      return this.textures = factory();
    }
  };

  umd(function() {
    return {
      circles: function() {
        var background, circles, complement, fill, id, radius, size, stroke, strokeWidth;
        size = 20;
        background = "";
        radius = 2;
        complement = false;
        fill = "#343434";
        stroke = "#343434";
        strokeWidth = 0;
        id = rand();
        circles = function(sel) {
          var corner, g, i, len, ref, results;
          g = sel.append("defs").append("pattern").attr("id", id).attr("patternUnits", "userSpaceOnUse").attr("width", size).attr("height", size);
          if (background) {
            g.append("rect").attr("width", size).attr("height", size).attr("fill", background);
          }
          g.append("circle").attr("cx", size / 2).attr("cy", size / 2).attr("r", radius).attr("fill", fill).attr("stroke", stroke).attr("stroke-width", strokeWidth);
          if (complement) {
            ref = [[0, 0], [0, size], [size, 0], [size, size]];
            results = [];
            for (i = 0, len = ref.length; i < len; i++) {
              corner = ref[i];
              results.push(g.append("circle").attr("cx", corner[0]).attr("cy", corner[1]).attr("r", radius).attr("fill", fill).attr("stroke", stroke).attr("stroke-width", strokeWidth));
            }
            return results;
          }
        };
        circles.heavier = function(_) {
          if (!arguments.length) {
            radius = radius * 2;
          } else {
            radius = _ ? radius * 2 * _ : radius * 2;
          }
          return circles;
        };
        circles.lighter = function(_) {
          if (!arguments.length) {
            radius = radius / 2;
          } else {
            radius = _ ? radius / (2 * _) : radius / 2;
          }
          return circles;
        };
        circles.thinner = function(_) {
          if (!arguments.length) {
            size = size * 2;
          } else {
            size = _ ? size * 2 * _ : size * 2;
          }
          return circles;
        };
        circles.thicker = function(_) {
          if (!arguments.length) {
            size = size / 2;
          } else {
            size = _ ? size / (2 * _) : size / 2;
          }
          return circles;
        };
        circles.background = function(_) {
          background = _;
          return circles;
        };
        circles.size = function(_) {
          size = _;
          return circles;
        };
        circles.complement = function() {
          complement = true;
          return circles;
        };
        circles.radius = function(_) {
          radius = _;
          return circles;
        };
        circles.fill = function(_) {
          fill = _;
          return circles;
        };
        circles.stroke = function(_) {
          stroke = _;
          return circles;
        };
        circles.strokeWidth = function(_) {
          strokeWidth = _;
          return circles;
        };
        circles.id = function(_) {
          if (!arguments.length) {
            return id;
          } else {
            id = _;
            return circles;
          }
        };
        circles.url = function() {
          return "url(#" + id + ")";
        };
        return circles;
      },
      lines: function() {
        var background, id, lines, orientation, path, shapeRendering, size, stroke, strokeWidth;
        size = 20;
        strokeWidth = 2;
        stroke = "#343434";
        id = rand();
        background = "";
        orientation = ["diagonal"];
        shapeRendering = "auto";
        path = function(orientation) {
          switch (orientation) {
            case "0/8":
              return (function(s) {
                return "M " + (s / 2) + ", 0 l 0, " + s;
              })(size);
            case "vertical":
              return (function(s) {
                return "M " + (s / 2) + ", 0 l 0, " + s;
              })(size);
            case "1/8":
              return (function(s) {
                return "M " + (s / 4) + ",0 l " + (s / 2) + "," + s + " M " + (-s / 4) + ",0 l " + (s / 2) + "," + s + "\nM " + (s * 3 / 4) + ",0 l " + (s / 2) + "," + s;
              })(size);
            case "2/8":
              return (function(s) {
                return "M 0," + s + " l " + s + "," + (-s) + " M " + (-s / 4) + "," + (s / 4) + " l " + (s / 2) + "," + (-s / 2) + "\nM " + (3 / 4 * s) + "," + (5 / 4 * s) + " l " + (s / 2) + "," + (-s / 2);
              })(size);
            case "diagonal":
              return (function(s) {
                return "M 0," + s + " l " + s + "," + (-s) + " M " + (-s / 4) + "," + (s / 4) + " l " + (s / 2) + "," + (-s / 2) + "\nM " + (3 / 4 * s) + "," + (5 / 4 * s) + " l " + (s / 2) + "," + (-s / 2);
              })(size);
            case "3/8":
              return (function(s) {
                return "M 0," + (3 / 4 * s) + " l " + s + "," + (-s / 2) + " M 0," + (s / 4) + " l " + s + "," + (-s / 2) + "\nM 0," + (s * 5 / 4) + " l " + s + "," + (-s / 2);
              })(size);
            case "4/8":
              return (function(s) {
                return "M 0," + (s / 2) + " l " + s + ",0";
              })(size);
            case "horizontal":
              return (function(s) {
                return "M 0," + (s / 2) + " l " + s + ",0";
              })(size);
            case "5/8":
              return (function(s) {
                return "M 0," + (-s / 4) + " l " + s + "," + (s / 2) + "M 0," + (s / 4) + " l " + s + "," + (s / 2) + "\nM 0," + (s * 3 / 4) + " l " + s + "," + (s / 2);
              })(size);
            case "6/8":
              return (function(s) {
                return "M 0,0 l " + s + "," + s + " M " + (-s / 4) + "," + (3 / 4 * s) + " l " + (s / 2) + "," + (s / 2) + "\nM " + (s * 3 / 4) + "," + (-s / 4) + " l " + (s / 2) + "," + (s / 2);
              })(size);
            case "7/8":
              return (function(s) {
                return "M " + (-s / 4) + ",0 l " + (s / 2) + "," + s + " M " + (s / 4) + ",0 l " + (s / 2) + "," + s + "\nM " + (s * 3 / 4) + ",0 l " + (s / 2) + "," + s;
              })(size);
            default:
              return (function(s) {
                return "M " + (s / 2) + ", 0 l 0, " + s;
              })(size);
          }
        };
        lines = function(sel) {
          var g, i, len, o, results;
          g = sel.append("defs").append("pattern").attr("id", id).attr("patternUnits", "userSpaceOnUse").attr("width", size).attr("height", size);
          if (background) {
            g.append("rect").attr("width", size).attr("height", size).attr("fill", background);
          }
          results = [];
          for (i = 0, len = orientation.length; i < len; i++) {
            o = orientation[i];
            results.push(g.append("path").attr("d", path(o)).attr("stroke-width", strokeWidth).attr("shape-rendering", shapeRendering).attr("stroke", stroke).attr("stroke-linecap", "square"));
          }
          return results;
        };
        lines.background = function(_) {
          background = _;
          return lines;
        };
        lines.shapeRendering = function(_) {
          shapeRendering = _;
          return lines;
        };
        lines.heavier = function(_) {
          if (!arguments.length) {
            strokeWidth = strokeWidth * 2;
          } else {
            strokeWidth = _ ? strokeWidth * 2 * _ : strokeWidth * 2;
          }
          return lines;
        };
        lines.lighter = function(_) {
          if (!arguments.length) {
            strokeWidth = strokeWidth / 2;
          } else {
            strokeWidth = _ ? strokeWidth / (2 * _) : strokeWidth / 2;
          }
          return lines;
        };
        lines.thinner = function(_) {
          if (!arguments.length) {
            size = size * 2;
          } else {
            size = _ ? size * 2 * _ : size * 2;
          }
          return lines;
        };
        lines.thicker = function(_) {
          if (!arguments.length) {
            size = size / 2;
          } else {
            size = _ ? size / (2 * _) : size / 2;
          }
          return lines;
        };
        lines.orientation = function() {
          var args;
          args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
          orientation = args;
          return lines;
        };
        lines.size = function(_) {
          size = _;
          return lines;
        };
        lines.stroke = function(_) {
          stroke = _;
          return lines;
        };
        lines.strokeWidth = function(_) {
          strokeWidth = _;
          return lines;
        };
        lines.id = function(_) {
          if (!arguments.length) {
            return id;
          } else {
            id = _;
            return lines;
          }
        };
        lines.url = function() {
          return "url(#" + id + ")";
        };
        return lines;
      },
      paths: function() {
        var background, d, fill, height, id, paths, shapeRendering, size, stroke, strokeWidth, svgPath, width;
        size = 20;
        height = 1;
        width = 1;
        strokeWidth = 2;
        stroke = "#343434";
        background = "";
        d = "";
        shapeRendering = "auto";
        fill = "transparent";
        id = rand();
        svgPath = function(_) {
          switch (_) {
            case "squares":
              return (function(s) {
                return "M " + (s / 4) + " " + (s / 4) + " l " + (s / 2) + " 0 l 0 " + (s / 2) + " l " + (-s / 2) + " 0 Z";
              })(size);
            case "nylon":
              return (function(s) {
                return "M 0 " + (s / 4) + " l " + (s / 4) + " 0 l 0 " + (-s / 4) + " M " + (s * 3 / 4) + " " + s + " l 0 " + (-s / 4) + "\nl " + (s / 4) + " 0 M " + (s / 4) + " " + (s / 2) + " l 0 " + (s / 4) + " l " + (s / 4) + " 0 M " + (s / 2) + " " + (s / 4) + "\nl " + (s / 4) + " 0 l 0 " + (s / 4);
              })(size);
            case "waves":
              return (function(s) {
                return "M 0 " + (s / 2) + " c " + (s / 8) + " " + (-s / 4) + " , " + (s * 3 / 8) + " " + (-s / 4) + " , " + (s / 2) + " 0\nc " + (s / 8) + " " + (s / 4) + " , " + (s * 3 / 8) + " " + (s / 4) + " , " + (s / 2) + " 0 M " + (-s / 2) + " " + (s / 2) + "\nc " + (s / 8) + " " + (s / 4) + " , " + (s * 3 / 8) + " " + (s / 4) + " , " + (s / 2) + " 0 M " + s + " " + (s / 2) + "\nc " + (s / 8) + " " + (-s / 4) + " , " + (s * 3 / 8) + " " + (-s / 4) + " , " + (s / 2) + " 0";
              })(size);
            case "woven":
              return (function(s) {
                return "M " + (s / 4) + "," + (s / 4) + "l" + (s / 2) + "," + (s / 2) + "M" + (s * 3 / 4) + "," + (s / 4) + "l" + (s / 2) + "," + (-s / 2) + "\nM" + (s / 4) + "," + (s * 3 / 4) + "l" + (-s / 2) + "," + (s / 2) + "M" + (s * 3 / 4) + "," + (s * 5 / 4) + "l" + (s / 2) + "," + (-s / 2) + "\nM" + (-s / 4) + "," + (s / 4) + "l" + (s / 2) + "," + (-s / 2);
              })(size);
            case "crosses":
              return (function(s) {
                return "M " + (s / 4) + "," + (s / 4) + "l" + (s / 2) + "," + (s / 2) + "M" + (s / 4) + "," + (s * 3 / 4) + "l" + (s / 2) + "," + (-s / 2);
              })(size);
            case "caps":
              return (function(s) {
                return "M " + (s / 4) + "," + (s * 3 / 4) + "l" + (s / 4) + "," + (-s / 2) + "l" + (s / 4) + "," + (s / 2);
              })(size);
            case "hexagons":
              return (function(s) {
                width = 3;
                height = Math.sqrt(3);
                return "M " + s + ",0 l " + s + ",0 l " + (s / 2) + "," + (s * Math.sqrt(3) / 2) + "\nl " + (-s / 2) + "," + (s * Math.sqrt(3) / 2) + " l " + (-s) + ",0\nl " + (-s / 2) + "," + (-s * Math.sqrt(3) / 2) + " Z M 0," + (s * Math.sqrt(3) / 2) + "\nl " + (s / 2) + ",0 M " + (3 * s) + "," + (s * Math.sqrt(3) / 2) + " l " + (-s / 2) + ",0";
              })(size);
            default:
              return _(size);
          }
        };
        paths = function(sel) {
          var g, path;
          path = svgPath(d);
          g = sel.append("defs").append("pattern").attr("id", id).attr("patternUnits", "userSpaceOnUse").attr("width", size * width).attr("height", size * height);
          if (background) {
            g.append("rect").attr("width", size * width).attr("height", size * height).attr("fill", background);
          }
          return g.append("path").attr("d", path).attr("fill", fill).attr("stroke-width", strokeWidth).attr("shape-rendering", shapeRendering).attr("stroke", stroke).attr("stroke-linecap", "square");
        };
        paths.background = function(_) {
          background = _;
          return paths;
        };
        paths.shapeRendering = function(_) {
          shapeRendering = _;
          return paths;
        };
        paths.heavier = function(_) {
          if (!arguments.length) {
            strokeWidth = strokeWidth * 2;
          } else {
            strokeWidth = _ ? strokeWidth * 2 * _ : strokeWidth * 2;
          }
          return paths;
        };
        paths.lighter = function(_) {
          if (!arguments.length) {
            strokeWidth = strokeWidth / 2;
          } else {
            strokeWidth = _ ? strokeWidth / (2 * _) : strokeWidth / 2;
          }
          return paths;
        };
        paths.thinner = function(_) {
          if (!arguments.length) {
            size = size * 2;
          } else {
            size = _ ? size * 2 * _ : size * 2;
          }
          return paths;
        };
        paths.thicker = function(_) {
          if (!arguments.length) {
            size = size / 2;
          } else {
            size = _ ? size / (2 * _) : size / 2;
          }
          return paths;
        };
        paths.d = function(_) {
          d = _;
          return paths;
        };
        paths.size = function(_) {
          size = _;
          return paths;
        };
        paths.stroke = function(_) {
          stroke = _;
          return paths;
        };
        paths.strokeWidth = function(_) {
          strokeWidth = _;
          return paths;
        };
        paths.id = function(_) {
          if (!arguments.length) {
            return id;
          } else {
            id = _;
            return paths;
          }
        };
        paths.url = function() {
          return "url(#" + id + ")";
        };
        return paths;
      }
    };
  });

}).call(this);


/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_RESULT__;// TinyColor v1.4.1
// https://github.com/bgrins/TinyColor
// Brian Grinstead, MIT License

(function(Math) {

var trimLeft = /^\s+/,
    trimRight = /\s+$/,
    tinyCounter = 0,
    mathRound = Math.round,
    mathMin = Math.min,
    mathMax = Math.max,
    mathRandom = Math.random;

function tinycolor (color, opts) {

    color = (color) ? color : '';
    opts = opts || { };

    // If input is already a tinycolor, return itself
    if (color instanceof tinycolor) {
       return color;
    }
    // If we are called as a function, call using new instead
    if (!(this instanceof tinycolor)) {
        return new tinycolor(color, opts);
    }

    var rgb = inputToRGB(color);
    this._originalInput = color,
    this._r = rgb.r,
    this._g = rgb.g,
    this._b = rgb.b,
    this._a = rgb.a,
    this._roundA = mathRound(100*this._a) / 100,
    this._format = opts.format || rgb.format;
    this._gradientType = opts.gradientType;

    // Don't let the range of [0,255] come back in [0,1].
    // Potentially lose a little bit of precision here, but will fix issues where
    // .5 gets interpreted as half of the total, instead of half of 1
    // If it was supposed to be 128, this was already taken care of by `inputToRgb`
    if (this._r < 1) { this._r = mathRound(this._r); }
    if (this._g < 1) { this._g = mathRound(this._g); }
    if (this._b < 1) { this._b = mathRound(this._b); }

    this._ok = rgb.ok;
    this._tc_id = tinyCounter++;
}

tinycolor.prototype = {
    isDark: function() {
        return this.getBrightness() < 128;
    },
    isLight: function() {
        return !this.isDark();
    },
    isValid: function() {
        return this._ok;
    },
    getOriginalInput: function() {
      return this._originalInput;
    },
    getFormat: function() {
        return this._format;
    },
    getAlpha: function() {
        return this._a;
    },
    getBrightness: function() {
        //http://www.w3.org/TR/AERT#color-contrast
        var rgb = this.toRgb();
        return (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000;
    },
    getLuminance: function() {
        //http://www.w3.org/TR/2008/REC-WCAG20-20081211/#relativeluminancedef
        var rgb = this.toRgb();
        var RsRGB, GsRGB, BsRGB, R, G, B;
        RsRGB = rgb.r/255;
        GsRGB = rgb.g/255;
        BsRGB = rgb.b/255;

        if (RsRGB <= 0.03928) {R = RsRGB / 12.92;} else {R = Math.pow(((RsRGB + 0.055) / 1.055), 2.4);}
        if (GsRGB <= 0.03928) {G = GsRGB / 12.92;} else {G = Math.pow(((GsRGB + 0.055) / 1.055), 2.4);}
        if (BsRGB <= 0.03928) {B = BsRGB / 12.92;} else {B = Math.pow(((BsRGB + 0.055) / 1.055), 2.4);}
        return (0.2126 * R) + (0.7152 * G) + (0.0722 * B);
    },
    setAlpha: function(value) {
        this._a = boundAlpha(value);
        this._roundA = mathRound(100*this._a) / 100;
        return this;
    },
    toHsv: function() {
        var hsv = rgbToHsv(this._r, this._g, this._b);
        return { h: hsv.h * 360, s: hsv.s, v: hsv.v, a: this._a };
    },
    toHsvString: function() {
        var hsv = rgbToHsv(this._r, this._g, this._b);
        var h = mathRound(hsv.h * 360), s = mathRound(hsv.s * 100), v = mathRound(hsv.v * 100);
        return (this._a == 1) ?
          "hsv("  + h + ", " + s + "%, " + v + "%)" :
          "hsva(" + h + ", " + s + "%, " + v + "%, "+ this._roundA + ")";
    },
    toHsl: function() {
        var hsl = rgbToHsl(this._r, this._g, this._b);
        return { h: hsl.h * 360, s: hsl.s, l: hsl.l, a: this._a };
    },
    toHslString: function() {
        var hsl = rgbToHsl(this._r, this._g, this._b);
        var h = mathRound(hsl.h * 360), s = mathRound(hsl.s * 100), l = mathRound(hsl.l * 100);
        return (this._a == 1) ?
          "hsl("  + h + ", " + s + "%, " + l + "%)" :
          "hsla(" + h + ", " + s + "%, " + l + "%, "+ this._roundA + ")";
    },
    toHex: function(allow3Char) {
        return rgbToHex(this._r, this._g, this._b, allow3Char);
    },
    toHexString: function(allow3Char) {
        return '#' + this.toHex(allow3Char);
    },
    toHex8: function(allow4Char) {
        return rgbaToHex(this._r, this._g, this._b, this._a, allow4Char);
    },
    toHex8String: function(allow4Char) {
        return '#' + this.toHex8(allow4Char);
    },
    toRgb: function() {
        return { r: mathRound(this._r), g: mathRound(this._g), b: mathRound(this._b), a: this._a };
    },
    toRgbString: function() {
        return (this._a == 1) ?
          "rgb("  + mathRound(this._r) + ", " + mathRound(this._g) + ", " + mathRound(this._b) + ")" :
          "rgba(" + mathRound(this._r) + ", " + mathRound(this._g) + ", " + mathRound(this._b) + ", " + this._roundA + ")";
    },
    toPercentageRgb: function() {
        return { r: mathRound(bound01(this._r, 255) * 100) + "%", g: mathRound(bound01(this._g, 255) * 100) + "%", b: mathRound(bound01(this._b, 255) * 100) + "%", a: this._a };
    },
    toPercentageRgbString: function() {
        return (this._a == 1) ?
          "rgb("  + mathRound(bound01(this._r, 255) * 100) + "%, " + mathRound(bound01(this._g, 255) * 100) + "%, " + mathRound(bound01(this._b, 255) * 100) + "%)" :
          "rgba(" + mathRound(bound01(this._r, 255) * 100) + "%, " + mathRound(bound01(this._g, 255) * 100) + "%, " + mathRound(bound01(this._b, 255) * 100) + "%, " + this._roundA + ")";
    },
    toName: function() {
        if (this._a === 0) {
            return "transparent";
        }

        if (this._a < 1) {
            return false;
        }

        return hexNames[rgbToHex(this._r, this._g, this._b, true)] || false;
    },
    toFilter: function(secondColor) {
        var hex8String = '#' + rgbaToArgbHex(this._r, this._g, this._b, this._a);
        var secondHex8String = hex8String;
        var gradientType = this._gradientType ? "GradientType = 1, " : "";

        if (secondColor) {
            var s = tinycolor(secondColor);
            secondHex8String = '#' + rgbaToArgbHex(s._r, s._g, s._b, s._a);
        }

        return "progid:DXImageTransform.Microsoft.gradient("+gradientType+"startColorstr="+hex8String+",endColorstr="+secondHex8String+")";
    },
    toString: function(format) {
        var formatSet = !!format;
        format = format || this._format;

        var formattedString = false;
        var hasAlpha = this._a < 1 && this._a >= 0;
        var needsAlphaFormat = !formatSet && hasAlpha && (format === "hex" || format === "hex6" || format === "hex3" || format === "hex4" || format === "hex8" || format === "name");

        if (needsAlphaFormat) {
            // Special case for "transparent", all other non-alpha formats
            // will return rgba when there is transparency.
            if (format === "name" && this._a === 0) {
                return this.toName();
            }
            return this.toRgbString();
        }
        if (format === "rgb") {
            formattedString = this.toRgbString();
        }
        if (format === "prgb") {
            formattedString = this.toPercentageRgbString();
        }
        if (format === "hex" || format === "hex6") {
            formattedString = this.toHexString();
        }
        if (format === "hex3") {
            formattedString = this.toHexString(true);
        }
        if (format === "hex4") {
            formattedString = this.toHex8String(true);
        }
        if (format === "hex8") {
            formattedString = this.toHex8String();
        }
        if (format === "name") {
            formattedString = this.toName();
        }
        if (format === "hsl") {
            formattedString = this.toHslString();
        }
        if (format === "hsv") {
            formattedString = this.toHsvString();
        }

        return formattedString || this.toHexString();
    },
    clone: function() {
        return tinycolor(this.toString());
    },

    _applyModification: function(fn, args) {
        var color = fn.apply(null, [this].concat([].slice.call(args)));
        this._r = color._r;
        this._g = color._g;
        this._b = color._b;
        this.setAlpha(color._a);
        return this;
    },
    lighten: function() {
        return this._applyModification(lighten, arguments);
    },
    brighten: function() {
        return this._applyModification(brighten, arguments);
    },
    darken: function() {
        return this._applyModification(darken, arguments);
    },
    desaturate: function() {
        return this._applyModification(desaturate, arguments);
    },
    saturate: function() {
        return this._applyModification(saturate, arguments);
    },
    greyscale: function() {
        return this._applyModification(greyscale, arguments);
    },
    spin: function() {
        return this._applyModification(spin, arguments);
    },

    _applyCombination: function(fn, args) {
        return fn.apply(null, [this].concat([].slice.call(args)));
    },
    analogous: function() {
        return this._applyCombination(analogous, arguments);
    },
    complement: function() {
        return this._applyCombination(complement, arguments);
    },
    monochromatic: function() {
        return this._applyCombination(monochromatic, arguments);
    },
    splitcomplement: function() {
        return this._applyCombination(splitcomplement, arguments);
    },
    triad: function() {
        return this._applyCombination(triad, arguments);
    },
    tetrad: function() {
        return this._applyCombination(tetrad, arguments);
    }
};

// If input is an object, force 1 into "1.0" to handle ratios properly
// String input requires "1.0" as input, so 1 will be treated as 1
tinycolor.fromRatio = function(color, opts) {
    if (typeof color == "object") {
        var newColor = {};
        for (var i in color) {
            if (color.hasOwnProperty(i)) {
                if (i === "a") {
                    newColor[i] = color[i];
                }
                else {
                    newColor[i] = convertToPercentage(color[i]);
                }
            }
        }
        color = newColor;
    }

    return tinycolor(color, opts);
};

// Given a string or object, convert that input to RGB
// Possible string inputs:
//
//     "red"
//     "#f00" or "f00"
//     "#ff0000" or "ff0000"
//     "#ff000000" or "ff000000"
//     "rgb 255 0 0" or "rgb (255, 0, 0)"
//     "rgb 1.0 0 0" or "rgb (1, 0, 0)"
//     "rgba (255, 0, 0, 1)" or "rgba 255, 0, 0, 1"
//     "rgba (1.0, 0, 0, 1)" or "rgba 1.0, 0, 0, 1"
//     "hsl(0, 100%, 50%)" or "hsl 0 100% 50%"
//     "hsla(0, 100%, 50%, 1)" or "hsla 0 100% 50%, 1"
//     "hsv(0, 100%, 100%)" or "hsv 0 100% 100%"
//
function inputToRGB(color) {

    var rgb = { r: 0, g: 0, b: 0 };
    var a = 1;
    var s = null;
    var v = null;
    var l = null;
    var ok = false;
    var format = false;

    if (typeof color == "string") {
        color = stringInputToObject(color);
    }

    if (typeof color == "object") {
        if (isValidCSSUnit(color.r) && isValidCSSUnit(color.g) && isValidCSSUnit(color.b)) {
            rgb = rgbToRgb(color.r, color.g, color.b);
            ok = true;
            format = String(color.r).substr(-1) === "%" ? "prgb" : "rgb";
        }
        else if (isValidCSSUnit(color.h) && isValidCSSUnit(color.s) && isValidCSSUnit(color.v)) {
            s = convertToPercentage(color.s);
            v = convertToPercentage(color.v);
            rgb = hsvToRgb(color.h, s, v);
            ok = true;
            format = "hsv";
        }
        else if (isValidCSSUnit(color.h) && isValidCSSUnit(color.s) && isValidCSSUnit(color.l)) {
            s = convertToPercentage(color.s);
            l = convertToPercentage(color.l);
            rgb = hslToRgb(color.h, s, l);
            ok = true;
            format = "hsl";
        }

        if (color.hasOwnProperty("a")) {
            a = color.a;
        }
    }

    a = boundAlpha(a);

    return {
        ok: ok,
        format: color.format || format,
        r: mathMin(255, mathMax(rgb.r, 0)),
        g: mathMin(255, mathMax(rgb.g, 0)),
        b: mathMin(255, mathMax(rgb.b, 0)),
        a: a
    };
}


// Conversion Functions
// --------------------

// `rgbToHsl`, `rgbToHsv`, `hslToRgb`, `hsvToRgb` modified from:
// <http://mjijackson.com/2008/02/rgb-to-hsl-and-rgb-to-hsv-color-model-conversion-algorithms-in-javascript>

// `rgbToRgb`
// Handle bounds / percentage checking to conform to CSS color spec
// <http://www.w3.org/TR/css3-color/>
// *Assumes:* r, g, b in [0, 255] or [0, 1]
// *Returns:* { r, g, b } in [0, 255]
function rgbToRgb(r, g, b){
    return {
        r: bound01(r, 255) * 255,
        g: bound01(g, 255) * 255,
        b: bound01(b, 255) * 255
    };
}

// `rgbToHsl`
// Converts an RGB color value to HSL.
// *Assumes:* r, g, and b are contained in [0, 255] or [0, 1]
// *Returns:* { h, s, l } in [0,1]
function rgbToHsl(r, g, b) {

    r = bound01(r, 255);
    g = bound01(g, 255);
    b = bound01(b, 255);

    var max = mathMax(r, g, b), min = mathMin(r, g, b);
    var h, s, l = (max + min) / 2;

    if(max == min) {
        h = s = 0; // achromatic
    }
    else {
        var d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch(max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }

        h /= 6;
    }

    return { h: h, s: s, l: l };
}

// `hslToRgb`
// Converts an HSL color value to RGB.
// *Assumes:* h is contained in [0, 1] or [0, 360] and s and l are contained [0, 1] or [0, 100]
// *Returns:* { r, g, b } in the set [0, 255]
function hslToRgb(h, s, l) {
    var r, g, b;

    h = bound01(h, 360);
    s = bound01(s, 100);
    l = bound01(l, 100);

    function hue2rgb(p, q, t) {
        if(t < 0) t += 1;
        if(t > 1) t -= 1;
        if(t < 1/6) return p + (q - p) * 6 * t;
        if(t < 1/2) return q;
        if(t < 2/3) return p + (q - p) * (2/3 - t) * 6;
        return p;
    }

    if(s === 0) {
        r = g = b = l; // achromatic
    }
    else {
        var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        var p = 2 * l - q;
        r = hue2rgb(p, q, h + 1/3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1/3);
    }

    return { r: r * 255, g: g * 255, b: b * 255 };
}

// `rgbToHsv`
// Converts an RGB color value to HSV
// *Assumes:* r, g, and b are contained in the set [0, 255] or [0, 1]
// *Returns:* { h, s, v } in [0,1]
function rgbToHsv(r, g, b) {

    r = bound01(r, 255);
    g = bound01(g, 255);
    b = bound01(b, 255);

    var max = mathMax(r, g, b), min = mathMin(r, g, b);
    var h, s, v = max;

    var d = max - min;
    s = max === 0 ? 0 : d / max;

    if(max == min) {
        h = 0; // achromatic
    }
    else {
        switch(max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }
    return { h: h, s: s, v: v };
}

// `hsvToRgb`
// Converts an HSV color value to RGB.
// *Assumes:* h is contained in [0, 1] or [0, 360] and s and v are contained in [0, 1] or [0, 100]
// *Returns:* { r, g, b } in the set [0, 255]
 function hsvToRgb(h, s, v) {

    h = bound01(h, 360) * 6;
    s = bound01(s, 100);
    v = bound01(v, 100);

    var i = Math.floor(h),
        f = h - i,
        p = v * (1 - s),
        q = v * (1 - f * s),
        t = v * (1 - (1 - f) * s),
        mod = i % 6,
        r = [v, q, p, p, t, v][mod],
        g = [t, v, v, q, p, p][mod],
        b = [p, p, t, v, v, q][mod];

    return { r: r * 255, g: g * 255, b: b * 255 };
}

// `rgbToHex`
// Converts an RGB color to hex
// Assumes r, g, and b are contained in the set [0, 255]
// Returns a 3 or 6 character hex
function rgbToHex(r, g, b, allow3Char) {

    var hex = [
        pad2(mathRound(r).toString(16)),
        pad2(mathRound(g).toString(16)),
        pad2(mathRound(b).toString(16))
    ];

    // Return a 3 character hex if possible
    if (allow3Char && hex[0].charAt(0) == hex[0].charAt(1) && hex[1].charAt(0) == hex[1].charAt(1) && hex[2].charAt(0) == hex[2].charAt(1)) {
        return hex[0].charAt(0) + hex[1].charAt(0) + hex[2].charAt(0);
    }

    return hex.join("");
}

// `rgbaToHex`
// Converts an RGBA color plus alpha transparency to hex
// Assumes r, g, b are contained in the set [0, 255] and
// a in [0, 1]. Returns a 4 or 8 character rgba hex
function rgbaToHex(r, g, b, a, allow4Char) {

    var hex = [
        pad2(mathRound(r).toString(16)),
        pad2(mathRound(g).toString(16)),
        pad2(mathRound(b).toString(16)),
        pad2(convertDecimalToHex(a))
    ];

    // Return a 4 character hex if possible
    if (allow4Char && hex[0].charAt(0) == hex[0].charAt(1) && hex[1].charAt(0) == hex[1].charAt(1) && hex[2].charAt(0) == hex[2].charAt(1) && hex[3].charAt(0) == hex[3].charAt(1)) {
        return hex[0].charAt(0) + hex[1].charAt(0) + hex[2].charAt(0) + hex[3].charAt(0);
    }

    return hex.join("");
}

// `rgbaToArgbHex`
// Converts an RGBA color to an ARGB Hex8 string
// Rarely used, but required for "toFilter()"
function rgbaToArgbHex(r, g, b, a) {

    var hex = [
        pad2(convertDecimalToHex(a)),
        pad2(mathRound(r).toString(16)),
        pad2(mathRound(g).toString(16)),
        pad2(mathRound(b).toString(16))
    ];

    return hex.join("");
}

// `equals`
// Can be called with any tinycolor input
tinycolor.equals = function (color1, color2) {
    if (!color1 || !color2) { return false; }
    return tinycolor(color1).toRgbString() == tinycolor(color2).toRgbString();
};

tinycolor.random = function() {
    return tinycolor.fromRatio({
        r: mathRandom(),
        g: mathRandom(),
        b: mathRandom()
    });
};


// Modification Functions
// ----------------------
// Thanks to less.js for some of the basics here
// <https://github.com/cloudhead/less.js/blob/master/lib/less/functions.js>

function desaturate(color, amount) {
    amount = (amount === 0) ? 0 : (amount || 10);
    var hsl = tinycolor(color).toHsl();
    hsl.s -= amount / 100;
    hsl.s = clamp01(hsl.s);
    return tinycolor(hsl);
}

function saturate(color, amount) {
    amount = (amount === 0) ? 0 : (amount || 10);
    var hsl = tinycolor(color).toHsl();
    hsl.s += amount / 100;
    hsl.s = clamp01(hsl.s);
    return tinycolor(hsl);
}

function greyscale(color) {
    return tinycolor(color).desaturate(100);
}

function lighten (color, amount) {
    amount = (amount === 0) ? 0 : (amount || 10);
    var hsl = tinycolor(color).toHsl();
    hsl.l += amount / 100;
    hsl.l = clamp01(hsl.l);
    return tinycolor(hsl);
}

function brighten(color, amount) {
    amount = (amount === 0) ? 0 : (amount || 10);
    var rgb = tinycolor(color).toRgb();
    rgb.r = mathMax(0, mathMin(255, rgb.r - mathRound(255 * - (amount / 100))));
    rgb.g = mathMax(0, mathMin(255, rgb.g - mathRound(255 * - (amount / 100))));
    rgb.b = mathMax(0, mathMin(255, rgb.b - mathRound(255 * - (amount / 100))));
    return tinycolor(rgb);
}

function darken (color, amount) {
    amount = (amount === 0) ? 0 : (amount || 10);
    var hsl = tinycolor(color).toHsl();
    hsl.l -= amount / 100;
    hsl.l = clamp01(hsl.l);
    return tinycolor(hsl);
}

// Spin takes a positive or negative amount within [-360, 360] indicating the change of hue.
// Values outside of this range will be wrapped into this range.
function spin(color, amount) {
    var hsl = tinycolor(color).toHsl();
    var hue = (hsl.h + amount) % 360;
    hsl.h = hue < 0 ? 360 + hue : hue;
    return tinycolor(hsl);
}

// Combination Functions
// ---------------------
// Thanks to jQuery xColor for some of the ideas behind these
// <https://github.com/infusion/jQuery-xcolor/blob/master/jquery.xcolor.js>

function complement(color) {
    var hsl = tinycolor(color).toHsl();
    hsl.h = (hsl.h + 180) % 360;
    return tinycolor(hsl);
}

function triad(color) {
    var hsl = tinycolor(color).toHsl();
    var h = hsl.h;
    return [
        tinycolor(color),
        tinycolor({ h: (h + 120) % 360, s: hsl.s, l: hsl.l }),
        tinycolor({ h: (h + 240) % 360, s: hsl.s, l: hsl.l })
    ];
}

function tetrad(color) {
    var hsl = tinycolor(color).toHsl();
    var h = hsl.h;
    return [
        tinycolor(color),
        tinycolor({ h: (h + 90) % 360, s: hsl.s, l: hsl.l }),
        tinycolor({ h: (h + 180) % 360, s: hsl.s, l: hsl.l }),
        tinycolor({ h: (h + 270) % 360, s: hsl.s, l: hsl.l })
    ];
}

function splitcomplement(color) {
    var hsl = tinycolor(color).toHsl();
    var h = hsl.h;
    return [
        tinycolor(color),
        tinycolor({ h: (h + 72) % 360, s: hsl.s, l: hsl.l}),
        tinycolor({ h: (h + 216) % 360, s: hsl.s, l: hsl.l})
    ];
}

function analogous(color, results, slices) {
    results = results || 6;
    slices = slices || 30;

    var hsl = tinycolor(color).toHsl();
    var part = 360 / slices;
    var ret = [tinycolor(color)];

    for (hsl.h = ((hsl.h - (part * results >> 1)) + 720) % 360; --results; ) {
        hsl.h = (hsl.h + part) % 360;
        ret.push(tinycolor(hsl));
    }
    return ret;
}

function monochromatic(color, results) {
    results = results || 6;
    var hsv = tinycolor(color).toHsv();
    var h = hsv.h, s = hsv.s, v = hsv.v;
    var ret = [];
    var modification = 1 / results;

    while (results--) {
        ret.push(tinycolor({ h: h, s: s, v: v}));
        v = (v + modification) % 1;
    }

    return ret;
}

// Utility Functions
// ---------------------

tinycolor.mix = function(color1, color2, amount) {
    amount = (amount === 0) ? 0 : (amount || 50);

    var rgb1 = tinycolor(color1).toRgb();
    var rgb2 = tinycolor(color2).toRgb();

    var p = amount / 100;

    var rgba = {
        r: ((rgb2.r - rgb1.r) * p) + rgb1.r,
        g: ((rgb2.g - rgb1.g) * p) + rgb1.g,
        b: ((rgb2.b - rgb1.b) * p) + rgb1.b,
        a: ((rgb2.a - rgb1.a) * p) + rgb1.a
    };

    return tinycolor(rgba);
};


// Readability Functions
// ---------------------
// <http://www.w3.org/TR/2008/REC-WCAG20-20081211/#contrast-ratiodef (WCAG Version 2)

// `contrast`
// Analyze the 2 colors and returns the color contrast defined by (WCAG Version 2)
tinycolor.readability = function(color1, color2) {
    var c1 = tinycolor(color1);
    var c2 = tinycolor(color2);
    return (Math.max(c1.getLuminance(),c2.getLuminance())+0.05) / (Math.min(c1.getLuminance(),c2.getLuminance())+0.05);
};

// `isReadable`
// Ensure that foreground and background color combinations meet WCAG2 guidelines.
// The third argument is an optional Object.
//      the 'level' property states 'AA' or 'AAA' - if missing or invalid, it defaults to 'AA';
//      the 'size' property states 'large' or 'small' - if missing or invalid, it defaults to 'small'.
// If the entire object is absent, isReadable defaults to {level:"AA",size:"small"}.

// *Example*
//    tinycolor.isReadable("#000", "#111") => false
//    tinycolor.isReadable("#000", "#111",{level:"AA",size:"large"}) => false
tinycolor.isReadable = function(color1, color2, wcag2) {
    var readability = tinycolor.readability(color1, color2);
    var wcag2Parms, out;

    out = false;

    wcag2Parms = validateWCAG2Parms(wcag2);
    switch (wcag2Parms.level + wcag2Parms.size) {
        case "AAsmall":
        case "AAAlarge":
            out = readability >= 4.5;
            break;
        case "AAlarge":
            out = readability >= 3;
            break;
        case "AAAsmall":
            out = readability >= 7;
            break;
    }
    return out;

};

// `mostReadable`
// Given a base color and a list of possible foreground or background
// colors for that base, returns the most readable color.
// Optionally returns Black or White if the most readable color is unreadable.
// *Example*
//    tinycolor.mostReadable(tinycolor.mostReadable("#123", ["#124", "#125"],{includeFallbackColors:false}).toHexString(); // "#112255"
//    tinycolor.mostReadable(tinycolor.mostReadable("#123", ["#124", "#125"],{includeFallbackColors:true}).toHexString();  // "#ffffff"
//    tinycolor.mostReadable("#a8015a", ["#faf3f3"],{includeFallbackColors:true,level:"AAA",size:"large"}).toHexString(); // "#faf3f3"
//    tinycolor.mostReadable("#a8015a", ["#faf3f3"],{includeFallbackColors:true,level:"AAA",size:"small"}).toHexString(); // "#ffffff"
tinycolor.mostReadable = function(baseColor, colorList, args) {
    var bestColor = null;
    var bestScore = 0;
    var readability;
    var includeFallbackColors, level, size ;
    args = args || {};
    includeFallbackColors = args.includeFallbackColors ;
    level = args.level;
    size = args.size;

    for (var i= 0; i < colorList.length ; i++) {
        readability = tinycolor.readability(baseColor, colorList[i]);
        if (readability > bestScore) {
            bestScore = readability;
            bestColor = tinycolor(colorList[i]);
        }
    }

    if (tinycolor.isReadable(baseColor, bestColor, {"level":level,"size":size}) || !includeFallbackColors) {
        return bestColor;
    }
    else {
        args.includeFallbackColors=false;
        return tinycolor.mostReadable(baseColor,["#fff", "#000"],args);
    }
};


// Big List of Colors
// ------------------
// <http://www.w3.org/TR/css3-color/#svg-color>
var names = tinycolor.names = {
    aliceblue: "f0f8ff",
    antiquewhite: "faebd7",
    aqua: "0ff",
    aquamarine: "7fffd4",
    azure: "f0ffff",
    beige: "f5f5dc",
    bisque: "ffe4c4",
    black: "000",
    blanchedalmond: "ffebcd",
    blue: "00f",
    blueviolet: "8a2be2",
    brown: "a52a2a",
    burlywood: "deb887",
    burntsienna: "ea7e5d",
    cadetblue: "5f9ea0",
    chartreuse: "7fff00",
    chocolate: "d2691e",
    coral: "ff7f50",
    cornflowerblue: "6495ed",
    cornsilk: "fff8dc",
    crimson: "dc143c",
    cyan: "0ff",
    darkblue: "00008b",
    darkcyan: "008b8b",
    darkgoldenrod: "b8860b",
    darkgray: "a9a9a9",
    darkgreen: "006400",
    darkgrey: "a9a9a9",
    darkkhaki: "bdb76b",
    darkmagenta: "8b008b",
    darkolivegreen: "556b2f",
    darkorange: "ff8c00",
    darkorchid: "9932cc",
    darkred: "8b0000",
    darksalmon: "e9967a",
    darkseagreen: "8fbc8f",
    darkslateblue: "483d8b",
    darkslategray: "2f4f4f",
    darkslategrey: "2f4f4f",
    darkturquoise: "00ced1",
    darkviolet: "9400d3",
    deeppink: "ff1493",
    deepskyblue: "00bfff",
    dimgray: "696969",
    dimgrey: "696969",
    dodgerblue: "1e90ff",
    firebrick: "b22222",
    floralwhite: "fffaf0",
    forestgreen: "228b22",
    fuchsia: "f0f",
    gainsboro: "dcdcdc",
    ghostwhite: "f8f8ff",
    gold: "ffd700",
    goldenrod: "daa520",
    gray: "808080",
    green: "008000",
    greenyellow: "adff2f",
    grey: "808080",
    honeydew: "f0fff0",
    hotpink: "ff69b4",
    indianred: "cd5c5c",
    indigo: "4b0082",
    ivory: "fffff0",
    khaki: "f0e68c",
    lavender: "e6e6fa",
    lavenderblush: "fff0f5",
    lawngreen: "7cfc00",
    lemonchiffon: "fffacd",
    lightblue: "add8e6",
    lightcoral: "f08080",
    lightcyan: "e0ffff",
    lightgoldenrodyellow: "fafad2",
    lightgray: "d3d3d3",
    lightgreen: "90ee90",
    lightgrey: "d3d3d3",
    lightpink: "ffb6c1",
    lightsalmon: "ffa07a",
    lightseagreen: "20b2aa",
    lightskyblue: "87cefa",
    lightslategray: "789",
    lightslategrey: "789",
    lightsteelblue: "b0c4de",
    lightyellow: "ffffe0",
    lime: "0f0",
    limegreen: "32cd32",
    linen: "faf0e6",
    magenta: "f0f",
    maroon: "800000",
    mediumaquamarine: "66cdaa",
    mediumblue: "0000cd",
    mediumorchid: "ba55d3",
    mediumpurple: "9370db",
    mediumseagreen: "3cb371",
    mediumslateblue: "7b68ee",
    mediumspringgreen: "00fa9a",
    mediumturquoise: "48d1cc",
    mediumvioletred: "c71585",
    midnightblue: "191970",
    mintcream: "f5fffa",
    mistyrose: "ffe4e1",
    moccasin: "ffe4b5",
    navajowhite: "ffdead",
    navy: "000080",
    oldlace: "fdf5e6",
    olive: "808000",
    olivedrab: "6b8e23",
    orange: "ffa500",
    orangered: "ff4500",
    orchid: "da70d6",
    palegoldenrod: "eee8aa",
    palegreen: "98fb98",
    paleturquoise: "afeeee",
    palevioletred: "db7093",
    papayawhip: "ffefd5",
    peachpuff: "ffdab9",
    peru: "cd853f",
    pink: "ffc0cb",
    plum: "dda0dd",
    powderblue: "b0e0e6",
    purple: "800080",
    rebeccapurple: "663399",
    red: "f00",
    rosybrown: "bc8f8f",
    royalblue: "4169e1",
    saddlebrown: "8b4513",
    salmon: "fa8072",
    sandybrown: "f4a460",
    seagreen: "2e8b57",
    seashell: "fff5ee",
    sienna: "a0522d",
    silver: "c0c0c0",
    skyblue: "87ceeb",
    slateblue: "6a5acd",
    slategray: "708090",
    slategrey: "708090",
    snow: "fffafa",
    springgreen: "00ff7f",
    steelblue: "4682b4",
    tan: "d2b48c",
    teal: "008080",
    thistle: "d8bfd8",
    tomato: "ff6347",
    turquoise: "40e0d0",
    violet: "ee82ee",
    wheat: "f5deb3",
    white: "fff",
    whitesmoke: "f5f5f5",
    yellow: "ff0",
    yellowgreen: "9acd32"
};

// Make it easy to access colors via `hexNames[hex]`
var hexNames = tinycolor.hexNames = flip(names);


// Utilities
// ---------

// `{ 'name1': 'val1' }` becomes `{ 'val1': 'name1' }`
function flip(o) {
    var flipped = { };
    for (var i in o) {
        if (o.hasOwnProperty(i)) {
            flipped[o[i]] = i;
        }
    }
    return flipped;
}

// Return a valid alpha value [0,1] with all invalid values being set to 1
function boundAlpha(a) {
    a = parseFloat(a);

    if (isNaN(a) || a < 0 || a > 1) {
        a = 1;
    }

    return a;
}

// Take input from [0, n] and return it as [0, 1]
function bound01(n, max) {
    if (isOnePointZero(n)) { n = "100%"; }

    var processPercent = isPercentage(n);
    n = mathMin(max, mathMax(0, parseFloat(n)));

    // Automatically convert percentage into number
    if (processPercent) {
        n = parseInt(n * max, 10) / 100;
    }

    // Handle floating point rounding errors
    if ((Math.abs(n - max) < 0.000001)) {
        return 1;
    }

    // Convert into [0, 1] range if it isn't already
    return (n % max) / parseFloat(max);
}

// Force a number between 0 and 1
function clamp01(val) {
    return mathMin(1, mathMax(0, val));
}

// Parse a base-16 hex value into a base-10 integer
function parseIntFromHex(val) {
    return parseInt(val, 16);
}

// Need to handle 1.0 as 100%, since once it is a number, there is no difference between it and 1
// <http://stackoverflow.com/questions/7422072/javascript-how-to-detect-number-as-a-decimal-including-1-0>
function isOnePointZero(n) {
    return typeof n == "string" && n.indexOf('.') != -1 && parseFloat(n) === 1;
}

// Check to see if string passed in is a percentage
function isPercentage(n) {
    return typeof n === "string" && n.indexOf('%') != -1;
}

// Force a hex value to have 2 characters
function pad2(c) {
    return c.length == 1 ? '0' + c : '' + c;
}

// Replace a decimal with it's percentage value
function convertToPercentage(n) {
    if (n <= 1) {
        n = (n * 100) + "%";
    }

    return n;
}

// Converts a decimal to a hex value
function convertDecimalToHex(d) {
    return Math.round(parseFloat(d) * 255).toString(16);
}
// Converts a hex value to a decimal
function convertHexToDecimal(h) {
    return (parseIntFromHex(h) / 255);
}

var matchers = (function() {

    // <http://www.w3.org/TR/css3-values/#integers>
    var CSS_INTEGER = "[-\\+]?\\d+%?";

    // <http://www.w3.org/TR/css3-values/#number-value>
    var CSS_NUMBER = "[-\\+]?\\d*\\.\\d+%?";

    // Allow positive/negative integer/number.  Don't capture the either/or, just the entire outcome.
    var CSS_UNIT = "(?:" + CSS_NUMBER + ")|(?:" + CSS_INTEGER + ")";

    // Actual matching.
    // Parentheses and commas are optional, but not required.
    // Whitespace can take the place of commas or opening paren
    var PERMISSIVE_MATCH3 = "[\\s|\\(]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")\\s*\\)?";
    var PERMISSIVE_MATCH4 = "[\\s|\\(]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")\\s*\\)?";

    return {
        CSS_UNIT: new RegExp(CSS_UNIT),
        rgb: new RegExp("rgb" + PERMISSIVE_MATCH3),
        rgba: new RegExp("rgba" + PERMISSIVE_MATCH4),
        hsl: new RegExp("hsl" + PERMISSIVE_MATCH3),
        hsla: new RegExp("hsla" + PERMISSIVE_MATCH4),
        hsv: new RegExp("hsv" + PERMISSIVE_MATCH3),
        hsva: new RegExp("hsva" + PERMISSIVE_MATCH4),
        hex3: /^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
        hex6: /^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/,
        hex4: /^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
        hex8: /^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/
    };
})();

// `isValidCSSUnit`
// Take in a single string / number and check to see if it looks like a CSS unit
// (see `matchers` above for definition).
function isValidCSSUnit(color) {
    return !!matchers.CSS_UNIT.exec(color);
}

// `stringInputToObject`
// Permissive string parsing.  Take in a number of formats, and output an object
// based on detected format.  Returns `{ r, g, b }` or `{ h, s, l }` or `{ h, s, v}`
function stringInputToObject(color) {

    color = color.replace(trimLeft,'').replace(trimRight, '').toLowerCase();
    var named = false;
    if (names[color]) {
        color = names[color];
        named = true;
    }
    else if (color == 'transparent') {
        return { r: 0, g: 0, b: 0, a: 0, format: "name" };
    }

    // Try to match string input using regular expressions.
    // Keep most of the number bounding out of this function - don't worry about [0,1] or [0,100] or [0,360]
    // Just return an object and let the conversion functions handle that.
    // This way the result will be the same whether the tinycolor is initialized with string or object.
    var match;
    if ((match = matchers.rgb.exec(color))) {
        return { r: match[1], g: match[2], b: match[3] };
    }
    if ((match = matchers.rgba.exec(color))) {
        return { r: match[1], g: match[2], b: match[3], a: match[4] };
    }
    if ((match = matchers.hsl.exec(color))) {
        return { h: match[1], s: match[2], l: match[3] };
    }
    if ((match = matchers.hsla.exec(color))) {
        return { h: match[1], s: match[2], l: match[3], a: match[4] };
    }
    if ((match = matchers.hsv.exec(color))) {
        return { h: match[1], s: match[2], v: match[3] };
    }
    if ((match = matchers.hsva.exec(color))) {
        return { h: match[1], s: match[2], v: match[3], a: match[4] };
    }
    if ((match = matchers.hex8.exec(color))) {
        return {
            r: parseIntFromHex(match[1]),
            g: parseIntFromHex(match[2]),
            b: parseIntFromHex(match[3]),
            a: convertHexToDecimal(match[4]),
            format: named ? "name" : "hex8"
        };
    }
    if ((match = matchers.hex6.exec(color))) {
        return {
            r: parseIntFromHex(match[1]),
            g: parseIntFromHex(match[2]),
            b: parseIntFromHex(match[3]),
            format: named ? "name" : "hex"
        };
    }
    if ((match = matchers.hex4.exec(color))) {
        return {
            r: parseIntFromHex(match[1] + '' + match[1]),
            g: parseIntFromHex(match[2] + '' + match[2]),
            b: parseIntFromHex(match[3] + '' + match[3]),
            a: convertHexToDecimal(match[4] + '' + match[4]),
            format: named ? "name" : "hex8"
        };
    }
    if ((match = matchers.hex3.exec(color))) {
        return {
            r: parseIntFromHex(match[1] + '' + match[1]),
            g: parseIntFromHex(match[2] + '' + match[2]),
            b: parseIntFromHex(match[3] + '' + match[3]),
            format: named ? "name" : "hex"
        };
    }

    return false;
}

function validateWCAG2Parms(parms) {
    // return valid WCAG2 parms for isReadable.
    // If input parms are invalid, return {"level":"AA", "size":"small"}
    var level, size;
    parms = parms || {"level":"AA", "size":"small"};
    level = (parms.level || "AA").toUpperCase();
    size = (parms.size || "small").toLowerCase();
    if (level !== "AA" && level !== "AAA") {
        level = "AA";
    }
    if (size !== "small" && size !== "large") {
        size = "small";
    }
    return {"level":level, "size":size};
}

// Node: Export function
if (typeof module !== "undefined" && module.exports) {
    module.exports = tinycolor;
}
// AMD/requirejs: Define the module
else if (true) {
    !(__WEBPACK_AMD_DEFINE_RESULT__ = function () {return tinycolor;}.call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}
// Browser: Expose to window
else {
    window.tinycolor = tinycolor;
}

})(Math);


/***/ }),
/* 36 */
/***/ (function(module, exports) {

module.exports = {
	"accent": "#3273dc",
	"actual": "#66d600",
	"observed": "#18817f",
	"history": "#eee",
	"history-highlight": "#ddd",
	"axis-ticks": "#bbb",
	"hover-line": "#bbb",
	"black": "#000",
	"gray": "#333",
	"gray-light": "#666",
	"white": "#fff",
	"white-shade": "#f5f5f5"
};

/***/ }),
/* 37 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_37__;

/***/ })
/******/ ]);
});