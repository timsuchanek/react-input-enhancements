'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = registerInput;
function registerInput(cmp, input) {
  cmp.input = input;

  if (typeof cmp.props.registerInput === 'function') {
    cmp.props.registerInput(input);
  }
}