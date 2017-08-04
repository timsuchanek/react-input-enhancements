'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

exports.default = findMatchingTextIndex;

var _getOptionText = require('./getOptionText');

var _getOptionText2 = _interopRequireDefault(_getOptionText);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function findMatchingTextIndex(value, options, allMatches) {
  var lowerText = value && value.toLowerCase();

  var foundOptions = options.reduce(function (opts, opt, idx) {
    if (opt && opt.disabled) {
      return opts;
    }

    var optValue = opt && opt.hasOwnProperty('value') ? opt.value : typeof opt === 'string' ? opt : null;
    var optText = (0, _getOptionText2.default)(opt);
    var matchPosition = optText.toLowerCase().indexOf(lowerText);

    if (optValue === value && opt !== null || optText && lowerText && (allMatches ? matchPosition !== -1 : matchPosition === 0)) {

      return [].concat((0, _toConsumableArray3.default)(opts), [[idx, optText, optValue, matchPosition, optText.toLowerCase()]]);
    }

    return opts;
  }, []);

  foundOptions.sort(function (a, b) {
    return a[3] - b[3] || (a[4] > b[4] ? 1 : -1);
  });

  return foundOptions.length ? foundOptions[0] : [null, null, null];
}