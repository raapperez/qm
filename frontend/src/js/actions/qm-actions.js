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