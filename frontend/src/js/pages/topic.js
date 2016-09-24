'use strict';

import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import Api from '../services/api';
import Http from '../services/http';
import * as actions from '../actions/qm-actions';
import AnswerForm from '../components/answer-form';
import { SubmissionError } from 'redux-form';
import moment from 'moment';

class TopicPage extends Component {

    constructor(props) {
        super(props);

        this.doAnswer = this.doAnswer.bind(this);
    }

    componentDidMount() {
        const {params, topic, getTopic} = this.props;

        if (!topic || topic.id !== params.id) {
            getTopic(params.id);
        }
    }

    doAnswer(answerData) {
        const {postAnswer, topic, getTopic} = this.props;

        postAnswer(topic.id, answerData).catch(err => {
            throw new SubmissionError({ _error: err.message });
        }).then(() => {
            const {answerForm} = this.refs;
            answerForm.reset();
            getTopic(topic.id);
        });


    }

    render() {
        const {topic, params} = this.props;

        if (!topic || topic.id !== params.id) {
            return (
                <div>
                    Loading...
                </div>
            );
        }

        return (
            <div>

                <h1 className="page-header">{topic.subject}</h1>

                <div className="panel panel-default">
                    <div className="panel-body">
                        {topic.message}
                    </div>
                </div>

                <AnswerForm ref="answerForm" onSubmit={this.doAnswer}/>

                {
                    topic.answers && topic.answers.map(answer => (
                        <div key={answer.id} className="panel panel-default">
                            <div className="panel-heading">
                                <h3 className="panel-title">{`${answer.author.firstName} ${answer.author.lastName} - ${moment(answer.updatedAt).fromNow()}`}</h3>
                                {
                                    answer.createdAt !== answer.updatedAt ?
                                        <span className="label label-info">edited</span>
                                        : null
                                }

                            </div>
                            <div className="panel-body">
                                {answer.message}
                            </div>
                        </div>
                    ))
                }
            </div>
        );
    }
}

TopicPage.propTypes = {
    topic: PropTypes.object,
    params: PropTypes.object.isRequired,
    getTopic: PropTypes.func.isRequired,
    postAnswer: PropTypes.func.isRequired
};

export default connect(
    state => ({ topic: state.topic }),
    dispatch => ({
        getTopic: id => {
            const api = new Api(new Http(fetch));
            return api.get('/topics', id).then(topic => {
                dispatch(actions.setTopic(topic));
                return topic;
            }).catch(err => {
                dispatch(actions.setTopic({ error: err }));
            });

        },
        postAnswer: (topicId, answer) => {
            const api = new Api(new Http(fetch));
            return api.post(`/topics/${topicId}/answers`, answer);
        }
    })
)(TopicPage);