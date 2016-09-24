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

var _topicForm = require('../components/topic-form');

var _topicForm2 = _interopRequireDefault(_topicForm);

var _reduxForm = require('redux-form');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TopicCreatePage = function (_Component) {
    _inherits(TopicCreatePage, _Component);

    function TopicCreatePage(props) {
        _classCallCheck(this, TopicCreatePage);

        var _this = _possibleConstructorReturn(this, (TopicCreatePage.__proto__ || Object.getPrototypeOf(TopicCreatePage)).call(this, props));

        _this.onSubmit = _this.onSubmit.bind(_this);
        _this.goBack = _this.goBack.bind(_this);
        return _this;
    }

    _createClass(TopicCreatePage, [{
        key: 'onSubmit',
        value: function onSubmit(topicData) {
            var createTopic = this.props.createTopic;
            var router = this.context.router;


            return createTopic(topicData).then(function (topic) {
                router.push('/topic/' + topic.id);
            }).catch(function (err) {
                throw new _reduxForm.SubmissionError({ _error: err.message });
            });
        }
    }, {
        key: 'goBack',
        value: function goBack() {
            var router = this.context.router;

            router.push('/topics');
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                { className: 'row' },
                _react2.default.createElement(
                    'div',
                    { className: 'col-md-12' },
                    _react2.default.createElement(
                        'h1',
                        { className: 'page-header' },
                        'New topic'
                    ),
                    _react2.default.createElement(_topicForm2.default, { onSubmit: this.onSubmit, onCancel: this.goBack })
                )
            );
        }
    }]);

    return TopicCreatePage;
}(_react.Component);

TopicCreatePage.propTypes = {
    createTopic: _react.PropTypes.func.isRequired
};

TopicCreatePage.contextTypes = {
    router: _react.PropTypes.object.isRequired
};

exports.default = (0, _reactRedux.connect)(function (state) {
    return {};
}, function (dispatch) {
    return {
        createTopic: function createTopic(topicData) {
            var api = new _api2.default(new _http2.default(fetch));
            return api.post('/topics', topicData).then(function (topic) {
                dispatch(actions.setTopic(topic));
                return topic;
            });
        }
    };
})(TopicCreatePage);