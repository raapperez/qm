'use sttict';

const models = require('../models');
const {User} = models;

const uuid = require('uuid');

module.exports.create = (req, res, next) => {
    const userData = req.body;

    const user = User.build(Object.assign(userData, {
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


module.exports.get = (req, res, next) => {
    const {id} = req.params;
console.log('get');
    User.findById(id).then(user => {
        if(!user) {
            const error = new Error('Not found');
            error.status =  404;
            next(error);
            return;
        }
        res.status(200).json(user);
    }).catch(err => {
        next(err);
    });
};

module.exports.destroy = (req, res, next) => {
    const {id} = req.params;

    User.update({
        isActive: false
    }, {
        where: {id}
    }).then(result => {
        
        const success = result[0] === 1;

        if(!success) {
            const error = new Error('Not found');
            error.status = 404;
            next(error);
            return;
        }

        res.status(200).end();
    }).catch(err => {
        next(err);
    });
};