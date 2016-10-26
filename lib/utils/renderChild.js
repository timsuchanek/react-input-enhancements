'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

exports.default = renderChild;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function renderChild(children, inputProps, otherProps, registerInput) {
  if (typeof children === 'function') {
    return children(inputProps, otherProps, registerInput);
  } else {
    var input = _react.Children.only(children);

    var props = (0, _extends3.default)({}, inputProps, input.props);

    if (props.style) {
      props = (0, _extends3.default)({}, props, {
        style: (0, _extends3.default)({}, inputProps.style || {}, input.props.style || {})
      });
    }

    return _react2.default.cloneElement(input, props);
  }
}