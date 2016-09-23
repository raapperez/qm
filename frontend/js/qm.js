'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.clientSide = exports.serverSide = exports.routes = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

var _reactRedux = require('react-redux');

var _qmStore = require('./stores/qm-store');

var _app = require('./components/app');

var _app2 = _interopRequireDefault(_app);

var _inside = require('./components/inside');

var _inside2 = _interopRequireDefault(_inside);

var _login = require('./pages/login');

var _login2 = _interopRequireDefault(_login);

var _signup = require('./pages/signup');

var _signup2 = _interopRequireDefault(_signup);

var _topics = require('./pages/topics');

var _topics2 = _interopRequireDefault(_topics);

var _topic = require('./pages/topic');

var _topic2 = _interopRequireDefault(_topic);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var routes = exports.routes = _react2.default.createElement(
    _reactRouter.Route,
    { path: '', component: _app2.default },
    _react2.default.createElement(
        _reactRouter.Route,
        { path: '', component: _inside2.default },
        _react2.default.createElement(_reactRouter.Route, { path: '/topics', component: _topics2.default }),
        _react2.default.createElement(_reactRouter.Route, { path: '/topic/:id', component: _topic2.default })
    ),
    _react2.default.createElement(_reactRouter.Route, { path: '/login', component: _login2.default }),
    _react2.default.createElement(_reactRouter.Route, { path: '/signup', component: _signup2.default }),
    _react2.default.createElement(_reactRouter.Redirect, { from: '/', to: '/login' })
);

var serverSide = exports.serverSide = function serverSide(renderProps, initialState) {
    return _react2.default.createElement(
        _reactRedux.Provider,
        { store: (0, _qmStore.getStore)(initialState) },
        _react2.default.createElement(_reactRouter.RouterContext, renderProps)
    );
};

var clientSide = exports.clientSide = function clientSide(renderProps) {
    return _react2.default.createElement(
        _reactRedux.Provider,
        { store: (0, _qmStore.getStore)(window.__PRELOADED_STATE__) },
        _react2.default.createElement(_reactRouter.Router, renderProps)
    );
};