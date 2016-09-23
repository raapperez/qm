'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Popup = function (_React$Component) {
    _inherits(Popup, _React$Component);

    function Popup(props) {
        _classCallCheck(this, Popup);

        var _this = _possibleConstructorReturn(this, (Popup.__proto__ || Object.getPrototypeOf(Popup)).call(this, props));

        _this.state = {
            isVisible: false

        };
        return _this;
    }

    _createClass(Popup, [{
        key: 'show',
        value: function show(state) {
            this.setState(Object.assign({}, state, { isVisible: true }));
        }
    }, {
        key: 'showConfirmation',
        value: function showConfirmation(content) {
            var self = this;

            return new Promise(function (resolve, reject) {

                self.show({
                    title: 'form.confirmation',
                    content: content,
                    isSmall: true,
                    onClose: function onClose() {
                        self.hide();
                        resolve(false);
                    },
                    buttons: [{
                        className: 'negative-btn',
                        children: 'form.buttons.no',
                        onClick: function onClick() {
                            self.hide();
                            resolve(false);
                        }
                    }, {
                        className: 'positive-btn',
                        children: 'form.buttons.yes',
                        onClick: function onClick() {
                            self.hide();
                            resolve(true);
                        }
                    }]
                });
            });
        }
    }, {
        key: 'showDeleteConfirmation',
        value: function showDeleteConfirmation() {
            return this.showConfirmation('popup.confirmDelete');
        }
    }, {
        key: 'showDisableConfirmation',
        value: function showDisableConfirmation() {
            return this.showConfirmation('popup.confirmDisable');
        }
    }, {
        key: 'showRemoveConfirmation',
        value: function showRemoveConfirmation() {
            return this.showConfirmation('popup.confirmRemove');
        }
    }, {
        key: 'showArchiveConfirmation',
        value: function showArchiveConfirmation() {
            return this.showConfirmation('popup.confirmArchive');
        }
    }, {
        key: 'hide',
        value: function hide() {
            this.setState({ isVisible: false });
        }
    }, {
        key: 'render',
        value: function render() {
            var _state = this.state;
            var onClose = _state.onClose;
            var isVisible = _state.isVisible;
            var title = _state.title;
            var content = _state.content;
            var _state$buttons = _state.buttons;
            var buttons = _state$buttons === undefined ? [] : _state$buttons;
            var isSmall = _state.isSmall;


            return _react2.default.createElement(
                'div',
                { className: (0, _classnames2.default)('popup-component', { 'hide': !isVisible }) },
                _react2.default.createElement(
                    'div',
                    { className: (0, _classnames2.default)('panel', { 'small': isSmall }) },
                    onClose ? _react2.default.createElement('a', { className: 'fleet-icon-bt_close close-btn', onClick: onClose }) : null,
                    title ? _react2.default.createElement(
                        'span',
                        { className: 'title' },
                        title
                    ) : null,
                    _react2.default.createElement(
                        'div',
                        { className: 'content' },
                        content
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'footer' },
                        buttons.map(function (_ref) {
                            var children = _ref.children;

                            var rest = _objectWithoutProperties(_ref, ['children']);

                            return _react2.default.createElement(
                                'a',
                                _extends({ key: Math.random() }, rest),
                                children
                            );
                        })
                    )
                )
            );
        }
    }]);

    return Popup;
}(_react2.default.Component);

exports.default = Popup;