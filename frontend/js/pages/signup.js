'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _signupForm = require('../components/signup-form');

var _signupForm2 = _interopRequireDefault(_signupForm);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SignupPage = function (_Component) {
    _inherits(SignupPage, _Component);

    function SignupPage(props) {
        _classCallCheck(this, SignupPage);

        var _this = _possibleConstructorReturn(this, (SignupPage.__proto__ || Object.getPrototypeOf(SignupPage)).call(this, props));

        _this.onSubmit = _this.onSubmit.bind(_this);
        _this.onLogin = _this.onLogin.bind(_this);
        return _this;
    }

    _createClass(SignupPage, [{
        key: 'onSubmit',
        value: function onSubmit() {}
    }, {
        key: 'onLogin',
        value: function onLogin() {
            var router = this.context.router;

            router.push('/login');
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                { className: 'signup-page' },
                _react2.default.createElement(
                    'h1',
                    { className: 'title' },
                    'Qm Forum'
                ),
                _react2.default.createElement(_signupForm2.default, { onSubmit: this.onSubmit, onLogin: this.onLogin })
            );
        }
    }]);

    return SignupPage;
}(_react.Component);

SignupPage.contextTypes = {
    router: _react.PropTypes.object.isRequired
};

exports.default = SignupPage;