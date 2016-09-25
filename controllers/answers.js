'use sttict';

const models = require('../models');
const {Topic, User, Answer} = models;

const uuid = require('uuid');
const _ = require('lodash');

const include = [
    {
        model: User,
        as: 'author'
    }
];

module.exports.create = (req, res, next) => {
    const answerData = Object.assign({}, req.body, { topicId: req.params.topicId });

    if (!Answer.isValidToCreate(answerData)) {
        const error = new Error('Invalid answer\'s message or wrong value for pair (answerId, topicId)');
        error.status = 404;
        next(error);
        return;
    }

    const answer = Answer.build(Object.assign(answerData, {
        id: uuid.v4(),
        isDeleted: false,
        createdByUserId: req.user.id
    }));

    answer.save().then(newAnswer => {
        return Answer.findById(newAnswer.id, { include }).then(result => {
            res.status(201).json(result);
        });
    }).catch(err => {
        next(err);
    });
};

module.exports.get = (req, res, next) => {
    const {id} = req.params;

    Answer.findById(id, {
        include
    }).then(answer => {
        if (!answer || answer.isDeleted) {
            const error = new Error('Not found');
            error.status = 404;
            next(error);
            return;
        }

        res.status(200).json(answer);
    }).catch(err => {
        next(err);
    });
};

module.exports.update = (req, res, next) => {
    const {id} = req.params;
    const answerData = _.omit(req.body, 'id', 'isDeleted', 'createdByUserId', 'createdAt', 'updatedAt', 'topicId'); // These attributes are not allowed to update

    Answer.update(answerData, {
        where: { id }
    }).then(() => {

        return Answer.findById(id, {
            include
        }).then(answer => {

            if (!answer || answer.isDeleted) {
                const error = new Error('Not found');
                error.status = 404;
                next(error);
                return;
            }

            res.status(200).json(answer);
        });

    }).catch(err => {
        next(err);
    });
};

module.exports.destroy = (req, res, next) => {
    const {id} = req.params;

    Answer.update({
        isDeleted: true
    }, {
            where: { id }
        }).then(result => {

            const success = result[0] === 1;

            if (!success) {
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