'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _entries = require('babel-runtime/core-js/object/entries');

var _entries2 = _interopRequireDefault(_entries);

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

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

require('./utils/getComputedStyle');

var _getInput = require('./utils/getInput');

var _getInput2 = _interopRequireDefault(_getInput);

var _registerInput = require('./utils/registerInput');

var _registerInput2 = _interopRequireDefault(_registerInput);

var _renderChild = require('./utils/renderChild');

var _renderChild2 = _interopRequireDefault(_renderChild);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ALLOWED_CSS_PROPS = ['direction', 'fontFamily', 'fontKerning', 'fontSize', 'fontSizeAdjust', 'fontStyle', 'fontWeight', 'letterSpacing', 'lineHeight', 'padding', 'textAlign', 'textDecoration', 'textTransform', 'wordSpacing'];

var sizersListEl = null;
var sizerContainerStyle = {
  position: 'absolute',
  visibility: 'hidden',
  whiteSpace: 'nowrap',
  width: 'auto',
  minWidth: 'initial',
  maxWidth: 'initial',
  zIndex: 10000,
  left: -1000,
  top: 100
};

var Autosize = function (_PureComponent) {
  (0, _inherits3.default)(Autosize, _PureComponent);

  function Autosize(props) {
    (0, _classCallCheck3.default)(this, Autosize);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Autosize.__proto__ || (0, _getPrototypeOf2.default)(Autosize)).call(this, props));

    _this.registerInput = function (input) {
      return (0, _registerInput2.default)(_this, input);
    };

    _this.handleWindownResize = function () {
      _this.updateWidth(_this.state.value || _this.props.placeholder, _this.state.defaultWidth, _this.props.padding);
    };

    _this.handleChange = function (e) {
      var value = e.target.value;

      if (_this.props.value === undefined) {
        _this.setState({ value: value });
      }

      if (_this.props.onChange) {
        _this.props.onChange(e);
      }
    };

    _this.state = {
      width: props.defaultWidth,
      defaultWidth: props.defaultWidth,
      value: props.value
    };
    return _this;
  }

  (0, _createClass3.default)(Autosize, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      if (typeof document === 'undefined') {
        return;
      }

      if (!sizersListEl) {
        sizersListEl = document.createElement('div');
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = (0, _getIterator3.default)((0, _entries2.default)(sizerContainerStyle)), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var _step$value = (0, _slicedToArray3.default)(_step.value, 2),
                key = _step$value[0],
                val = _step$value[1];

            sizersListEl.style[key] = val;
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator.return) {
              _iterator.return();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }

        sizersListEl.style.whiteSpace = 'pre';
        this.props.getSizerContainer().appendChild(sizersListEl);
      }

      this.sizerEl = document.createElement('span');
      sizersListEl.appendChild(this.sizerEl);

      window.addEventListener('resize', this.handleWindownResize);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      sizersListEl.removeChild(this.sizerEl);
      if (sizersListEl.childNodes.length === 0) {
        this.props.getSizerContainer().removeChild(sizersListEl);
        sizersListEl = null;
      }
      this.sizerEl = null;

      window.removeEventListener('resize', this.handleWindownResize);
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      if (typeof window === 'undefined') {
        return;
      }
      var defaultWidth = this.props.defaultWidth;

      if (defaultWidth === undefined) {
        var input = (0, _getInput2.default)(this);
        defaultWidth = input.offsetWidth;
        this.setDefaultWidth(defaultWidth);
      }

      this.updateWidth(this.props.value || this.props.placeholder, defaultWidth, this.props.padding);
    }
  }, {
    key: 'setDefaultWidth',
    value: function setDefaultWidth(defaultWidth) {
      this.setState({ defaultWidth: defaultWidth });
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (nextProps.value !== this.props.value) {
        this.setState({ value: nextProps.value });
      }
    }
  }, {
    key: 'componentWillUpdate',
    value: function componentWillUpdate(nextProps, nextState) {
      if (nextState.value !== this.state.value || nextProps.padding !== this.props.padding) {
        this.updateWidth(nextState.value || nextProps.placeholder, nextState.defaultWidth, nextProps.padding);
      }
    }
  }, {
    key: 'updateWidth',
    value: function updateWidth(value, defaultWidth, padding) {
      var input = (0, _getInput2.default)(this);
      var inputStyle = window.getComputedStyle(input, null);

      if (!value) {
        this.setState({
          width: defaultWidth
        });
        return;
      }

      for (var key in inputStyle) {
        if (ALLOWED_CSS_PROPS.indexOf(key) !== -1) {
          this.sizerEl.style[key] = inputStyle[key];
        }
      }

      this.sizerEl.innerText = value;

      this.setState({
        width: Math.max(this.sizerEl.offsetWidth + padding + 1, defaultWidth)
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          children = _props.children,
          style = _props.style,
          placeholder = _props.placeholder,
          value = _props.value;
      var width = this.state.width;

      var inputProps = {
        style: (0, _extends3.default)({}, style || {}, width ? { width: width } : {}),
        placeholder: placeholder,
        value: value,
        onChange: this.handleChange
      };

      return (0, _renderChild2.default)(children, inputProps, { width: width }, this.registerInput);
    }
  }]);
  return Autosize;
}(_react.PureComponent);

Autosize.propTypes = {
  value: _react.PropTypes.string,
  defaultWidth: _react.PropTypes.number,
  getInputElement: _react.PropTypes.func,
  getSizerContainer: _react.PropTypes.func,
  padding: _react.PropTypes.number
};
Autosize.defaultProps = {
  getSizerContainer: function getSizerContainer() {
    return document.body;
  },
  padding: 0
};
exports.default = Autosize;