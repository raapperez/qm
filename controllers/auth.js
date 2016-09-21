'use sttict';

const userModel = require('../models/user');
const authService = require('../services/auth');

module.exports.login = (req, res, next) => {

    const {email, password} = req.body;

    if (!email || !password) {
        const error = new Error('Email and password are required');
        error.status = 400;    
        next(error);
        return;
    }

    userModel.findOne({
        where: {
            email,
            isActive: true
        }
    }).then(user => {
        if(!user) {
            const error = new Error('Invalid credentials');
            error.status = 400;    
            next(error);
            return;
        }

        const isPasswordValid = authService.checkPassword(password, user.passwordSalt, user.passwordHash);

        if(!isPasswordValid) {
            const error = new Error('Invalid credentials');
            error.status = 400;    
            next(error);
            return;
        }

        user.login().then(token => {
            res.status(200).json({ token });
        }).catch(err => {
            next(err);
        });
    });
};