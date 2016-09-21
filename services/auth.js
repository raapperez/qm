'use strict';

const SHA256 = require('crypto-js/sha256');
const csprng = require('csprng');

module.exports.encryptPassword = password => {
    const salt = csprng(160, 36);
    const hash = SHA256(`${password}${salt}`).toString();
    
    return {
        salt,
        hash
    };
};

module.exports.checkPassword = (password, salt, hash) => {
    const newHash = SHA256(`${password}${salt}`).toString();
    
    return newHash === hash;
};