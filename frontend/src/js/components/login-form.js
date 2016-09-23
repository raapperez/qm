'use strict';

import React, {Component, PropTypes} from 'react';
import {Field, reduxForm} from 'redux-form';

class LoginForm extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const {handleSubmit, submitting} = this.props;

        return (
            <div className="login-form panel panel-default">
                <div className="panel-heading">
                    <h3>Login</h3>
                </div>
                <div className="panel-body">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="email">Email address</label>
                            <Field name="email" id="email" className="form-control" placeholder="user@email.com" component="input" type="email" required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <Field name="password" id="password" className="form-control" component="input" type="password" required />                            
                        </div>

                        <button type="submit" className="btn btn-default" disabled={submitting}>Enter</button>
                    </form>
                </div>
            </div>
        );
    }
}

LoginForm.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    submitting: PropTypes.bool.isRequired
};

export default reduxForm({
    form: 'login'
})(LoginForm);
