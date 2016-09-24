'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var USER_LOGOUT = exports.USER_LOGOUT = 'USER_LOGOUT';
var userLogout = exports.userLogout = function userLogout() {
    return {
        type: USER_LOGOUT
    };
};

var SET_USER = exports.SET_USER = 'SET_USER';
var setUser = exports.setUser = function setUser(user) {
    return {
        type: SET_USER,
        user: user
    };
};

var SET_TOPIC = exports.SET_TOPIC = 'SET_TOPIC';
var setTopic = exports.setTopic = function setTopic(topic) {
    return {
        type: SET_TOPIC,
        topic: topic
    };
};