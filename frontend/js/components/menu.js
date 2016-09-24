'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

var _reactRedux = require('react-redux');

var _user = require('../services/user');

var _user2 = _interopRequireDefault(_user);

var _qmActions = require('../actions/qm-actions');

var actions = _interopRequireWildcard(_qmActions);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Menu = function (_Component) {
    _inherits(Menu, _Component);

    function Menu(props) {
        _classCallCheck(this, Menu);

        var _this = _possibleConstructorReturn(this, (Menu.__proto__ || Object.getPrototypeOf(Menu)).call(this, props));

        _this.state = {
            isShowingUserMenu: false
        };

        _this.logout = _this.logout.bind(_this);
        _this.toogleUserMenu = _this.toogleUserMenu.bind(_this);

        return _this;
    }

    _createClass(Menu, [{
        key: 'logout',
        value: function logout() {
            var router = this.context.router;
            var logout = this.props.logout;


            _user2.default.erase();
            logout();
            router.push('/login');
        }
    }, {
        key: 'toogleUserMenu',
        value: function toogleUserMenu(e) {
            e.preventDefault();
            var isShowingUserMenu = this.state.isShowingUserMenu;


            this.setState({
                isShowingUserMenu: !isShowingUserMenu
            });
        }
    }, {
        key: 'render',
        value: function render() {
            var user = this.props.user;
            var isShowingUserMenu = this.state.isShowingUserMenu;


            return _react2.default.createElement(
                'nav',
                { className: 'menu-component navbar navbar-default navbar-static-top navbar-inverse no-select' },
                _react2.default.createElement(
                    'span',
                    { className: 'navbar-brand' },
                    'Qm Forum'
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'collapse navbar-collapse' },
                    _react2.default.createElement(
                        'ul',
                        { className: 'nav navbar-nav' },
                        _react2.default.createElement(
                            'li',
                            null,
                            _react2.default.createElement(
                                _reactRouter.Link,
                                { to: '/topics', activeClassName: 'active' },
                                'Topics'
                            )
                        ),
                        _react2.default.createElement(
                            'li',
                            null,
                            _react2.default.createElement(
                                _reactRouter.Link,
                                { to: '/topics/create', activeClassName: 'active' },
                                'New topic'
                            )
                        )
                    )
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'user-menu' },
                    _react2.default.createElement(
                        'ul',
                        { className: 'nav navbar-nav' },
                        _react2.default.createElement(
                            'li',
                            { className: 'user-drop dropdown' },
                            _react2.default.createElement(
                                'a',
                                { className: 'dropdown-toggle', onClick: this.toogleUserMenu },
                                !user ? 'Loading...' : user.firstName + ' ' + user.lastName,
                                ' ',
                                _react2.default.createElement('span', { className: 'caret' })
                            ),
                            _react2.default.createElement(
                                'ul',
                                { className: 'dropdown-menu', style: { display: isShowingUserMenu ? 'block' : 'none' } },
                                _react2.default.createElement(
                                    'li',
                                    null,
                                    _react2.default.createElement(
                                        'a',
                                        { onClick: this.logout },
                                        'Logout'
                                    )
                                )
                            )
                        )
                    )
                )
            );
        }
    }]);

    return Menu;
}(_react.Component);

Menu.contextTypes = {
    router: _react.PropTypes.object.isRequired
};

Menu.propTypes = {
    logout: _react.PropTypes.func.isRequired,
    user: _react.PropTypes.object
};

exports.default = (0, _reactRedux.connect)(function (state) {
    return { user: state.user };
}, function (dispatch) {
    return {
        logout: function logout() {
            dispatch(actions.userLogout());
        }
    };
}, null, { pure: false })(Menu);