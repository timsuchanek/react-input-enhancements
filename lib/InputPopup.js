'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

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

var _renderChild = require('./utils/renderChild');

var _renderChild2 = _interopRequireDefault(_renderChild);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var InputPopup = function (_PureComponent) {
  (0, _inherits3.default)(InputPopup, _PureComponent);

  function InputPopup(props) {
    (0, _classCallCheck3.default)(this, InputPopup);

    var _this = (0, _possibleConstructorReturn3.default)(this, (InputPopup.__proto__ || (0, _getPrototypeOf2.default)(InputPopup)).call(this, props));

    _this.handleMouseEnter = function (e) {
      _this.setState({ hover: true });

      if (_this.props.onInputMouseEnter) {
        _this.props.onInputMouseEnter(e);
      }
    };

    _this.handleMouseLeave = function (e) {
      _this.setState({ hover: false });

      if (_this.props.onInputMouseLeave) {
        _this.props.onInputMouseLeave(e);
      }
    };

    _this.handleKeyDown = function (e) {
      var keyMap = {
        Escape: _this.handleEscapeKeyDown,
        Enter: _this.handleEnterKeyDown
      };

      if (keyMap[e.key]) {
        keyMap[e.key](e);
      } else {
        _this.setState({
          popupShown: true
        });
      }

      if (_this.props.onKeyDown) {
        _this.props.onKeyDown(e);
      }
    };

    _this.handleEscapeKeyDown = function () {
      _this.setState({
        popupShown: false
      });
    };

    _this.handleEnterKeyDown = function () {
      _this.setState({
        popupShown: false
      });
    };

    _this.handleFocus = function (e) {
      if (_this.blurTimeout) {
        clearTimeout(_this.blurTimeout);
        _this.blurTimeout = null;
        return;
      }

      _this.setState({
        isActive: true,
        popupShown: true
      });

      if (_this.props.onFocus) {
        _this.props.onFocus(e);
      }
    };

    _this.handleBlur = function (e) {
      _this.blurTimeout = setTimeout(function () {
        if (!_this.blurForbidden) {
          _this.setState({
            isActive: false,
            popupShown: false
          });
          _this.blurTimeout = null;
        }
      }, 20);

      if (_this.props.onBlur) {
        _this.props.onBlur(e);
      }
    };

    _this.handleMouseDown = function (e) {
      _this.blurForbidden = true;
      setTimeout(function () {
        _this.blurForbidden = false;
      }, 50);
    };

    _this.state = {
      isActive: props.isActive,
      popupShown: props.popupShown,
      hover: false
    };
    return _this;
  }

  (0, _createClass3.default)(InputPopup, [{
    key: 'renderCaretSVG',
    value: function renderCaretSVG(styling, isActive, hovered, popupShown) {
      var svgStyling = styling('inputEnhancementsCaretSvg', isActive, hovered, popupShown);
      return popupShown ? _react2.default.createElement(
        'svg',
        (0, _extends3.default)({}, svgStyling, { width: '10', height: '5', fill: 'currentColor' }),
        _react2.default.createElement('path', { d: 'M0 5 H10 L5 0 z' })
      ) : _react2.default.createElement(
        'svg',
        (0, _extends3.default)({}, svgStyling, { width: '10', height: '5', fill: 'currentColor' }),
        _react2.default.createElement('path', { d: 'M0 0 H10 L5 5 z' })
      );
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      if (this.blurTimeout) {
        clearTimeout(this.blurTimeout);
      }
    }
  }, {
    key: 'componentWillUpdate',
    value: function componentWillUpdate(nextProps) {
      if (nextProps.popupShown !== this.props.popupShown) {
        this.setState({ popupShown: nextProps.popupShown });
      }

      if (nextProps.isActive !== this.props.isActive) {
        this.setState({ isActive: nextProps.isActive });
      }
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps, prevState) {
      if (prevState.isActive !== this.state.isActive && this.props.onIsActiveChange) {
        this.props.onIsActiveChange(this.state.isActive);
      }

      if (prevState.popupShown !== this.state.popupShown && this.props.onPopupShownChange) {
        this.props.onPopupShownChange(this.state.popupShown);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          onRenderCaret = _props.onRenderCaret,
          onRenderPopup = _props.onRenderPopup,
          inputPopupProps = _props.inputPopupProps,
          styling = _props.styling,
          restProps = (0, _objectWithoutProperties3.default)(_props, ['onRenderCaret', 'onRenderPopup', 'inputPopupProps', 'styling']);
      var _state = this.state,
          isActive = _state.isActive,
          hover = _state.hover,
          popupShown = _state.popupShown;


      var caret = this.renderCaretSVG(styling, isActive, hover, popupShown);

      return _react2.default.createElement(
        'div',
        (0, _extends3.default)({
          className: 'input-popup'
        }, styling('inputEnhancementsPopupWrapper'), {
          onFocus: this.handleFocus,
          onBlur: this.handleBlur,
          onMouseDown: this.handleMouseDown
        }, inputPopupProps),
        this.renderInput(styling, restProps),
        onRenderCaret(styling, isActive, hover, caret),
        onRenderPopup(styling, isActive, popupShown)
      );
    }
  }, {
    key: 'renderInput',
    value: function renderInput(styling, restProps) {
      var children = restProps.children,
          onInputFocus = restProps.onInputFocus,
          onInputBlur = restProps.onInputBlur,
          customProps = restProps.customProps,
          onChange = restProps.onChange,
          onInput = restProps.onInput,
          value = restProps.value,
          registerInput = restProps.registerInput,
          placeholder = restProps.placeholder;
      var _state2 = this.state,
          isActive = _state2.isActive,
          hover = _state2.hover,
          popupShown = _state2.popupShown;


      var inputProps = (0, _extends3.default)({}, styling('inputEnhancementsInput', isActive, hover, popupShown), {
        value: value,
        placeholder: placeholder,
        onFocus: onInputFocus,
        onBlur: onInputBlur,
        onChange: onChange,
        onInput: onInput,
        onMouseEnter: this.handleMouseEnter,
        onMouseLeave: this.handleMouseLeave,
        onKeyDown: this.handleKeyDown
      });

      return (0, _renderChild2.default)(children, inputProps, customProps, registerInput);
    }
  }]);
  return InputPopup;
}(_react.PureComponent);

InputPopup.propTypes = {
  onRenderCaret: _react.PropTypes.func,
  onRenderPopup: _react.PropTypes.func,
  onIsActiveChange: _react.PropTypes.func,
  onPopupShownChange: _react.PropTypes.func,
  registerInput: _react.PropTypes.func
};
InputPopup.defaultProps = {
  onRenderCaret: function onRenderCaret(styling, isActive, isHovered, children) {
    return _react2.default.createElement(
      'div',
      styling('inputEnhancementsCaret', isActive, isHovered),
      children
    );
  },

  onRenderPopup: function onRenderPopup() {},

  inputPopupProps: {}
};
exports.default = InputPopup;