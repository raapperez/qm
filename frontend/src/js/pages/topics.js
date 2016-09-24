'use strict';

import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import Api from '../services/api';
import Http from '../services/http';
import * as actions from '../actions/qm-actions';

class TopicsPage extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        
    }

    render() {
        return (
            <div className="row">

                <div className="col-md-12">
oi
                </div>

{
                // <AccountsTable accounts={accounts.data}/>
                // <div className="text-center">
                //     <Pagination page={accounts.pagination.page} totalPages={accounts.pagination.totalPages} />
                // </div>
}
            </div>
        );
    }
}

TopicsPage.propTypes = {
    getTopics: PropTypes.func.isRequired
};

export default connect(
    state => ({ topics: state.topics }),
    dispatch => ({
        getTopics: (page, where, order) => {
            const api = new Api(new Http(fetch));
            return api.list('/topics', page, 10, where, order).then(topics => {
                dispatch(actions.setTopics(topics));
                return topics;
            }).catch(err => {
                dispatch(actions.setTopics({error: err}));
            });

        }
    })
)(TopicsPage);