'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getInput;

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _deprecated = require('./deprecated');

var _deprecated2 = _interopRequireDefault(_deprecated);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getInput(cmp) {
  if (cmp.props.getInputElement) {
    return cmp.props.getInputElement();
  }

  if (cmp.input) {
    return cmp.input;
  }

  // eslint-disable-next-line
  (0, _deprecated2.default)('Automatic input resolving is deprecated: please provide input instance via `registerInput`');

  var el = _reactDom2.default.findDOMNode(cmp);
  return el.tagName === 'INPUT' ? el : el.getElementsByTagName('INPUT')[0];
}