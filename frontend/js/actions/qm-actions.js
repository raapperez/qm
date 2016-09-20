'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var SET_VALUE = exports.SET_VALUE = 'SET_VALUE';
var setValue = exports.setValue = function setValue(value) {
    return {
        type: SET_VALUE,
        value: value
    };
};