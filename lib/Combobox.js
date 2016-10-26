'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

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

var _Autocomplete = require('./Autocomplete');

var _Autocomplete2 = _interopRequireDefault(_Autocomplete);

var _Dropdown = require('./Dropdown');

var _Dropdown2 = _interopRequireDefault(_Dropdown);

var _Autosize = require('./Autosize');

var _Autosize2 = _interopRequireDefault(_Autosize);

var _renderChild = require('./utils/renderChild');

var _renderChild2 = _interopRequireDefault(_renderChild);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CARET_PADDING = 15;

var Combobox = function (_PureComponent) {
  (0, _inherits3.default)(Combobox, _PureComponent);

  function Combobox() {
    (0, _classCallCheck3.default)(this, Combobox);
    return (0, _possibleConstructorReturn3.default)(this, (Combobox.__proto__ || (0, _getPrototypeOf2.default)(Combobox)).apply(this, arguments));
  }

  (0, _createClass3.default)(Combobox, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          autosize = _props.autosize,
          autocomplete = _props.autocomplete,
          children = _props.children,
          props = (0, _objectWithoutProperties3.default)(_props, ['autosize', 'autocomplete', 'children']);


      if (autosize && autocomplete) {
        return this.renderAutosizeAutocompleteDropdown(children, props);
      } else if (autosize) {
        return this.renderAutosizeDropdown(children, props);
      } else if (autocomplete) {
        return this.renderAutocompleteDropdown(children, props);
      } else {
        return this.renderDropdown(children, props);
      }
    }
  }, {
    key: 'renderAutosizeAutocompleteDropdown',
    value: function renderAutosizeAutocompleteDropdown(children, props) {
      return _react2.default.createElement(
        _Dropdown2.default,
        props,
        function (dropdownInputProps, _ref, registerInput) {
          var textValue = _ref.textValue;
          return _react2.default.createElement(
            _Autocomplete2.default,
            {
              value: textValue,
              onChange: dropdownInputProps.onChange,
              onKeyDown: dropdownInputProps.onKeyDown,
              options: props.options,
              registerInput: registerInput,
              getInputComponent: props.getInputComponent
            },
            function (inputProps, _ref2, registerInput) {
              var matchingText = _ref2.matchingText;
              return _react2.default.createElement(
                _Autosize2.default,
                {
                  value: inputProps.value,
                  onChange: inputProps.onChange,
                  defaultWidth: props.defaultWidth,
                  getSizerContainer: props.getSizerContainer,
                  registerInput: registerInput,
                  getInputComponent: props.getInputComponent,
                  padding: CARET_PADDING
                },
                function (autosizeInputProps, _ref3, registerInput) {
                  var width = _ref3.width;
                  return (0, _renderChild2.default)(children, (0, _extends3.default)({}, dropdownInputProps, inputProps, autosizeInputProps), { matchingText: matchingText, width: width }, registerInput);
                }
              );
            }
          );
        }
      );
    }
  }, {
    key: 'renderAutosizeDropdown',
    value: function renderAutosizeDropdown(children, props) {
      return _react2.default.createElement(
        _Dropdown2.default,
        props,
        function (inputProps, _ref4, registerInput) {
          var textValue = _ref4.textValue;
          return _react2.default.createElement(
            _Autosize2.default,
            {
              value: textValue,
              onChange: inputProps.onChange,
              defaultWidth: props.defaultWidth,
              getSizerContainer: props.getSizerContainer,
              registerInput: registerInput,
              getInputComponent: props.getInputComponent,
              padding: CARET_PADDING
            },
            function (autosizeInputProps, _ref5, registerInput) {
              var width = _ref5.width;
              return (0, _renderChild2.default)(children, (0, _extends3.default)({}, inputProps, autosizeInputProps), { width: width }, registerInput);
            }
          );
        }
      );
    }
  }, {
    key: 'renderAutocompleteDropdown',
    value: function renderAutocompleteDropdown(children, props) {
      return _react2.default.createElement(
        _Dropdown2.default,
        props,
        function (dropdownInputProps, _ref6, registerInput) {
          var textValue = _ref6.textValue;
          return _react2.default.createElement(
            _Autocomplete2.default,
            {
              value: textValue,
              onChange: dropdownInputProps.onChange,
              onKeyDown: dropdownInputProps.onKeyDown,
              options: props.options,
              registerInput: registerInput,
              getInputComponent: props.getInputComponent
            },
            function (inputProps, _ref7, registerInput) {
              var matchingText = _ref7.matchingText;
              return (0, _renderChild2.default)(children, (0, _extends3.default)({}, dropdownInputProps, inputProps), { matchingText: matchingText }, registerInput);
            }
          );
        }
      );
    }
  }, {
    key: 'renderDropdown',
    value: function renderDropdown(children, props) {
      return _react2.default.createElement(
        _Dropdown2.default,
        props,
        function (inputProps, otherProps, registerInput) {
          return (0, _renderChild2.default)(children, inputProps, otherProps, registerInput);
        }
      );
    }
  }]);
  return Combobox;
}(_react.PureComponent);

Combobox.propTypes = {
  autosize: _react.PropTypes.bool,
  autocomplete: _react.PropTypes.bool
};
exports.default = Combobox;