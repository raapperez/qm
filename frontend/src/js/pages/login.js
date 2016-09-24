'use strict';

import React, {PropTypes, Component} from 'react';
import LoginForm from '../components/login-form';
import Api from '../services/api';
import Http from '../services/http';
import user from '../services/user';
import { SubmissionError } from 'redux-form';

class LoginPage extends Component {

    constructor(props) {
        super(props);

        this.onSubmit = this.onSubmit.bind(this);
        this.onSignup = this.onSignup.bind(this);
    }

    onSubmit(formData) {

        const {router} = this.context;
        const {email, password} = formData;

        const api = new Api(new Http(fetch));

        return api.login(email, password).then(data => {

            const {token} = data;
            
            if(token) {
                user.setToken(token);
            }
            
            router.push('/topics');
            
        }).catch(err => {
            throw new SubmissionError({_error: err.message});
        });
    }

    onSignup(){
        const {router} = this.context;
        router.push('/signup');
    }

    render() {
        return (
            <div className="login-page">
                <h1 className="title">Qm Forum</h1>                
                <LoginForm onSubmit={this.onSubmit} onSignup={this.onSignup} />
            </div>
        );
    }
}

LoginPage.contextTypes = {
    router: PropTypes.object.isRequired,
};

export default LoginPage;