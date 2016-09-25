'use strict';

import React, {Component, PropTypes} from 'react';
import {Field, reduxForm} from 'redux-form';
import classNames from 'classnames';

const renderField = ({ input, placeholder, min, type, className, id, meta: { touched, error } }) => (
    <input {...input} id={id} placeholder={placeholder} min={min} type={type} className={classNames(className, { error: touched && error }) }/>
);

class SignupForm extends Component {

    constructor(props) {
        super(props);

        this.onLogin = this.onLogin.bind(this);
    }

    onLogin(e) {
        e.preventDefault();

        const {onLogin} = this.props;
        onLogin();
    }

    render() {
        const {handleSubmit, submitting, onSubmit, error} = this.props;

        return (
            <div className="signup-form-component panel panel-default">
                <div className="panel-heading">
                    <h3>Sign up</h3>
                </div>
                <div className="panel-body">
                    <form onSubmit={handleSubmit(onSubmit) }>
                        <div className="form-group">
                            <label htmlFor="email">Email address</label>
                            <Field name="email" id="email" className="form-control" placeholder="user@email.com" component="input" type="email" required />
                        </div>

                        <div className="form-group">
                            <label htmlFor="firstName">First name</label>
                            <Field name="firstName" id="firstName" className="form-control" component="input" type="text" required />
                        </div>

                        <div className="form-group">
                            <label htmlFor="lastName">Last name</label>
                            <Field name="lastName" id="lastName" className="form-control" component="input" type="text" required />
                        </div>

                        <div className="form-group">
                            <label>Role</label><br />
                            <label><Field name="role" component="input" type="radio" value="student" />Student</label><br />
                            <label><Field name="role" component="input" type="radio" value="admin" />Administrator</label>
                        </div>


                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <Field name="password" id="password" className="form-control" component="input" type="password" required />
                        </div>

                        <div className="form-group">
                            <label htmlFor="passwordConfirm">Confirm password</label>
                            <Field name="passwordConfirm" id="passwordConfirm" className="form-control" component={renderField} type="password" required />
                        </div>

                        {error ?
                            <div className="alert alert-danger" role="alert">
                                <span className="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
                                <span className="sr-only">Error: </span> {error}
                            </div>
                            : null
                        }

                        <button id="register-btn" type="submit" className="btn btn-primary" disabled={submitting}>Register</button>
                        <a className="login-button" onClick={this.onLogin}>Already a member?</a>

                    </form>
                </div>
            </div>
        );
    }
}

SignupForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    submitting: PropTypes.bool.isRequired,
    error: PropTypes.string,
    onLogin: PropTypes.func.isRequired
};

export const validate = values => {
    const errors = {};

    if (values.password !== values.passwordConfirm) {
        errors.passwordConfirm = 'Password confirmation does not match password';
    }

    return errors;
};

export default reduxForm({
    form: 'login',
    initialValues: {role: 'student'},
    validate
})(SignupForm);
