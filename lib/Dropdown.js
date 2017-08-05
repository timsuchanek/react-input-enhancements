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

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _findIndex = require('babel-runtime/core-js/array/find-index');

var _findIndex2 = _interopRequireDefault(_findIndex);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _shapes = require('./shapes');

var shapes = _interopRequireWildcard(_shapes);

var _findMatchingTextIndex = require('./utils/findMatchingTextIndex');

var _findMatchingTextIndex2 = _interopRequireDefault(_findMatchingTextIndex);

var _filters = require('./filters');

var filters = _interopRequireWildcard(_filters);

var _InputPopup = require('./InputPopup');

var _InputPopup2 = _interopRequireDefault(_InputPopup);

var _getOptionText = require('./utils/getOptionText');

var _getOptionText2 = _interopRequireDefault(_getOptionText);

var _getOptionLabel = require('./utils/getOptionLabel');

var _getOptionLabel2 = _interopRequireDefault(_getOptionLabel);

var _getOptionValue = require('./utils/getOptionValue');

var _getOptionValue2 = _interopRequireDefault(_getOptionValue);

var _isStatic = require('./utils/isStatic');

var _isStatic2 = _interopRequireDefault(_isStatic);

var _DropdownOption = require('./DropdownOption');

var _DropdownOption2 = _interopRequireDefault(_DropdownOption);

var _createStyling = require('./createStyling');

var _createStyling2 = _interopRequireDefault(_createStyling);

var _deprecated = require('./utils/deprecated');

var _deprecated2 = _interopRequireDefault(_deprecated);

var _getInput = require('./utils/getInput');

var _getInput2 = _interopRequireDefault(_getInput);

var _registerInput = require('./utils/registerInput');

var _registerInput2 = _interopRequireDefault(_registerInput);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getOptionKey(opt, idx) {
  var value = (0, _getOptionValue2.default)(opt);

  return opt === null ? 'option-separator-' + idx : 'option-' + (typeof value === 'string' ? value : (0, _getOptionText2.default)(opt) + idx);
}

function getSiblingIndex(idx, options, next) {
  if (idx === null) {
    idx = next ? -1 : options.length;
  }

  var step = next ? 1 : -1;

  for (var i = 0; i < options.length; i++) {
    var currentIdx = (idx + (i + 1) * step + options.length) % options.length;
    if (options[currentIdx] !== null && !options[currentIdx].disabled) {
      return currentIdx;
    }
  }

  return idx;
}

function getShownOptions(value, options, optionFilters) {
  return optionFilters.reduce(function (o, filter) {
    return filter(o, value);
  }, options);
}

function findOptionIndex(options, option) {
  return (0, _findIndex2.default)(options, function (opt) {
    return opt === option;
  });
}

function getStateFromProps(props) {
  var value = props.value;
  var match = (0, _findMatchingTextIndex2.default)(value, props.options);

  var _match = (0, _slicedToArray3.default)(match, 2),
      selectedIndex = _match[0],
      matchingText = _match[1];

  var shownOptions = getShownOptions(matchingText, props.options, props.optionFilters);
  var highlightedIndex = findOptionIndex(shownOptions, props.options[selectedIndex]);

  return {
    value: matchingText || null,
    isActive: false,
    listShown: false,
    selectedIndex: selectedIndex,
    highlightedIndex: highlightedIndex,
    shownOptions: shownOptions
  };
}

var Dropdown = function (_PureComponent) {
  (0, _inherits3.default)(Dropdown, _PureComponent);

  function Dropdown(props) {
    (0, _classCallCheck3.default)(this, Dropdown);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Dropdown.__proto__ || (0, _getPrototypeOf2.default)(Dropdown)).call(this, props));

    _this.registerInput = function (input) {
      return (0, _registerInput2.default)(_this, input);
    };

    _this.renderPopup = function (styling, isActive, popupShown) {
      var _this$props = _this.props,
          onRenderList = _this$props.onRenderList,
          onRenderListHeader = _this$props.onRenderListHeader,
          options = _this$props.options;
      var shownOptions = _this.state.shownOptions;


      return onRenderList(styling, isActive, popupShown, shownOptions.map(_this.renderOption), onRenderListHeader(options.length, shownOptions.length, shownOptions.filter(_isStatic2.default).length));
    };

    _this.renderOption = function (opt, idx) {
      var onRenderOption = _this.props.onRenderOption;

      var highlighted = idx === _this.state.highlightedIndex;
      var disabled = opt && opt.disabled;

      return _react2.default.createElement(
        _DropdownOption2.default,
        {
          key: getOptionKey(opt, idx),
          onMouseDown: _this.handleOptionClick.bind(_this, idx),
          highlighted: highlighted
        },
        onRenderOption(_this.styling, opt, highlighted, disabled)
      );
    };

    _this.handleChange = function (e) {
      var _this$props2 = _this.props,
          options = _this$props2.options,
          optionFilters = _this$props2.optionFilters;

      var value = e.target.value;

      _this.setState({ value: value });
      _this.updateHighlightedIndex(value, options, optionFilters);

      if (_this.props.onChange) {
        _this.props.onChange(e);
      }
    };

    _this.handleKeyDown = function (e) {
      var keyMap = {
        ArrowUp: _this.handleArrowUpKeyDown,
        ArrowDown: _this.handleArrowDownKeyDown,
        Enter: _this.handleEnterKeyDown
      };

      if (keyMap[e.key]) {
        keyMap[e.key](e);
      }

      if (_this.props.onKeyDown) {
        _this.props.onKeyDown(e);
      }
    };

    _this.handleArrowUpKeyDown = function (e) {
      var _this$state = _this.state,
          highlightedIndex = _this$state.highlightedIndex,
          shownOptions = _this$state.shownOptions;


      e.preventDefault();

      _this.setState({
        highlightedIndex: getSiblingIndex(highlightedIndex, shownOptions, false)
      });
    };

    _this.handleArrowDownKeyDown = function (e) {
      var _this$state2 = _this.state,
          highlightedIndex = _this$state2.highlightedIndex,
          shownOptions = _this$state2.shownOptions;


      e.preventDefault();

      _this.setState({
        highlightedIndex: getSiblingIndex(highlightedIndex, shownOptions, true)
      });
    };

    _this.handleEnterKeyDown = function () {
      var _this$state3 = _this.state,
          highlightedIndex = _this$state3.highlightedIndex,
          shownOptions = _this$state3.shownOptions;

      var option = shownOptions[highlightedIndex];

      setTimeout(function () {
        _this.selectOption(findOptionIndex(_this.props.options, option), true);
        (0, _getInput2.default)(_this).blur();
      });
    };

    _this.handleIsActiveChange = function (isActive) {
      _this.setState({ isActive: isActive });
    };

    _this.handlePopupShownChange = function (popupShown) {
      _this.setState({ listShown: popupShown });
    };

    _this.state = getStateFromProps(props);
    _this.styling = (0, _createStyling2.default)(props.theme, props.invertTheme);

    if (typeof props.onValueChange !== 'undefined') {
      (0, _deprecated2.default)('`onValueChange` is deprecated, please use `onSelect` instead');
    }
    return _this;
  }

  (0, _createClass3.default)(Dropdown, [{
    key: 'componentWillUpdate',
    value: function componentWillUpdate(nextProps, nextState) {
      var options = nextProps.options,
          optionFilters = nextProps.optionFilters;


      if (nextState.listShown !== this.state.listShown) {
        if (typeof this.props.onListToggle === 'function') {
          this.props.onListToggle(nextState.listShown);
        }
      }

      if (nextProps.value && nextState.value === null || this.props.value !== nextProps.value) {
        var state = getStateFromProps(nextProps);

        if (state.value !== this.state.value) {
          this.setState(state);
        }
      } else if (this.props.options !== options || this.props.optionFilters !== optionFilters) {
        var _updateHighlightedInd = this.updateHighlightedIndex(nextState.value, options, optionFilters),
            _updateHighlightedInd2 = (0, _slicedToArray3.default)(_updateHighlightedInd, 2),
            highlightedIndex = _updateHighlightedInd2[0],
            shownOptions = _updateHighlightedInd2[1];

        var selectedIndex = findOptionIndex(options, shownOptions[highlightedIndex]);

        this.setState({ selectedIndex: selectedIndex });

        var _state = getStateFromProps(nextProps);

        if (_state.value !== this.state.value && !nextState.isActive) {
          this.setState(_state);
        }
      } else if (this.state.isActive && !nextState.isActive) {
        this.setState({ value: (0, _getOptionText2.default)(nextProps.options[nextState.selectedIndex]) });
      }
    }
  }, {
    key: 'updateHighlightedIndex',
    value: function updateHighlightedIndex(value, options, optionFilters) {
      var shownOptions = getShownOptions(value, options, optionFilters);
      var match = (0, _findMatchingTextIndex2.default)(value, shownOptions, true);

      var _match2 = (0, _slicedToArray3.default)(match, 1),
          highlightedIndex = _match2[0];

      this.setState({ highlightedIndex: highlightedIndex, shownOptions: shownOptions });

      return [highlightedIndex, shownOptions];
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          dropdownProps = _props.dropdownProps,
          children = _props.children;


      var value = this.state.value === null ? '' : this.state.value;

      return _react2.default.createElement(
        _InputPopup2.default,
        {
          styling: this.styling,
          value: value,
          customProps: { textValue: value },
          onChange: this.handleChange,
          onKeyDown: this.handleKeyDown,
          inputPopupProps: dropdownProps,
          onRenderPopup: this.renderPopup,
          onIsActiveChange: this.handleIsActiveChange,
          onPopupShownChange: this.handlePopupShownChange,
          popupShown: this.state.listShown,
          isActive: this.state.isActive,
          registerInput: this.registerInput
        },
        children
      );
    }
  }, {
    key: 'handleOptionClick',
    value: function handleOptionClick(idx, e) {
      var _this2 = this;

      var option = this.state.shownOptions[idx];

      if (!option || option.disabled) {
        e.preventDefault();
        return;
      }

      this.setState({
        listShown: false
      }, function () {
        _this2.selectOption(findOptionIndex(_this2.props.options, option), true);
      });
    }
  }, {
    key: 'selectOption',
    value: function selectOption(index, fireOnSelect) {
      var _props2 = this.props,
          options = _props2.options,
          optionFilters = _props2.optionFilters;

      var option = options[index];
      var shownOptions = getShownOptions((0, _getOptionText2.default)(option), options, optionFilters);

      var onSelect = this.props.onSelect || this.props.onValueChange;

      this.setState({
        value: (0, _getOptionText2.default)(option),
        highlightedIndex: findOptionIndex(shownOptions, option),
        selectedIndex: index,
        isActive: false,
        shownOptions: shownOptions
      });
      if (fireOnSelect && onSelect) {
        onSelect((0, _getOptionValue2.default)(option), (0, _getOptionText2.default)(option));
      }
    }
  }]);
  return Dropdown;
}(_react.PureComponent);

Dropdown.propTypes = {
  value: _react.PropTypes.string,
  options: _react.PropTypes.arrayOf(shapes.ITEM_OR_STRING),
  onRenderOption: _react.PropTypes.func,
  onRenderList: _react.PropTypes.func,
  optionFilters: _react.PropTypes.arrayOf(_react.PropTypes.func),
  onListToggle: _react.PropTypes.func
};
Dropdown.defaultProps = {
  onRenderOption: function onRenderOption(styling, opt, highlighted, disabled) {
    return opt !== null ? _react2.default.createElement(
      'div',
      styling('inputEnhancementsOption', highlighted, disabled),
      (0, _getOptionLabel2.default)(opt, highlighted, disabled)
    ) : _react2.default.createElement('div', styling('inputEnhancementsSeparator'));
  },

  onRenderList: function onRenderList(styling, isActive, listShown, children, header) {
    return listShown && _react2.default.createElement(
      'div',
      styling(['inputEnhancementsPopup', 'inputEnhancementsDropdownPopup']),
      header && _react2.default.createElement(
        'div',
        styling('inputEnhancementsListHeader', isActive),
        header
      ),
      _react2.default.createElement(
        'div',
        styling('inputEnhancementsListOptions', isActive),
        children
      )
    );
  },

  onRenderListHeader: function onRenderListHeader(allCount, shownCount, staticCount) {
    if (allCount - staticCount < 20) return null;
    var allItems = allCount - staticCount + ' ' + (allCount - staticCount === 1 ? 'item' : 'items');
    return allCount === shownCount ? allItems + ' found' : shownCount - staticCount + ' of ' + allItems + ' shown';
  },

  dropdownProps: {},

  optionFilters: [filters.filterByMatchingTextWithThreshold(20), filters.sortByMatchingText, filters.limitBy(100), filters.notFoundMessage('No matches found'), filters.filterRedudantSeparators]
};
exports.default = Dropdown;