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

var _topicsTable = require('../components/topics-table');

var _topicsTable2 = _interopRequireDefault(_topicsTable);

var _pagination = require('../components/pagination');

var _pagination2 = _interopRequireDefault(_pagination);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TopicsPage = function (_Component) {
    _inherits(TopicsPage, _Component);

    function TopicsPage(props) {
        _classCallCheck(this, TopicsPage);

        var _this = _possibleConstructorReturn(this, (TopicsPage.__proto__ || Object.getPrototypeOf(TopicsPage)).call(this, props));

        _this.goToPage = _this.goToPage.bind(_this);
        _this.openTopic = _this.openTopic.bind(_this);
        return _this;
    }

    _createClass(TopicsPage, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _props = this.props;
            var location = _props.location;
            var getTopics = _props.getTopics;


            var page = location.query.page || 1;
            getTopics(page);
        }
    }, {
        key: 'goToPage',
        value: function goToPage(page) {
            var router = this.context.router;
            var getTopics = this.props.getTopics;


            router.push({
                pathname: '/topics',
                query: { page: page }
            });

            getTopics(page);
        }
    }, {
        key: 'openTopic',
        value: function openTopic(topic) {
            var router = this.context.router;
            var setTopic = this.props.setTopic;


            setTopic(topic);
            router.push('/topic/' + topic.id);
        }
    }, {
        key: 'render',
        value: function render() {
            var topics = this.props.topics;


            if (!topics) {
                return _react2.default.createElement(
                    'div',
                    null,
                    'loading...'
                );
            }

            return _react2.default.createElement(
                'div',
                { className: 'row' },
                _react2.default.createElement(
                    'div',
                    { className: 'col-md-12' },
                    _react2.default.createElement(_topicsTable2.default, { topics: topics.data, openTopic: this.openTopic }),
                    _react2.default.createElement(
                        'div',
                        { className: 'text-center' },
                        _react2.default.createElement(_pagination2.default, { page: topics.pagination.page, totalPages: topics.pagination.totalPages, goToPage: this.goToPage })
                    )
                )
            );
        }
    }]);

    return TopicsPage;
}(_react.Component);

TopicsPage.propTypes = {
    location: _react.PropTypes.object.isRequired,
    topics: _react.PropTypes.object,
    getTopics: _react.PropTypes.func.isRequired,
    setTopic: _react.PropTypes.func.isRequired
};

TopicsPage.contextTypes = {
    router: _react.PropTypes.object.isRequired
};

exports.default = (0, _reactRedux.connect)(function (state) {
    return { topics: state.topics };
}, function (dispatch) {
    return {
        getTopics: function getTopics(page, where, order) {
            var api = new _api2.default(new _http2.default(fetch));
            return api.list('/topics', page, 10, where, order).then(function (topics) {
                dispatch(actions.setTopics(topics));
                return topics;
            }).catch(function (err) {
                dispatch(actions.setTopics({ error: err }));
            });
        },
        setTopic: function setTopic(topic) {
            dispatch(actions.setTopic(topic));
        }
    };
})(TopicsPage);