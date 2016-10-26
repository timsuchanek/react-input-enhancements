'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

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

var _Mask = require('./Mask');

var _Mask2 = _interopRequireDefault(_Mask);

var _InputPopup = require('./InputPopup');

var _InputPopup2 = _interopRequireDefault(_InputPopup);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _reactDayPickerThemeable = require('react-day-picker-themeable');

var _reactDayPickerThemeable2 = _interopRequireDefault(_reactDayPickerThemeable);

var _MomentLocaleUtils = require('react-day-picker-themeable/lib/addons/MomentLocaleUtils');

var _MomentLocaleUtils2 = _interopRequireDefault(_MomentLocaleUtils);

var _createStyling = require('./createStyling');

var _createStyling2 = _interopRequireDefault(_createStyling);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var VALIDATORS = {
  YYYY: function YYYY() {
    return false;
  },
  MM: function MM(val) {
    return parseInt(val, 10) > 12 ? '12' : false;
  },
  ddd: function ddd() {},
  DD: function DD(val) {
    return parseInt(val, 10) > 31 ? '31' : false;
  }
};

function getStateFromProps(value, props) {
  var date = (0, _moment2.default)(value === null ? undefined : value, value ? props.pattern : '', props.locale);

  return {
    date: date.isValid() ? date : (0, _moment2.default)(undefined, '', props.locale),
    value: value,
    pattern: props.pattern.replace(/ddd/g, '\\d\\d\\d').replace(/[DMY]/g, '0')
  };
}

var DatePicker = function (_PureComponent) {
  (0, _inherits3.default)(DatePicker, _PureComponent);

  function DatePicker(props) {
    (0, _classCallCheck3.default)(this, DatePicker);

    var _this = (0, _possibleConstructorReturn3.default)(this, (DatePicker.__proto__ || (0, _getPrototypeOf2.default)(DatePicker)).call(this, props));

    _this.handlePopupShownChange = function (popupShown) {
      _this.setState({ popupShown: popupShown });
    };

    _this.handleIsActiveChange = function (isActive) {
      _this.setState({ isActive: isActive });
    };

    _this.handleChange = function (e) {
      _this.setState(getStateFromProps(e.target.value, _this.props));

      if (_this.props.onInputChange) {
        _this.props.onInputChange(e);
      }
    };

    _this.handleValuePreUpdate = function (value) {
      if (_this.props.onValuePreUpdate) {
        value = _this.props.onValuePreUpdate(value);
      }
      var localeData = _moment2.default.localeData(_this.props.locale);
      var days = localeData._weekdaysShort;

      return value.replace(RegExp('(' + days.join('|').replace('.', '\\.') + ')', 'g'), 'ddd');
    };

    _this.handleValueUpdate = function (value) {
      var localeData = _moment2.default.localeData(_this.props.locale);
      var state = getStateFromProps(value.replace(/ddd/g, localeData.weekdaysShort(_this.state.date)), _this.props);

      return value.replace(/ddd/g, localeData.weekdaysShort(state.date));
    };

    _this.renderPopup = function (styling, isActive, popupShown) {
      var _this$props = _this.props,
          onRenderCalendar = _this$props.onRenderCalendar,
          locale = _this$props.locale;


      return onRenderCalendar(styling, _this.state.date, isActive, popupShown, _this.handleSelect, locale);
    };

    _this.handleSelect = function (date) {
      var localeMoment = (0, _moment2.default)(date);
      localeMoment.locale(_this.props.locale);
      var value = localeMoment.format(_this.props.pattern);
      _this.setState((0, _extends3.default)({
        popupShown: false,
        isActive: false
      }, getStateFromProps(value, _this.props)));
      _this.props.onChange && _this.props.onChange(date);
    };

    _this.handleValidate = function (value, processedValue) {
      var _this$props2 = _this.props,
          pattern = _this$props2.pattern,
          emptyChar = _this$props2.emptyChar;

      var re = RegExp(emptyChar, 'g');
      var result = processedValue.result;

      (0, _keys2.default)(VALIDATORS).forEach(function (format) {
        var pos = pattern.indexOf(format);
        if (pos !== -1) {
          var val = processedValue.result.substr(pos, format.length).replace(re, '');
          val = VALIDATORS[format](val);
          if (val) {
            result = result.substr(0, pos) + val + result.substr(pos + val.length);
          }
        }
      });

      return (0, _extends3.default)({}, processedValue, {
        result: _this.handleValueUpdate(result)
      });
    };

    _this.state = getStateFromProps(props.value, props);
    _this.styling = (0, _createStyling2.default)(props.theme, props.invertTheme);
    return _this;
  }

  (0, _createClass3.default)(DatePicker, [{
    key: 'componentWillUpdate',
    value: function componentWillUpdate(nextProps, nextState) {
      var value = nextProps.value !== this.props.value ? nextProps.value : nextState.value;
      var state = getStateFromProps(value, nextProps);

      if (state.value !== nextState.value) {
        this.setState(getStateFromProps(value, nextProps));
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          children = _props.children,
          placeholder = _props.placeholder,
          registerInput = _props.registerInput,
          getInputElement = _props.getInputElement;


      var child = function child(maskProps, otherProps, registerInput) {
        return typeof children === 'function' ? children(maskProps, otherProps, registerInput) : _react2.default.cloneElement(_react.Children.only(children), (0, _extends3.default)({}, maskProps, _react.Children.only(children).props));
      };

      return _react2.default.createElement(
        _Mask2.default,
        {
          pattern: this.state.pattern,
          value: this.state.value,
          onValidate: this.handleValidate,
          onChange: this.handleChange,
          placeholder: placeholder,
          onValuePreUpdate: this.handleValuePreUpdate,
          registerInput: registerInput,
          getInputElement: getInputElement
        },
        function (maskProps, otherProps, registerInput) {
          return _react2.default.createElement(
            _InputPopup2.default,
            (0, _extends3.default)({}, maskProps, {
              styling: _this2.styling,
              onRenderPopup: _this2.renderPopup,
              onPopupShownChange: _this2.handlePopupShownChange,
              onIsActiveChange: _this2.handleIsActiveChange,
              popupShown: _this2.state.popupShown,
              isActive: _this2.state.isActive,
              registerInput: registerInput,
              customProps: otherProps
            }),
            function (inputProps, otherProps, registerInput) {
              return child(inputProps, otherProps, registerInput);
            }
          );
        }
      );
    }
  }]);
  return DatePicker;
}(_react.PureComponent);

DatePicker.propTypes = {
  pattern: _react.PropTypes.string,
  placeholder: _react.PropTypes.string,
  onRenderCalendar: _react.PropTypes.func,
  getInputElement: _react.PropTypes.func,
  locale: _react.PropTypes.string
};
DatePicker.defaultProps = {
  pattern: 'ddd DD/MM/YYYY',
  placeholder: (0, _moment2.default)().format('ddd DD/MM/YYYY'),
  onRenderCalendar: function onRenderCalendar(styling, date, isActive, popupShown, onSelect, locale) {
    return popupShown && _react2.default.createElement(
      'div',
      styling(['inputEnhancementsPopup', 'inputEnhancementsDatePickerPopup']),
      _react2.default.createElement(_reactDayPickerThemeable2.default, {
        theme: styling(null),
        selectedDays: function selectedDays(day) {
          return _reactDayPickerThemeable.DateUtils.isSameDay(date.toDate(), day);
        },
        onDayClick: function onDayClick(e, day) {
          return onSelect((0, _moment2.default)(day, null, locale));
        },
        locale: locale,
        localeUtils: _MomentLocaleUtils2.default
      })
    );
  },
  locale: 'en'
};
exports.default = DatePicker;