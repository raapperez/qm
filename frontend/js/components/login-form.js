'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reduxForm = require('redux-form');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var LoginForm = function (_Component) {
    _inherits(LoginForm, _Component);

    function LoginForm(props) {
        _classCallCheck(this, LoginForm);

        return _possibleConstructorReturn(this, (LoginForm.__proto__ || Object.getPrototypeOf(LoginForm)).call(this, props));
    }

    _createClass(LoginForm, [{
        key: 'render',
        value: function render() {
            var _props = this.props;
            var handleSubmit = _props.handleSubmit;
            var submitting = _props.submitting;
            var onSubmit = _props.onSubmit;
            var error = _props.error;


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
                                { htmlFor: 'password' },
                                'Password'
                            ),
                            _react2.default.createElement(_reduxForm.Field, { name: 'password', id: 'password', className: 'form-control', component: 'input', type: 'password', required: true })
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
                            { type: 'submit', className: 'btn btn-default', disabled: submitting },
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
    onSubmit: _react.PropTypes.func.isRequired,
    handleSubmit: _react.PropTypes.func.isRequired,
    submitting: _react.PropTypes.bool.isRequired,
    error: _react.PropTypes.string
};

exports.default = (0, _reduxForm.reduxForm)({
    form: 'login'
})(LoginForm);