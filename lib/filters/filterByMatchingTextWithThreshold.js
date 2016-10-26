'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = filterByMatchingTextWithThreshold;

var _getOptionText = require('../utils/getOptionText');

var _getOptionText2 = _interopRequireDefault(_getOptionText);

var _isStatic = require('../utils/isStatic');

var _isStatic2 = _interopRequireDefault(_isStatic);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function filterByMatchingTextWithThreshold(threshold) {
  return function (options, value) {
    if (!value || threshold && options.length < threshold) return options;
    value = value.toLowerCase();

    return options.filter(function (opt) {
      return (0, _isStatic2.default)(opt) || (0, _getOptionText2.default)(opt).toLowerCase().indexOf(value) !== -1;
    });
  };
}