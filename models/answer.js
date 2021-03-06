'use strict';

const _ = require('lodash');

module.exports = (sequelize, Sequelize) => {
    const Answer = sequelize.define('Answer', {
        id: {
            type: Sequelize.UUID,
            primaryKey: true
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
                    return data && _.has(data, 'message') && _.isString(data.message) && _.has(data, 'topicId') && _.isString(data.topicId);
                },
                associate: function (models) {
                    Answer.belongsTo(models.User, {
                        as: 'author',
                        foreignKey: {
                            name: 'createdByUserId',
                            allowNull: false
                        }
                    });

                    Answer.belongsTo(models.Topic, {
                        foreignKey: {
                            name: 'topicId',
                            allowNull: false
                        }
                    });
                },
                isOwner: function (userId, id) {
                    return Answer.findById(id).then(answer => {
                        if (!answer) {
                            const error = new Error('Not found');
                            error.status = 404;
                            throw error;
                        }

                        return answer.createdByUserId === userId;
                    });
                }
            },
            instanceMethods: {}
        }
    );

    return Answer;
};