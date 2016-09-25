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
        this.deleteAnswer = this.deleteAnswer.bind(this);
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

    deleteAnswer(answer) {

        const {getPopup, } = this.context;
        const {deleteAnswer, getTopic} = this.props;

        getPopup().showConfirmation('Are you sure to remove this reply?').then(mustRemove => {
            if(!mustRemove) {
                return;
            }

            deleteAnswer(answer.topicId, answer.id).then(() => {
                getTopic(answer.topicId);
            }).catch(err => {
                console.log(err);
            });

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
            <div className="topic-page">
                <h1 className="page-header">{topic.subject}</h1>

                <div className="panel panel-default">
                    <div className="panel-heading box">
                        <h3 className="panel-title fill">{`${topic.author.firstName} ${topic.author.lastName} - ${moment(topic.updatedAt).fromNow()}`}
                        {
                            topic.createdAt !== topic.updatedAt ?
                                <span className="label label-info no-select edited">edited</span>
                                : null
                        }
                        </h3>
                        <div className="actions-bar">
                            <a title="Edit"><i className="glyphicon glyphicon-pencil"></i></a>
                            <a title="Remove"><i className="glyphicon glyphicon-trash"></i></a>
                        </div>

                    </div>
                    <div className="panel-body">
                        {topic.message}
                    </div>
                </div>

                <AnswerForm ref="answerForm" onSubmit={this.doAnswer}/>

                {
                    topic.answers && topic.answers.map(answer => (
                        <div key={answer.id} className="panel panel-default">
                            <div className="panel-heading box">
                                <h3 className="panel-title fill">{`${answer.author.firstName} ${answer.author.lastName} - ${moment(answer.updatedAt).fromNow()}`}
                                {
                                    answer.createdAt !== answer.updatedAt ?
                                        <span className="label label-info no-select edited">edited</span>
                                        : null
                                }
                                </h3>

                                <div className="actions-bar">
                                    <a title="Edit"><i className="glyphicon glyphicon-pencil"></i></a>
                                    <a title="Remove" onClick={e => {
                                        e.preventDefault();
                                        this.deleteAnswer(answer);
                                    }}><i className="glyphicon glyphicon-trash"></i></a>
                                </div>

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
    postAnswer: PropTypes.func.isRequired,
    deleteAnswer: PropTypes.func.isRequired
};

TopicPage.contextTypes = {
    getPopup: PropTypes.func.isRequired
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
        },
        deleteAnswer: (topicId, answerId) => {
            const api = new Api(new Http(fetch));
            return api.delete(`/topics/${topicId}/answers`, answerId);
        }
    })
)(TopicPage);