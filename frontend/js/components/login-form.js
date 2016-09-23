'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var LoginForm = function (_Component) {
    _inherits(LoginForm, _Component);

    function LoginForm(props) {
        _classCallCheck(this, LoginForm);

        var _this = _possibleConstructorReturn(this, (LoginForm.__proto__ || Object.getPrototypeOf(LoginForm)).call(this, props));

        _this.state = {
            email: '',
            password: ''
        };

        _this.submit = _this.submit.bind(_this);
        _this.onEmailChange = _this.onEmailChange.bind(_this);
        _this.onPasswordChange = _this.onPasswordChange.bind(_this);
        return _this;
    }

    _createClass(LoginForm, [{
        key: 'componentDidMount',
        value: function componentDidMount() {}
    }, {
        key: 'submit',
        value: function submit(e) {
            e.preventDefault();

            var onSubmit = this.props.onSubmit;

            onSubmit(this.state);
        }
    }, {
        key: 'onEmailChange',
        value: function onEmailChange(e) {
            this.setState({
                email: e.target.value
            });
        }
    }, {
        key: 'onPasswordChange',
        value: function onPasswordChange(e) {
            this.setState({
                password: e.target.value
            });
        }
    }, {
        key: 'render',
        value: function render() {
            var _state = this.state;
            var email = _state.email;
            var password = _state.password;


            return _react2.default.createElement(
                'div',
                { className: 'login-form panel panel-default' },
                _react2.default.createElement(
                    'div',
                    { className: 'panel-heading' },
                    _react2.default.createElement(
                        'h3',
                        null,
                        'Login'
                    )
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'panel-body' },
                    _react2.default.createElement(
                        'form',
                        { onSubmit: this.submit },
                        _react2.default.createElement(
                            'div',
                            { className: 'form-group' },
                            _react2.default.createElement(
                                'label',
                                { htmlFor: 'email' },
                                'Email address'
                            ),
                            _react2.default.createElement('input', { type: 'email', className: 'form-control', id: 'email', value: email, onChange: this.onEmailChange, placeholder: 'user@email.com', required: true })
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'form-group' },
                            _react2.default.createElement(
                                'label',
                                { htmlFor: 'password' },
                                'Password'
                            ),
                            _react2.default.createElement('input', { type: 'password', className: 'form-control', value: password, onChange: this.onPasswordChange, id: 'password', required: true })
                        ),
                        _react2.default.createElement(
                            'button',
                            { type: 'submit', className: 'btn btn-default' },
                            'Enter'
                        )
                    )
                )
            );
        }
    }]);

    return LoginForm;
}(_react.Component);

LoginForm.propTypes = {
    onSubmit: _react.PropTypes.func.isRequired
};

LoginForm.contextTypes = {
    router: _react2.default.PropTypes.object.isRequired
};

exports.default = LoginForm;