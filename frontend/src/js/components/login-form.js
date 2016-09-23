'use strict';

import React, {Component, PropTypes} from 'react';

class LoginForm extends Component {

    constructor(props) {        
        super(props);

        this.state = {
            email: '',
            password: ''
        };

        this.submit = this.submit.bind(this);
        this.onEmailChange = this.onEmailChange.bind(this);
        this.onPasswordChange = this.onPasswordChange.bind(this);
    }
    
    componentDidMount() {

    }

    submit(e) {
        e.preventDefault();

        const {onSubmit} = this.props;
        onSubmit(this.state);
    }

    onEmailChange(e) {
        this.setState({
            email: e.target.value
        });
    }

    onPasswordChange(e) {
        this.setState({
            password: e.target.value
        });
    }

    render() {
        const {email, password} = this.state;

        return (
            <div className="login-form panel panel-default">
                <div className="panel-heading">
                    <h3>Login</h3>
                </div>
                <div className="panel-body">
                    <form onSubmit={this.submit}>
                        <div className="form-group">
                            <label htmlFor="email">Email address</label>
                            <input type="email" className="form-control" id="email" value={email} onChange={this.onEmailChange} placeholder="user@email.com" required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input type="password" className="form-control" value={password} onChange={this.onPasswordChange} id="password" required/>
                        </div>

                        <button type="submit" className="btn btn-default">Enter</button>
                    </form>            
                </div>
            </div>
        );
    }
}


LoginForm.propTypes = {
    onSubmit: PropTypes.func.isRequired
};

LoginForm.contextTypes = {
    router: React.PropTypes.object.isRequired
};

export default LoginForm;
