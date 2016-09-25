'use strict';
const rp = require('request-promise');
const {host} = require('./constants');


const createUserAndLogin = (user) => {
    return rp.post({
        uri: `${host}/auth/login`,
        json: true,
        body: user
    }).then(result => result.token).catch(err => {
        console.log(err.statusCode);
        if (err.statusCode === 400) {
            return rp.post({
                uri: `${host}/users`,
                json: true,
                body: user
            }).then(() => {
                return createUserAndLogin(user);
            });
        }
    });
};


module.exports.createUserAndLogin = createUserAndLogin;