'use strict';

import React, {Component, PropTypes} from 'react';
import Menu from './menu';
import Page from './page';
import {connect} from 'react-redux';
import Api from '../services/api';
import Http from '../services/http';
import * as actions from '../actions/qm-actions';

class Inside extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const {refreshUser} = this.props;
        refreshUser();
    }

    render() {
        const {children} = this.props;
        
        return (
            <div className="full-height">
                <Menu ref="menu"></Menu>
                <Page>{children}</Page>
            </div>
        );
    }
}

Inside.propTypes = {
    children: PropTypes.object.isRequired,
    refreshUser: PropTypes.func.isRequired
};

export default connect(
    state => ({}),
    dispatch => ({
        refreshUser: () => {
            const api = new Api(new Http(fetch));
            return api.get('/users', 'me').then(user => {
                dispatch(actions.setUser(user));
                return user;
            });
        }
    })
)(Inside);