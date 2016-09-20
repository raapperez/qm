'use strict';

const Sequelize = require('sequelize');
const db = require('../services/db');

const User = db.define('user', {
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    firstName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    lastName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    role: {
        type: Sequelize.ENUM,
        values: ['administrator', 'student'],
        allowNull: false
    },
    passwordHash: {
        type: Sequelize.STRING       
    },
    passwordSalt: {
        type: Sequelize.STRING
    },
    isActive: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
    }
});


module.exports = User;