'use strict';

import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import Api from '../services/api';
import Http from '../services/http';
import * as actions from '../actions/qm-actions';
import answerForm from '../components/answer-form';
import { SubmissionError } from 'redux-form';
import moment from 'moment';

import TopicForm from '../components/topic-form';

import permission from '../services/permission';
import * as permissions from '../constants/permissions';

const AnswerForm = answerForm();
const AnswerFormPopup = answerForm('-popup');

class TopicPage extends Component {

    constructor(props) {
        super(props);

        this.doAnswer = this.doAnswer.bind(this);
        this.deleteAnswer = this.deleteAnswer.bind(this);
        this.editAnswer = this.editAnswer.bind(this);
        this.editTopic = this.editTopic.bind(this);
        this.deleteTopic = this.deleteTopic.bind(this);
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

    editAnswer(answer) {

        const {editAnswer, getTopic} = this.props;
        const {getPopup} = this.context;
        const self = getPopup();

        const content = (
            <div>
                <AnswerFormPopup onSubmit={answerData => {
                    editAnswer(answerData).then(() => {
                        getTopic(answer.topicId);
                        self.hide();
                    });
                } } onCancel={self.hide} initialValues={answer} />
            </div>
        );

        self.show({
            title: 'Reply edition',
            content,
            isSmall: false,
            onClose: () => {
                self.hide();
            },
            buttons: []
        });
    }

    deleteAnswer(answer) {

        const {getPopup} = this.context;
        const {deleteAnswer, getTopic} = this.props;

        getPopup().showConfirmation('Are you sure you want to remove this reply?').then(mustRemove => {
            if (!mustRemove) {
                return;
            }

            deleteAnswer(answer.topicId, answer.id).then(() => {
                getTopic(answer.topicId);
            }).catch(err => {
                console.log(err);
            });

        });
    }


    editTopic(e) {
        e.preventDefault();

        const {topic, editTopic} = this.props;
        const {getPopup} = this.context;
        const self = getPopup();

        const content = (
            <div>
                <TopicForm onSubmit={topicData => {
                    editTopic(topicData);
                    self.hide();
                } } onCancel={self.hide} initialValues={topic} />
            </div>
        );

        self.show({
            title: 'Topic edition',
            content,
            isSmall: false,
            onClose: () => {
                self.hide();
            },
            buttons: []
        });
    }

    deleteTopic(e) {
        e.preventDefault();
        const {getPopup, router} = this.context;
        const {deleteTopic} = this.props;

        const {topic} = this.props;

        getPopup().showConfirmation('Are you sure you want to remove this topic?').then(mustRemove => {
            if (!mustRemove) {
                return;
            }

            deleteTopic(topic.id).then(() => {
                router.push('/topics');
            }).catch(err => {
                console.log(err);
            });
        });
    }

    render() {
        const {topic, params, user} = this.props;

        if (topic && topic.error) {
            return (
                <div className="topic-page">
                    <br />
                    <div className="alert alert-danger" role="alert">
                        <span className="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
                        <span className="sr-only">Error: </span> {topic.error.message}
                    </div>
                </div>
            );
        }

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
                            {
                                permission.has(user, permissions.UPDATE_TOPIC, topic, 'createdByUserId') ?
                                    <a title="Edit" onClick={this.editTopic}><i className="glyphicon glyphicon-pencil"></i></a>
                                    : null
                            }

                            {
                                permission.has(user, permissions.DESTROY_TOPIC, topic, 'createdByUserId') ?
                                    <a title="Remove" onClick={this.deleteTopic}><i className="glyphicon glyphicon-trash"></i></a>
                                    : null
                            }
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
                                    {
                                        permission.has(user, permissions.UPDATE_ANSWER, answer, 'createdByUserId') ?
                                            <a title="Edit" onClick={e => {
                                                e.preventDefault();
                                                this.editAnswer(answer);
                                            } }><i className="glyphicon glyphicon-pencil"></i></a>
                                            : null
                                    }

                                    {
                                        permission.has(user, permissions.DESTROY_ANSWER, answer, 'createdByUserId') ?
                                            <a title="Remove" onClick={e => {
                                                e.preventDefault();
                                                this.deleteAnswer(answer);
                                            } }><i className="glyphicon glyphicon-trash"></i></a>
                                            : null
                                    }

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
    user: PropTypes.object,
    topic: PropTypes.object,
    params: PropTypes.object.isRequired,
    getTopic: PropTypes.func.isRequired,
    postAnswer: PropTypes.func.isRequired,
    deleteAnswer: PropTypes.func.isRequired,
    deleteTopic: PropTypes.func.isRequired,
    editTopic: PropTypes.func.isRequired,
    editAnswer: PropTypes.func.isRequired
};

TopicPage.contextTypes = {
    getPopup: PropTypes.func.isRequired,
    router: PropTypes.object.isRequired
};

export default connect(
    state => ({ user: state.user, topic: state.topic }),
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
        },
        deleteTopic: topicId => {
            const api = new Api(new Http(fetch));
            return api.delete(`/topics`, topicId).then(() => {
                dispatch(actions.setTopic(null));
            });
        },
        editTopic: topic => {
            const api = new Api(new Http(fetch));
            return api.update(`/topics`, topic.id, topic).then(topic => {
                dispatch(actions.setTopic(topic));
            });
        },
        editAnswer: answer => {
            const api = new Api(new Http(fetch));
            return api.update(`/topics/${answer.topicId}/answers`, answer.id, answer);
        }
    })
)(TopicPage);