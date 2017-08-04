'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

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

var _applyMaskToString = require('./applyMaskToString');

var _applyMaskToString2 = _interopRequireDefault(_applyMaskToString);

var _getInput = require('./utils/getInput');

var _getInput2 = _interopRequireDefault(_getInput);

var _registerInput = require('./utils/registerInput');

var _registerInput2 = _interopRequireDefault(_registerInput);

var _renderChild = require('./utils/renderChild');

var _renderChild2 = _interopRequireDefault(_renderChild);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getStateFromProps(value, props) {
  value = props.onValuePreUpdate(value);
  var processedValue = (0, _applyMaskToString2.default)(value, props.pattern, props.emptyChar);
  var validatedValue = props.onValidate(value, processedValue);
  if (validatedValue && validatedValue.result) {
    processedValue = validatedValue;
  } else if (validatedValue) {
    processedValue.isValid = false;
  }
  var state = processedValue.isValid ? { value: processedValue.result, lastIndex: processedValue.lastIndex } : {};

  if (!processedValue.unmaskedValue && props.placeholder) {
    state.value = '';
  }

  return [state, processedValue];
}

var Mask = function (_PureComponent) {
  (0, _inherits3.default)(Mask, _PureComponent);

  function Mask(props) {
    (0, _classCallCheck3.default)(this, Mask);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Mask.__proto__ || (0, _getPrototypeOf2.default)(Mask)).call(this, props));

    _initialiseProps.call(_this);

    var value = props.value || '';

    var _getStateFromProps = getStateFromProps(value, props),
        _getStateFromProps2 = (0, _slicedToArray3.default)(_getStateFromProps, 1),
        state = _getStateFromProps2[0];

    _this.state = (0, _extends3.default)({
      value: value,
      lastIndex: 0
    }, state);
    return _this;
  }

  (0, _createClass3.default)(Mask, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (this.props.pattern !== nextProps.pattern || this.props.value !== nextProps.value || this.props.emptyChar !== nextProps.emptyChar) {
        this.setValue(nextProps.value, nextProps);
      }
    }
  }, {
    key: 'setValue',
    value: function setValue(value, props) {
      var _this2 = this;

      var _getStateFromProps3 = getStateFromProps(value, props),
          _getStateFromProps4 = (0, _slicedToArray3.default)(_getStateFromProps3, 2),
          state = _getStateFromProps4[0],
          processedValue = _getStateFromProps4[1];

      if (processedValue.isValid) {
        this.setState(state, function () {
          return _this2.setSelectionRange(_this2.state.lastIndex);
        });
      } else {
        this.setSelectionRange(this.state.lastIndex);
      }

      return processedValue;
    }
  }, {
    key: 'setSelectionRange',
    value: function setSelectionRange(lastIndex) {
      var input = (0, _getInput2.default)(this);
      if (input === document.activeElement) {
        input.setSelectionRange(lastIndex, lastIndex);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          children = _props.children,
          placeholder = _props.placeholder;
      var value = this.state.value;

      var inputProps = {
        value: value,
        placeholder: placeholder,
        onInput: this.handleInput
      };

      return (0, _renderChild2.default)(children, inputProps, { value: value }, this.registerInput);
    }

    // works better for IE than onChange

  }]);
  return Mask;
}(_react.PureComponent);

Mask.propTypes = {
  getInputElement: _react.PropTypes.func,
  value: _react.PropTypes.string,
  pattern: _react.PropTypes.string.isRequired,
  emptyChar: _react.PropTypes.string
};
Mask.defaultProps = {
  emptyChar: ' ',
  onValidate: function onValidate() {},
  onValuePreUpdate: function onValuePreUpdate(v) {
    return v;
  }
};

var _initialiseProps = function _initialiseProps() {
  var _this3 = this;

  this.registerInput = function (input) {
    return (0, _registerInput2.default)(_this3, input);
  };

  this.handleInput = function (e) {
    var value = e.target.value;

    if (_this3.props.value === undefined) {
      var processedValue = _this3.setValue(value, _this3.props);
      if (!processedValue.isValid) {
        e.preventDefault();
        return;
      }

      e.target.value = processedValue.result;

      if (_this3.props.onUnmaskedValueChange) {
        _this3.props.onUnmaskedValueChange(processedValue.unmaskedValue);
      }
    }

    if (_this3.props.onChange) {
      _this3.props.onChange(e);
    }
  };
};

exports.default = Mask;