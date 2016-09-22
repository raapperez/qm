'use strict';

const models = require('../models');
const {User} = models;

const passport = require('passport');
const SHA256 = require('crypto-js/sha256');

module.exports = (req, res, next) => {

    passport.authenticate('jwt', { session: false })(req, res, (err) => {
        
        if (err) {
            next(err);
            return;
        }

        User.findById(req.user.id).then(user => {
            const token = req.headers.authorization.replace('JWT ', '');
            const tokenHash = SHA256(token).toString();
                        
            if(!user || !user.isActive || user.loginTokenHash !== tokenHash) {
                const error = new Error('Unauthorized. Please make a new login.');
                error.status = 401;
                next(error);
                return;
            }
            
            next();

        }).catch(err => {
            next(err);
        });
    });
};

