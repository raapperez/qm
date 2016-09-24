'use strict';

import React, {Component, PropTypes} from 'react';
import { Link } from 'react-router';
import {connect} from 'react-redux';
import userService from '../services/user';
import * as actions from '../actions/qm-actions';

class Menu extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isShowingUserMenu: false
        };

        this.logout = this.logout.bind(this);
        this.toogleUserMenu = this.toogleUserMenu.bind(this);

    }

    logout() {
        const {router} = this.context;
        const {logout} = this.props;

        userService.erase();
        logout();
        router.push('/login');
    }

    toogleUserMenu(e) {
        e.preventDefault();
        const {isShowingUserMenu} = this.state;

        this.setState({
            isShowingUserMenu: !isShowingUserMenu
        });
    }


    render() {

        const {user} = this.props;
        const {isShowingUserMenu} = this.state;

        return (
            <nav className="menu-component navbar navbar-default navbar-static-top navbar-inverse no-select">

                <span className="navbar-brand">Qm Forum</span>

                <div className="collapse navbar-collapse">
                    <ul className="nav navbar-nav">
                    <li>
                        <Link to="/topics" activeClassName="active">Topics</Link>
                    </li>
                        <li>
                            <Link to="/topic/create" activeClassName="active">New topic</Link>
                        </li>
                    </ul>
                </div>
                <div className="user-menu">
                    <ul className="nav navbar-nav">
                        <li className="user-drop dropdown">
                            <a className="dropdown-toggle" onClick={this.toogleUserMenu}>
                                {!user? 'Loading...' : `${user.firstName} ${user.lastName}`} <span className="caret"/>
                            </a>
                            <ul className="dropdown-menu" style={{display: isShowingUserMenu ? 'block' : 'none'}}>
                                <li>
                                    <a onClick={this.logout}>Logout</a>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </nav>
        );
    }
}

Menu.contextTypes = {
    router: PropTypes.object.isRequired
};

Menu.propTypes = {
    logout: PropTypes.func.isRequired,
    user: PropTypes.object 
};

export default connect(
    state => ({ user: state.user }),
    dispatch => ({
        logout: () => {
            dispatch(actions.userLogout());
        }
    }),
    null,
    {pure: false}
)(Menu);