'use strict';

export const USER_LOGOUT = 'USER_LOGOUT';
export const userLogout = () => ({
    type: USER_LOGOUT
});

export const SET_USER = 'SET_USER';
export const setUser = user => ({
    type: SET_USER,
    user
});

export const SET_TOPIC = 'SET_TOPIC';
export const setTopic = topic => ({
    type: SET_TOPIC,
    topic
});


export const SET_TOPICS = 'SET_TOPICS';
export const setTopics = topics => ({
    type: SET_TOPICS,
    topics
});