'use strict';

const Sequelize = require('sequelize');
const db = require('../services/db');
const User = require('./user');

const Answer = db.define('answer', {
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
});

Answer.belongsTo(User, {as: 'createdByUser'});

module.exports = Answer;