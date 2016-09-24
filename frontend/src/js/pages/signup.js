'use strict';

import React, {Component, PropTypes} from 'react';
import SignupForm from '../components/signup-form';

class SignupPage extends Component {

    constructor(props) {
        super(props);

        this.onSubmit = this.onSubmit.bind(this);
        this.onLogin = this.onLogin.bind(this);
    }

    onSubmit() {

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