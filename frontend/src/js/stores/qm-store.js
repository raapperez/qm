'use strict';

import {createStore, combineReducers} from 'redux';
import * as actions from '../actions/qm-actions';
import {reducer as formReducer} from 'redux-form';

const user = (state = {}, action) => {
    switch (action.type) {
        case actions.SET_USER:
            return action.user;
        default:
            return state;
    }
};

const topic = (state = null, action) => {
    switch (action.type) {
        case actions.SET_TOPIC:
            return action.topic;
        default:
            return state;
    }
};

const topics = (state = null, action) => {
    switch (action.type) {
        case actions.SET_TOPICS:
            return action.topics;
        default:
            return state;
    }
};

const combinedReducers = combineReducers({
    user,
    topic,
    topics,
    form: formReducer
});

const rootReducer = (state, action) => {
    switch (action.type) {
        case actions.USER_LOGOUT:
            return combinedReducers(undefined, action);
        default:
            return combinedReducers(state, action);
    }
};

export const getStore = (initialState) => {
    return createStore(rootReducer, initialState);
};