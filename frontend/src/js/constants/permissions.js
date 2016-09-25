'use strict';

export const CREATE_TOPIC = 'CREATE_TOPIC';
export const GET_TOPIC = 'GET_TOPIC';
export const UPDATE_TOPIC = 'UPDATE_TOPIC';
export const DESTROY_TOPIC = 'DESTROY_TOPIC';
export const CREATE_ANSWER = 'CREATE_ANSWER';
export const GET_ANSWER = 'GET_ANSWER';
export const UPDATE_ANSWER = 'UPDATE_ANSWER';
export const DESTROY_ANSWER = 'DESTROY_ANSWER';


export default {
    'CREATE_TOPIC': [
        'admin',
        'student'
    ],
    'GET_TOPIC': [
        'admin',
        'student'
    ],
    'UPDATE_TOPIC': [
        'owner',
        'admin'
    ],
    'DESTROY_TOPIC': [
        'owner',
        'admin'
    ],
    'CREATE_ANSWER': [
        'admin',
        'student'
    ],
    'GET_ANSWER': [
        'admin',
        'student'
    ],
    'UPDATE_ANSWER': [
        'owner',
        'admin'
    ],
    'DESTROY_ANSWER': [
        'owner',
        'admin'
    ]
};