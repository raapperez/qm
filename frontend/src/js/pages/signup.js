'use strict';

import React, {Component, PropTypes} from 'react';
import SignupForm from '../components/signup-form';
import Api from '../services/api';
import Http from '../services/http';
import userService from '../services/user';
import { SubmissionError } from 'redux-form';

class SignupPage extends Component {

    constructor(props) {
        super(props);

        this.onSubmit = this.onSubmit.bind(this);
        this.onLogin = this.onLogin.bind(this);
    }

    onSubmit(signupData) {
        const {router} = this.context;

        const api = new Api(new Http(fetch));

        return api.signup(signupData).then(data => {

            const {token} = data;
            
            if(token) {
                userService.setToken(token);
            }
            
            router.push('/topics');
            
        }).catch(err => {
            throw new SubmissionError({_error: err.message});
        });

    }

    onLogin() {
        const {router} = this.context;
        router.push('/login');
    }

    render() {
        return (
            <div className="signup-page">
                <h1 className="title">Qm Forum</h1>                
                <SignupForm onSubmit={this.onSubmit} onLogin={this.onLogin} />
            </div>
        );
    }
}

SignupPage.contextTypes = {
    router: PropTypes.object.isRequired,
};

export default SignupPage;