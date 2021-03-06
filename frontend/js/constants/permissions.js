'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var CREATE_TOPIC = exports.CREATE_TOPIC = 'CREATE_TOPIC';
var GET_TOPIC = exports.GET_TOPIC = 'GET_TOPIC';
var UPDATE_TOPIC = exports.UPDATE_TOPIC = 'UPDATE_TOPIC';
var DESTROY_TOPIC = exports.DESTROY_TOPIC = 'DESTROY_TOPIC';
var CREATE_ANSWER = exports.CREATE_ANSWER = 'CREATE_ANSWER';
var GET_ANSWER = exports.GET_ANSWER = 'GET_ANSWER';
var UPDATE_ANSWER = exports.UPDATE_ANSWER = 'UPDATE_ANSWER';
var DESTROY_ANSWER = exports.DESTROY_ANSWER = 'DESTROY_ANSWER';

exports.default = {
    'CREATE_TOPIC': ['admin', 'student'],
    'GET_TOPIC': ['admin', 'student'],
    'UPDATE_TOPIC': ['owner', 'admin'],
    'DESTROY_TOPIC': ['owner', 'admin'],
    'CREATE_ANSWER': ['admin', 'student'],
    'GET_ANSWER': ['admin', 'student'],
    'UPDATE_ANSWER': ['owner', 'admin'],
    'DESTROY_ANSWER': ['owner', 'admin']
};