'use strict';

import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import Api from '../services/api';
import Http from '../services/http';
import * as actions from '../actions/qm-actions';
import TopicsTable from '../components/topics-table';
import Pagination from '../components/pagination';

class TopicsPage extends Component {

    constructor(props) {
        super(props);

        this.goToPage = this.goToPage.bind(this);
        this.openTopic = this.openTopic.bind(this);
    }

    componentDidMount() {
        const { location, getTopics} = this.props;
        
        const page = location.query.page || 1;
        getTopics(page);
    }

    goToPage(page) {
        const {router} = this.context;
        const {getTopics} = this.props;

        router.push({
            pathname: '/topics',
            query: {page}
        });

        getTopics(page);
    }

    openTopic(topic) {
        const {router} = this.context;     
        const {setTopic} = this.props;

        setTopic(topic);
        router.push(`/topic/${topic.id}`);
    }


    render() {

        const {topics} = this.props;

        if (!topics) {
            return (<div>loading...</div>);
        }

        return (
            <div className="row">

                <div className="col-md-12">

                    <TopicsTable topics={topics.data} openTopic={this.openTopic} />

                    <div className="text-center">
                        <Pagination page={topics.pagination.page} totalPages={topics.pagination.totalPages} goToPage={this.goToPage} />
                    </div>

                </div>
            </div>
        );
    }
}

TopicsPage.propTypes = {
    location: PropTypes.object.isRequired,
    topics: PropTypes.object,
    getTopics: PropTypes.func.isRequired,
    setTopic: PropTypes.func.isRequired
};

TopicsPage.contextTypes = {
    router: PropTypes.object.isRequired,
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
                dispatch(actions.setTopics({ error: err }));
            });

        },
        setTopic: topic => {
            dispatch(actions.setTopic(topic));
        }
    })
)(TopicsPage);