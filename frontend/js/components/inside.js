'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _menu = require('./menu');

var _menu2 = _interopRequireDefault(_menu);

var _page = require('./page');

var _page2 = _interopRequireDefault(_page);

var _reactRedux = require('react-redux');

var _api = require('../services/api');

var _api2 = _interopRequireDefault(_api);

var _http = require('../services/http');

var _http2 = _interopRequireDefault(_http);

var _qmActions = require('../actions/qm-actions');

var actions = _interopRequireWildcard(_qmActions);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Inside = function (_Component) {
    _inherits(Inside, _Component);

    function Inside(props) {
        _classCallCheck(this, Inside);

        return _possibleConstructorReturn(this, (Inside.__proto__ || Object.getPrototypeOf(Inside)).call(this, props));
    }

    _createClass(Inside, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            var refreshUser = this.props.refreshUser;

            refreshUser();
        }
    }, {
        key: 'render',
        value: function render() {
            var children = this.props.children;


            return _react2.default.createElement(
                'div',
                { className: 'full-height' },
                _react2.default.createElement(_menu2.default, { ref: 'menu' }),
                _react2.default.createElement(
                    _page2.default,
                    null,
                    children
                )
            );
        }
    }]);

    return Inside;
}(_react.Component);

Inside.propTypes = {
    children: _react.PropTypes.object.isRequired,
    refreshUser: _react.PropTypes.func.isRequired
};

exports.default = (0, _reactRedux.connect)(function (state) {
    return {};
}, function (dispatch) {
    return {
        refreshUser: function refreshUser() {
            var api = new _api2.default(new _http2.default(fetch));
            return api.get('/users', 'me').then(function (user) {
                dispatch(actions.setUser(user));
                return user;
            });
        }
    };
})(Inside);