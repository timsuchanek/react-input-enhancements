'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DropdownOption = function (_PureComponent) {
  (0, _inherits3.default)(DropdownOption, _PureComponent);

  function DropdownOption() {
    (0, _classCallCheck3.default)(this, DropdownOption);
    return (0, _possibleConstructorReturn3.default)(this, (DropdownOption.__proto__ || (0, _getPrototypeOf2.default)(DropdownOption)).apply(this, arguments));
  }

  (0, _createClass3.default)(DropdownOption, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      if (this.props.highlighted) {
        this.scrollToOption();
      }
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps) {
      if (!prevProps.highlighted && this.props.highlighted) {
        this.scrollToOption();
      }
    }
  }, {
    key: 'scrollToOption',
    value: function scrollToOption() {
      try {
        var optionEl = (0, _reactDom.findDOMNode)(this);
        if (optionEl) {
          var optionHeight = optionEl.offsetHeight;
          var listEl = optionEl.parentNode;
          var listHeight = listEl.clientHeight;
          listEl.scrollTop = optionEl.offsetTop - (listHeight - optionHeight) / 2;
        }
      } catch (e) {}
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { onMouseDown: this.props.onMouseDown },
        this.props.children
      );
    }
  }]);
  return DropdownOption;
}(_react.PureComponent);

DropdownOption.propTypes = {
  highlighted: _react.PropTypes.bool,
  onMouseDown: _react.PropTypes.func
};
exports.default = DropdownOption;