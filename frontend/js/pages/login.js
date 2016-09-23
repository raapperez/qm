'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _loginForm = require('../components/login-form');

var _loginForm2 = _interopRequireDefault(_loginForm);

var _api = require('../services/api');

var _api2 = _interopRequireDefault(_api);

var _http = require('../services/http');

var _http2 = _interopRequireDefault(_http);

var _user = require('../services/user');

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var LoginPage = function (_Component) {
    _inherits(LoginPage, _Component);

    function LoginPage(props) {
        _classCallCheck(this, LoginPage);

        var _this = _possibleConstructorReturn(this, (LoginPage.__proto__ || Object.getPrototypeOf(LoginPage)).call(this, props));

        _this.onSubmit = _this.onSubmit.bind(_this);
        return _this;
    }

    _createClass(LoginPage, [{
        key: 'onSubmit',
        value: function onSubmit(formData) {
            var router = this.context.router;
            var email = formData.email;
            var password = formData.password;


            var api = new _api2.default(new _http2.default(fetch));

            api.login(email, password).then(function (data) {
                var token = data.token;


                if (token) {
                    _user2.default.setToken(token);
                }

                router.push('/topics');
            }).catch(function (err) {
                console.log(err);
            });
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                { className: 'login-page' },
                _react2.default.createElement(
                    'h1',
                    { className: 'title' },
                    'Qm Forum'
                ),
                _react2.default.createElement(_loginForm2.default, { onSubmit: this.onSubmit })
            );
        }
    }]);

    return LoginPage;
}(_react.Component);

LoginPage.contextTypes = {
    router: _react.PropTypes.object.isRequired
};

exports.default = LoginPage;