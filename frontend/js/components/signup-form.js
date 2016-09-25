'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.validate = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reduxForm = require('redux-form');

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var renderField = function renderField(_ref) {
    var input = _ref.input;
    var placeholder = _ref.placeholder;
    var min = _ref.min;
    var type = _ref.type;
    var className = _ref.className;
    var _ref$meta = _ref.meta;
    var touched = _ref$meta.touched;
    var error = _ref$meta.error;
    return _react2.default.createElement('input', _extends({}, input, { placeholder: placeholder, min: min, type: type, className: (0, _classnames2.default)(className, { error: touched && error }) }));
};

var SignupForm = function (_Component) {
    _inherits(SignupForm, _Component);

    function SignupForm(props) {
        _classCallCheck(this, SignupForm);

        var _this = _possibleConstructorReturn(this, (SignupForm.__proto__ || Object.getPrototypeOf(SignupForm)).call(this, props));

        _this.onLogin = _this.onLogin.bind(_this);
        return _this;
    }

    _createClass(SignupForm, [{
        key: 'onLogin',
        value: function onLogin(e) {
            e.preventDefault();

            var onLogin = this.props.onLogin;

            onLogin();
        }
    }, {
        key: 'render',
        value: function render() {
            var _props = this.props;
            var handleSubmit = _props.handleSubmit;
            var submitting = _props.submitting;
            var onSubmit = _props.onSubmit;
            var error = _props.error;


            return _react2.default.createElement(
                'div',
                { className: 'signup-form-component panel panel-default' },
                _react2.default.createElement(
                    'div',
                    { className: 'panel-heading' },
                    _react2.default.createElement(
                        'h3',
                        null,
                        'Sign up'
                    )
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'panel-body' },
                    _react2.default.createElement(
                        'form',
                        { onSubmit: handleSubmit(onSubmit) },
                        _react2.default.createElement(
                            'div',
                            { className: 'form-group' },
                            _react2.default.createElement(
                                'label',
                                { htmlFor: 'email' },
                                'Email address'
                            ),
                            _react2.default.createElement(_reduxForm.Field, { name: 'email', id: 'email', className: 'form-control', placeholder: 'user@email.com', component: 'input', type: 'email', required: true })
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'form-group' },
                            _react2.default.createElement(
                                'label',
                                { htmlFor: 'firstName' },
                                'First name'
                            ),
                            _react2.default.createElement(_reduxForm.Field, { name: 'firstName', id: 'firstName', className: 'form-control', component: 'input', type: 'text', required: true })
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'form-group' },
                            _react2.default.createElement(
                                'label',
                                { htmlFor: 'lastName' },
                                'Last name'
                            ),
                            _react2.default.createElement(_reduxForm.Field, { name: 'lastName', id: 'lastName', className: 'form-control', component: 'input', type: 'text', required: true })
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'form-group' },
                            _react2.default.createElement(
                                'label',
                                null,
                                'Role'
                            ),
                            _react2.default.createElement('br', null),
                            _react2.default.createElement(
                                'label',
                                null,
                                _react2.default.createElement(_reduxForm.Field, { name: 'role', component: 'input', type: 'radio', value: 'student' }),
                                'Student'
                            ),
                            _react2.default.createElement('br', null),
                            _react2.default.createElement(
                                'label',
                                null,
                                _react2.default.createElement(_reduxForm.Field, { name: 'role', component: 'input', type: 'radio', value: 'admin' }),
                                'Administrator'
                            )
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'form-group' },
                            _react2.default.createElement(
                                'label',
                                { htmlFor: 'password' },
                                'Password'
                            ),
                            _react2.default.createElement(_reduxForm.Field, { name: 'password', id: 'password', className: 'form-control', component: 'input', type: 'password', required: true })
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'form-group' },
                            _react2.default.createElement(
                                'label',
                                { htmlFor: 'passwordConfirm' },
                                'Confirm password'
                            ),
                            _react2.default.createElement(_reduxForm.Field, { name: 'passwordConfirm', id: 'passwordConfirm', className: 'form-control', component: renderField, type: 'password', required: true })
                        ),
                        error ? _react2.default.createElement(
                            'div',
                            { className: 'alert alert-danger', role: 'alert' },
                            _react2.default.createElement('span', { className: 'glyphicon glyphicon-exclamation-sign', 'aria-hidden': 'true' }),
                            _react2.default.createElement(
                                'span',
                                { className: 'sr-only' },
                                'Error: '
                            ),
                            ' ',
                            error
                        ) : null,
                        _react2.default.createElement(
                            'button',
                            { type: 'submit', className: 'btn btn-primary', disabled: submitting },
                            'Register'
                        ),
                        _react2.default.createElement(
                            'a',
                            { className: 'login-button', onClick: this.onLogin },
                            'Already a member?'
                        )
                    )
                )
            );
        }
    }]);

    return SignupForm;
}(_react.Component);

SignupForm.propTypes = {
    onSubmit: _react.PropTypes.func.isRequired,
    handleSubmit: _react.PropTypes.func.isRequired,
    submitting: _react.PropTypes.bool.isRequired,
    error: _react.PropTypes.string,
    onLogin: _react.PropTypes.func.isRequired
};

var validate = exports.validate = function validate(values) {
    var errors = {};

    if (values.password !== values.passwordConfirm) {
        errors.passwordConfirm = 'Password confirmation does not match password';
    }

    return errors;
};

exports.default = (0, _reduxForm.reduxForm)({
    form: 'login',
    initialValues: { role: 'student' },
    validate: validate
})(SignupForm);