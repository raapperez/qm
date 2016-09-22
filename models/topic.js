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
                        foreignKey: 'createdByUserId'
                    });

                    Topic.hasMany(models.Answer, {
                        foreignKey: 'topicId'
                    });
                }
            },
            instanceMethods: {

            }
        }
    );

    return Topic;
};