'use sttict';

const userModel = require('../models/user');
const uuid = require('uuid');

module.exports.create = (req, res, next) => {
    const userData = req.body;

    const user = userModel.build(Object.assign(userData, {
        id: uuid.v4(),
        isActive: true
    }));

    user.setPassword(userData.password);
    
    user.save().then(newuser => {
        res.status(201).json(newuser.getPublicInfo());
    }).catch(err => {
        next(err);
    });
};