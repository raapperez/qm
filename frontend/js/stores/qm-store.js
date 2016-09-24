'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getStore = undefined;

var _redux = require('redux');

var _qmActions = require('../actions/qm-actions');

var actions = _interopRequireWildcard(_qmActions);

var _reduxForm = require('redux-form');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var user = function user() {
    var state = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
    var action = arguments[1];

    switch (action.type) {
        case actions.SET_USER:
            return action.user;
        default:
            return state;
    }
};

var topic = function topic() {
    var state = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];
    var action = arguments[1];

    switch (action.type) {
        case actions.SET_TOPIC:
            return action.topic;
        default:
            return state;
    }
};

var combinedReducers = (0, _redux.combineReducers)({
    user: user,
    topic: topic,
    form: _reduxForm.reducer
});

var rootReducer = function rootReducer(state, action) {
    switch (action.type) {
        case actions.USER_LOGOUT:
            return combinedReducers(undefined, action);
        default:
            return combinedReducers(state, action);
    }
};

var getStore = exports.getStore = function getStore(initialState) {
    return (0, _redux.createStore)(rootReducer, initialState);
};