'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = sortByMatchingText;

var _lodash = require('lodash.sortby');

var _lodash2 = _interopRequireDefault(_lodash);

var _getOptionText = require('../utils/getOptionText');

var _getOptionText2 = _interopRequireDefault(_getOptionText);

var _isStatic = require('../utils/isStatic');

var _isStatic2 = _interopRequireDefault(_isStatic);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function sortByMatchingText(options, value) {
  value = value && value.toLowerCase();

  return (0, _lodash2.default)(options, function (opt) {
    if ((0, _isStatic2.default)(opt)) {
      return 0;
    }

    var text = (0, _getOptionText2.default)(opt).toLowerCase();
    var matching = text.indexOf(value) === 0;
    return matching ? 1 : 2;
  });
}