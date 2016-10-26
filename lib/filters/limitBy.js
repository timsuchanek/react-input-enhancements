'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = limitBy;

var _isStatic = require('../utils/isStatic');

var _isStatic2 = _interopRequireDefault(_isStatic);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function limitBy(limit) {
  return function (options) {
    return options.slice(0, limit + options.filter(_isStatic2.default).length);
  };
}