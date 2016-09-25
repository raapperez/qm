'use strict';

const _ = require('lodash');

module.exports = (sequelize, Sequelize) => {
    const Topic = sequelize.define('Topic', {
        id: {
            type: Sequelize.UUID,
            primaryKey: true
        },
        subject: {
            type: Sequelize.STRING,
            allowNull: false
        },
        message: {
            type: Sequelize.STRING,
            allowNull: false
        },
        isDeleted: {
            type: Sequelize.BOOLEAN,
            defaultValue: false,
            allowNull: false
        }
    },
        {
            classMethods: {
                isValidToCreate: function (data) {
                    return data && _.has(data, 'subject') && _.isString(data.subject) && _.has(data, 'message') && _.isString(data.message);
                },
                associate: function (models) {

                    Topic.belongsTo(models.User, {
                        as: 'author',
                        foreignKey: {
                            name: 'createdByUserId',
                            allowNull: false
                        }
                    });

                    Topic.hasMany(models.Answer, {
                        as: 'answers',
                        foreignKey: {
                            name: 'topicId',
                            allowNull: false
                        }
                    });
                },
                isOwner: function (userId, id) {
                    return Topic.findById(id).then(topic => {
                        if (!topic) {
                            const error = new Error('Not found');
                            error.status = 404;
                            throw error;
                        }

                        return topic.createdByUserId === userId;
                    });
                }
            },
            instanceMethods: {

            }
        }
    );

    return Topic;
};