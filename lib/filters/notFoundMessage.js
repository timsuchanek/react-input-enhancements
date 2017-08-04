'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

exports.default = notFoundMessage;

var _isStatic = require('../utils/isStatic');

var _isStatic2 = _interopRequireDefault(_isStatic);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getEmptyOption(message) {
  return { label: message, static: true, disabled: true };
}

function notFoundMessage(message, ignoreStatic) {
  return function (options, value) {
    if (!ignoreStatic) {
      return options.length === 0 && value ? [getEmptyOption(message)] : options;
    }

    var staticOptions = options.filter(_isStatic2.default);

    return options.length === staticOptions.length && value ? [].concat((0, _toConsumableArray3.default)(staticOptions), [getEmptyOption(message)]) : options;
  };
}