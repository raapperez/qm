'use strict';

import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import Api from '../services/api';
import Http from '../services/http';
import * as actions from '../actions/qm-actions';
import TopicForm from '../components/topic-form';
import { SubmissionError } from 'redux-form';

class TopicCreatePage extends Component {

    constructor(props) {
        super(props);

        this.onSubmit = this.onSubmit.bind(this);
        this.goBack = this.goBack.bind(this);
    }

    onSubmit(topicData) {
        const {createTopic} = this.props;
        const {router} = this.context;

        createTopic(topicData).then(topic => {
            router.push(`/topic/${topic.id}`);
        }).catch(err => {
            throw new SubmissionError({_error: err.message});
        });
    }

    goBack() {
        const {router} = this.context;
        router.push(`/topics`);       
    }

    render() {
        return (
            <div className="row">
                <div className="col-md-12">
                    <br />
                    <TopicForm onSubmit={this.onSubmit} onCancel={this.goBack} />
                </div>
            </div>
        );
    }
}

TopicCreatePage.propTypes = {
    createTopic: PropTypes.func.isRequired
};

TopicCreatePage.contextTypes = {
    router: PropTypes.object.isRequired,
};

export default connect(
    state => ({}),
    dispatch => ({
        createTopic: topicData => {
            const api = new Api(new Http(fetch));
            return api.post('/topics', topicData).then(topic => {
                dispatch(actions.setTopic(topic));
                return topic;
            });
        }
    })
)(TopicCreatePage);