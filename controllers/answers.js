'use sttict';

const models = require('../models');
const {Topic, User, Answer} = models;

const uuid = require('uuid');
const _ = require('lodash');


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
        res.status(201).json(newAnswer);
    }).catch(err => {
        next(err);
    });
};

module.exports.list = (req, res, next) => {
    const {pagination} = req;
    const {topicId} = req.params;

    Answer.findAll({
        where: Object.assign({}, pagination.where, {isDeleted: false, topicId}),
        order: pagination.order,
        offset: pagination.pageSize * (pagination.page - 1),
        limit: pagination.pageSize,
        include: [
            {
                model: User,
                as: 'createdByUser'
            }]
    }).then(answers => {
        res.status(200).json({
            pagination,
            data: answers
        });
    }).catch(err => {
        next(err);
    });
};

module.exports.get = (req, res, next) => {
    const {id} = req.params;

    Answer.findById(id, {
        include: [
            {
                model: User,
                as: 'createdByUser'
            }
        ]
    }).then(answer => {
        if (!answer) {
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


    Answer.findById(id).then(answer => {

        if (!answer) {
            const error = new Error('Not found');
            error.status = 404;
            next(error);
            return;
        }

        return answer.update(answerData).then(answer => {
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