'use strict';

const Sequelize = require('sequelize');
const db = require('../services/db');
const User = require('./user');
const Answer = require('./answer');
const _ = require('lodash');

const Topic = db.define('topic', {
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
            isValidToCreate: function(data) {
                return data && _.has(data, 'subject') && _.isString(data.subject) && _.has(data, 'message') && _.isString(data.message);
            }
        },
        instanceMethods: {

        }
    });

Topic.belongsTo(User, {
    as: 'createdByUser',
    foreignKey: {
        allowNull: false
    }
});

Topic.hasMany(Answer, {
    as: 'Answers',
    foreignKey: {
        allowNull: false
    }
});

module.exports = Topic;