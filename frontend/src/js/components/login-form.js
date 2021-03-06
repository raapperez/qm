'use strict';

import React, {Component, PropTypes} from 'react';
import {Field, reduxForm} from 'redux-form';

class LoginForm extends Component {

    constructor(props) {
        super(props);

        this.onSignup = this.onSignup.bind(this);
    }

    onSignup(e) {
        e.preventDefault();

        const {onSignup} = this.props;
        onSignup();
    }

    render() {
        const {handleSubmit, submitting, onSubmit, error} = this.props;

        return (
            <div className="login-form-component panel panel-default">
                <div className="panel-heading">
                    <h3>Login</h3>
                </div>
                <div className="panel-body">
                    <form onSubmit={handleSubmit(onSubmit) }>
                        <div className="form-group">
                            <label htmlFor="email">Email address</label>
                            <Field name="email" id="email" className="form-control" placeholder="user@email.com" component="input" type="email" required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <Field name="password" id="password" className="form-control" component="input" type="password" required />
                        </div>

                        {error ?
                            <div className="alert alert-danger" role="alert">
                                <span className="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
                                <span className="sr-only">Error: </span> {error}
                            </div>
                            : null
                        }

                        <button type="submit" className="btn btn-primary" disabled={submitting}>Enter</button>
                        <a id="signup-btn" className="sigup-button" onClick={this.onSignup}>Not a member yet?</a>

                    </form>
                </div>
            </div>
        );
    }
}

LoginForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    submitting: PropTypes.bool.isRequired,
    error: PropTypes.string,
    onSignup: PropTypes.func.isRequired
};

export default reduxForm({
    form: 'login'
})(LoginForm);
