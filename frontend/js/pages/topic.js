'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _api = require('../services/api');

var _api2 = _interopRequireDefault(_api);

var _http = require('../services/http');

var _http2 = _interopRequireDefault(_http);

var _qmActions = require('../actions/qm-actions');

var actions = _interopRequireWildcard(_qmActions);

var _answerForm = require('../components/answer-form');

var _answerForm2 = _interopRequireDefault(_answerForm);

var _reduxForm = require('redux-form');

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _topicForm = require('../components/topic-form');

var _topicForm2 = _interopRequireDefault(_topicForm);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AnswerForm = (0, _answerForm2.default)();
var AnswerFormPopup = (0, _answerForm2.default)('-popup');

var TopicPage = function (_Component) {
    _inherits(TopicPage, _Component);

    function TopicPage(props) {
        _classCallCheck(this, TopicPage);

        var _this = _possibleConstructorReturn(this, (TopicPage.__proto__ || Object.getPrototypeOf(TopicPage)).call(this, props));

        _this.doAnswer = _this.doAnswer.bind(_this);
        _this.deleteAnswer = _this.deleteAnswer.bind(_this);
        _this.editAnswer = _this.editAnswer.bind(_this);
        _this.editTopic = _this.editTopic.bind(_this);
        _this.deleteTopic = _this.deleteTopic.bind(_this);
        return _this;
    }

    _createClass(TopicPage, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _props = this.props;
            var params = _props.params;
            var topic = _props.topic;
            var getTopic = _props.getTopic;


            if (!topic || topic.id !== params.id) {
                getTopic(params.id);
            }
        }
    }, {
        key: 'doAnswer',
        value: function doAnswer(answerData) {
            var _this2 = this;

            var _props2 = this.props;
            var postAnswer = _props2.postAnswer;
            var topic = _props2.topic;
            var getTopic = _props2.getTopic;


            postAnswer(topic.id, answerData).catch(function (err) {
                throw new _reduxForm.SubmissionError({ _error: err.message });
            }).then(function () {
                var answerForm = _this2.refs.answerForm;

                answerForm.reset();
                getTopic(topic.id);
            });
        }
    }, {
        key: 'editAnswer',
        value: function editAnswer(answer) {
            var _props3 = this.props;
            var editAnswer = _props3.editAnswer;
            var getTopic = _props3.getTopic;
            var getPopup = this.context.getPopup;

            var self = getPopup();

            var content = _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(AnswerFormPopup, { onSubmit: function onSubmit(answerData) {
                        editAnswer(answerData).then(function () {
                            getTopic(answer.topicId);
                            self.hide();
                        });
                    }, onCancel: self.hide, initialValues: answer })
            );

            self.show({
                title: 'Reply edition',
                content: content,
                isSmall: false,
                onClose: function onClose() {
                    self.hide();
                },
                buttons: []
            });
        }
    }, {
        key: 'deleteAnswer',
        value: function deleteAnswer(answer) {
            var getPopup = this.context.getPopup;
            var _props4 = this.props;
            var deleteAnswer = _props4.deleteAnswer;
            var getTopic = _props4.getTopic;


            getPopup().showConfirmation('Are you sure you want to remove this reply?').then(function (mustRemove) {
                if (!mustRemove) {
                    return;
                }

                deleteAnswer(answer.topicId, answer.id).then(function () {
                    getTopic(answer.topicId);
                }).catch(function (err) {
                    console.log(err);
                });
            });
        }
    }, {
        key: 'editTopic',
        value: function editTopic(e) {
            e.preventDefault();

            var _props5 = this.props;
            var topic = _props5.topic;
            var editTopic = _props5.editTopic;
            var getPopup = this.context.getPopup;

            var self = getPopup();

            var content = _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(_topicForm2.default, { onSubmit: function onSubmit(topicData) {
                        editTopic(topicData);
                        self.hide();
                    }, onCancel: self.hide, initialValues: topic })
            );

            self.show({
                title: 'Topic edition',
                content: content,
                isSmall: false,
                onClose: function onClose() {
                    self.hide();
                },
                buttons: []
            });
        }
    }, {
        key: 'deleteTopic',
        value: function deleteTopic(e) {
            e.preventDefault();
            var _context = this.context;
            var getPopup = _context.getPopup;
            var router = _context.router;
            var deleteTopic = this.props.deleteTopic;
            var topic = this.props.topic;


            getPopup().showConfirmation('Are you sure you want to remove this topic?').then(function (mustRemove) {
                if (!mustRemove) {
                    return;
                }

                deleteTopic(topic.id).then(function () {
                    router.push('/topics');
                }).catch(function (err) {
                    console.log(err);
                });
            });
        }
    }, {
        key: 'render',
        value: function render() {
            var _this3 = this;

            var _props6 = this.props;
            var topic = _props6.topic;
            var params = _props6.params;


            if (topic && topic.error) {
                return _react2.default.createElement(
                    'div',
                    { className: 'topic-page' },
                    _react2.default.createElement('br', null),
                    _react2.default.createElement(
                        'div',
                        { className: 'alert alert-danger', role: 'alert' },
                        _react2.default.createElement('span', { className: 'glyphicon glyphicon-exclamation-sign', 'aria-hidden': 'true' }),
                        _react2.default.createElement(
                            'span',
                            { className: 'sr-only' },
                            'Error: '
                        ),
                        ' ',
                        topic.error.message
                    )
                );
            }

            if (!topic || topic.id !== params.id) {
                return _react2.default.createElement(
                    'div',
                    null,
                    'Loading...'
                );
            }

            return _react2.default.createElement(
                'div',
                { className: 'topic-page' },
                _react2.default.createElement(
                    'h1',
                    { className: 'page-header' },
                    topic.subject
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'panel panel-default' },
                    _react2.default.createElement(
                        'div',
                        { className: 'panel-heading box' },
                        _react2.default.createElement(
                            'h3',
                            { className: 'panel-title fill' },
                            topic.author.firstName + ' ' + topic.author.lastName + ' - ' + (0, _moment2.default)(topic.updatedAt).fromNow(),
                            topic.createdAt !== topic.updatedAt ? _react2.default.createElement(
                                'span',
                                { className: 'label label-info no-select edited' },
                                'edited'
                            ) : null
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'actions-bar' },
                            _react2.default.createElement(
                                'a',
                                { title: 'Edit', onClick: this.editTopic },
                                _react2.default.createElement('i', { className: 'glyphicon glyphicon-pencil' })
                            ),
                            _react2.default.createElement(
                                'a',
                                { title: 'Remove', onClick: this.deleteTopic },
                                _react2.default.createElement('i', { className: 'glyphicon glyphicon-trash' })
                            )
                        )
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'panel-body' },
                        topic.message
                    )
                ),
                _react2.default.createElement(AnswerForm, { ref: 'answerForm', onSubmit: this.doAnswer }),
                topic.answers && topic.answers.map(function (answer) {
                    return _react2.default.createElement(
                        'div',
                        { key: answer.id, className: 'panel panel-default' },
                        _react2.default.createElement(
                            'div',
                            { className: 'panel-heading box' },
                            _react2.default.createElement(
                                'h3',
                                { className: 'panel-title fill' },
                                answer.author.firstName + ' ' + answer.author.lastName + ' - ' + (0, _moment2.default)(answer.updatedAt).fromNow(),
                                answer.createdAt !== answer.updatedAt ? _react2.default.createElement(
                                    'span',
                                    { className: 'label label-info no-select edited' },
                                    'edited'
                                ) : null
                            ),
                            _react2.default.createElement(
                                'div',
                                { className: 'actions-bar' },
                                _react2.default.createElement(
                                    'a',
                                    { title: 'Edit', onClick: function onClick(e) {
                                            e.preventDefault();
                                            _this3.editAnswer(answer);
                                        } },
                                    _react2.default.createElement('i', { className: 'glyphicon glyphicon-pencil' })
                                ),
                                _react2.default.createElement(
                                    'a',
                                    { title: 'Remove', onClick: function onClick(e) {
                                            e.preventDefault();
                                            _this3.deleteAnswer(answer);
                                        } },
                                    _react2.default.createElement('i', { className: 'glyphicon glyphicon-trash' })
                                )
                            )
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'panel-body' },
                            answer.message
                        )
                    );
                })
            );
        }
    }]);

    return TopicPage;
}(_react.Component);

TopicPage.propTypes = {
    topic: _react.PropTypes.object,
    params: _react.PropTypes.object.isRequired,
    getTopic: _react.PropTypes.func.isRequired,
    postAnswer: _react.PropTypes.func.isRequired,
    deleteAnswer: _react.PropTypes.func.isRequired,
    deleteTopic: _react.PropTypes.func.isRequired,
    editTopic: _react.PropTypes.func.isRequired,
    editAnswer: _react.PropTypes.func.isRequired
};

TopicPage.contextTypes = {
    getPopup: _react.PropTypes.func.isRequired,
    router: _react.PropTypes.object.isRequired
};

exports.default = (0, _reactRedux.connect)(function (state) {
    return { topic: state.topic };
}, function (dispatch) {
    return {
        getTopic: function getTopic(id) {
            var api = new _api2.default(new _http2.default(fetch));
            return api.get('/topics', id).then(function (topic) {
                dispatch(actions.setTopic(topic));
                return topic;
            }).catch(function (err) {
                dispatch(actions.setTopic({ error: err }));
            });
        },
        postAnswer: function postAnswer(topicId, answer) {
            var api = new _api2.default(new _http2.default(fetch));
            return api.post('/topics/' + topicId + '/answers', answer);
        },
        deleteAnswer: function deleteAnswer(topicId, answerId) {
            var api = new _api2.default(new _http2.default(fetch));
            return api.delete('/topics/' + topicId + '/answers', answerId);
        },
        deleteTopic: function deleteTopic(topicId) {
            var api = new _api2.default(new _http2.default(fetch));
            return api.delete('/topics', topicId).then(function () {
                dispatch(actions.setTopic(null));
            });
        },
        editTopic: function editTopic(topic) {
            var api = new _api2.default(new _http2.default(fetch));
            return api.update('/topics', topic.id, topic).then(function (topic) {
                dispatch(actions.setTopic(topic));
            });
        },
        editAnswer: function editAnswer(answer) {
            var api = new _api2.default(new _http2.default(fetch));
            return api.update('/topics/' + answer.topicId + '/answers', answer.id, answer);
        }
    };
})(TopicPage);