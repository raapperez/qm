'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.clientSide = exports.serverSide = exports.routes = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

var _example = require('./pages/example');

var _example2 = _interopRequireDefault(_example);

var _page = require('./pages/page2');

var _page2 = _interopRequireDefault(_page);

var _reactRedux = require('react-redux');

var _qmStore = require('./stores/qm-store');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var routes = exports.routes = _react2.default.createElement(
    _reactRouter.Route,
    { path: '', component: function component(_ref) {
            var children = _ref.children;
            return children;
        } },
    _react2.default.createElement(_reactRouter.Route, { path: '/index', component: _example2.default }),
    _react2.default.createElement(_reactRouter.Route, { path: '/page2', component: _page2.default }),
    _react2.default.createElement(_reactRouter.Redirect, { from: '*', to: '/index' })
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