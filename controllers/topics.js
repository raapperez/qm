'use sttict';

const models = require('../models');
const {Topic, User, Answer} = models;

const uuid = require('uuid');
const _ = require('lodash');
const sequelize = require('sequelize');


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

    const where = Object.assign({ isDeleted: false }, pagination.where);
    const order = [['createdAt', 'DESC']];

    Promise.all([
        Topic.count({ where }),
        Topic.findAll({
            where,
            order,
            offset: pagination.pageSize * (pagination.page - 1),
            limit: pagination.pageSize,
            include: [
                {
                    model: User,
                    as: 'author'
                },
                {
                    model: Answer,
                    as: 'answers',
                    where: { isDeleted: false },
                    required: false,
                    include: [
                        {
                            model: User,
                            as: 'author'
                        }
                    ]
                }]
        })
    ]).then(_.spread((count, topics) => {
        pagination.total = count;
        pagination.totalPages = Math.ceil(count / pagination.pageSize);
        res.status(200).json({
            pagination,
            data: topics
        });
    })).catch(err => {
        next(err);
    });
};


module.exports.get = (req, res, next) => {
    const {id} = req.params;

    if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(id)) {
        const error = new Error('Invalid topic\'s id');
        error.status = 400;
        next(error);
        return;
    }

    Topic.findById(id, {
        include: [
            {
                model: Answer,
                as: 'answers',
                include: [
                    {
                        model: User,
                        as: 'author'
                    }
                ]
            }
        ],
        order: [
            [{ model: Answer, as: 'answers' }, 'createdAt', 'DESC']
        ]
    }).then(topic => {
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