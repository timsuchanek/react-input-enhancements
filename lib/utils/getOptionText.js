'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _find = require('babel-runtime/core-js/array/find');

var _find2 = _interopRequireDefault(_find);

exports.default = getOptionText;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getOptionText(opt) {
  if (!opt) return '';

  return (0, _find2.default)([opt, opt.text, opt.label, opt.value], function (value) {
    return typeof value === 'string';
  }) || '';
}