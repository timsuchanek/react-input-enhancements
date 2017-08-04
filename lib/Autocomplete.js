'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

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

var _shapes = require('./shapes');

var shapes = _interopRequireWildcard(_shapes);

var _findMatchingTextIndex = require('./utils/findMatchingTextIndex');

var _findMatchingTextIndex2 = _interopRequireDefault(_findMatchingTextIndex);

var _getInput = require('./utils/getInput');

var _getInput2 = _interopRequireDefault(_getInput);

var _registerInput = require('./utils/registerInput');

var _registerInput2 = _interopRequireDefault(_registerInput);

var _renderChild = require('./utils/renderChild');

var _renderChild2 = _interopRequireDefault(_renderChild);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function updateInputSelection(input, start, end) {
  input.setSelectionRange(start, end);
}

function updateInputNode(input, value) {
  input.value = value;
}

function setSelection(input, text, matchingText) {
  if (text === null) {
    updateInputNode(input, null);
  } else {
    updateInputNode(input, matchingText);
    if (text.length !== matchingText.length) {
      updateInputSelection(input, text.length, matchingText.length);
    }
  }
}

var Autocomplete = function (_PureComponent) {
  (0, _inherits3.default)(Autocomplete, _PureComponent);

  function Autocomplete(props) {
    (0, _classCallCheck3.default)(this, Autocomplete);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Autocomplete.__proto__ || (0, _getPrototypeOf2.default)(Autocomplete)).call(this, props));

    _this.registerInput = function (input) {
      return (0, _registerInput2.default)(_this, input);
    };

    _this.handleChange = function (e) {
      var value = e.target.value;

      _this.setValue(value, _this.props.options);

      if (_this.props.onChange) {
        _this.props.onChange(e);
      }
    };

    _this.handleKeyDown = function (e) {
      var keyMap = {
        Backspace: _this.handleBackspaceKeyDown,
        Enter: _this.handleEnterKeyDown
      };

      if (keyMap[e.key]) {
        keyMap[e.key](e);
      }

      if (_this.props.onKeyDown) {
        _this.props.onKeyDown(e);
      }
    };

    _this.handleBackspaceKeyDown = function () {
      var input = (0, _getInput2.default)(_this);
      if (input.selectionStart !== input.selectionEnd && input.selectionEnd === input.value.length && input.selectionStart !== 0) {
        var value = input.value.substr(0, input.selectionStart);
        _this.setValue(value.substr(0, value.length - 1), _this.props.options);
        updateInputNode(input, value);
      }
    };

    _this.handleEnterKeyDown = function () {
      var input = (0, _getInput2.default)(_this);

      setSelection(input, _this.state.matchingText, _this.state.matchingText);
      input.blur();
    };

    _this.state = {
      matchingText: null,
      value: props.value
    };
    return _this;
  }

  (0, _createClass3.default)(Autocomplete, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (this.props.value !== nextProps.value && nextProps.value !== this.state.value) {
        this.setValue(nextProps.value, nextProps.options);
      }
    }
  }, {
    key: 'componentWillUpdate',
    value: function componentWillUpdate(nextProps, nextState) {
      if (this.props.options !== nextProps.options && this.props.value === nextProps.value) {
        var match = (0, _findMatchingTextIndex2.default)(nextState.value, nextProps.options);

        var _match = (0, _slicedToArray3.default)(match, 2),
            matchingText = _match[1];

        this.setState({ matchingText: matchingText });
      }
    }
  }, {
    key: 'setValue',
    value: function setValue(value, options) {
      if (value === this.state.value) {
        return;
      }
      var match = (0, _findMatchingTextIndex2.default)(value, options);

      var _match2 = (0, _slicedToArray3.default)(match, 2),
          matchingText = _match2[1];

      this.setState({ value: value, matchingText: matchingText });
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      var matchingText = this.state.matchingText || '';
      var value = this.state.value || '';

      if (matchingText && value.length !== matchingText.length) {
        var input = (0, _getInput2.default)(this);
        setSelection(input, this.state.value, this.state.matchingText);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var children = this.props.children;
      var _state = this.state,
          matchingText = _state.matchingText,
          value = _state.value;

      var inputProps = {
        value: matchingText || value,
        onKeyDown: this.handleKeyDown,
        onChange: this.handleChange
      };

      return (0, _renderChild2.default)(children, inputProps, { matchingText: matchingText, value: value }, this.registerInput);
    }
  }]);
  return Autocomplete;
}(_react.PureComponent);

Autocomplete.propTypes = {
  getInputElement: _react.PropTypes.func,
  value: _react.PropTypes.string,
  options: _react.PropTypes.arrayOf(shapes.ITEM_OR_STRING).isRequired
};
exports.default = Autocomplete;