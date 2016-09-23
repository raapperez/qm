'use sttict';

const models = require('../models');
const {Topic, User, Answer} = models;

const uuid = require('uuid');
const _ = require('lodash');


module.exports.create = (req, res, next) => {
    const topicData = req.body;

    if (!Topic.isValidToCreate(topicData)) {
        const error = new Error('Invalid topic\'s subject or message');
        error.status = 404;
        next(error);
        return;
    }

    const topic = Topic.build(Object.assign(topicData, {
        id: uuid.v4(),
        isDeleted: false,
        createdByUserId: req.user.id
    }));

    topic.save().then(newTopic => {
        res.status(201).json(newTopic);
    }).catch(err => {
        next(err);
    });
};


module.exports.list = (req, res, next) => {
    const {pagination} = req;

    Topic.findAll({
        where: Object.assign({}, pagination.where, {isDeleted: false}),
        order: pagination.order,
        offset: pagination.pageSize * (pagination.page - 1),
        limit: pagination.pageSize,
        include: [
            {
                model: User,
                as: 'createdByUser'
            },
            {
                model: Answer,
                as: 'answers',
                where: {isDeleted: false}
            }]
    }).then(topics => {
        res.status(200).json({
            pagination,
            data: topics
        });
    }).catch(err => {
        next(err);
    });
};


module.exports.get = (req, res, next) => {
    const {id} = req.params;

    Topic.findById(id).then(topic => {
        if (!topic) {
            const error = new Error('Not found');
            error.status = 404;
            next(error);
            return;
        }
        res.status(200).json(topic);
    }).catch(err => {
        next(err);
    });
};

module.exports.update = (req, res, next) => {
    const {id} = req.params;
    const topicData = _.omit(req.body, 'id', 'isDeleted', 'createdByUserId', 'createdAt', 'updatedAt'); // These attributes are not allowed to update


    topicData.findById(id).then(topic => {

        if (!topic) {
            const error = new Error('Not found');
            error.status = 404;
            next(error);
            return;
        }

        return topic.update(topicData).then(topic => {
            res.status(200).json(topic);
        });
    }).catch(err => {
        next(err);
    });
};

module.exports.destroy = (req, res, next) => {
    const {id} = req.params;

    Topic.update({
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