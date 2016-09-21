'use strict';

const env = process.env.NODE_ENV || 'development';
const config = require('../configs/config')[env];
const Sequelize = require('sequelize');
const db = require('../services/db');
const authService = require('../services/auth');
const _ = require('lodash');
const jwt = require('jsonwebtoken');
const SHA256 = require('crypto-js/sha256');

const expiresIn = 3.154e+7;

const User = db.define('user', {
    id: {
        type: Sequelize.UUID,
        primaryKey: true
    },
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
        values: ['admin', 'student'],
        allowNull: false
    },
    passwordHash: {
        type: Sequelize.STRING
    },
    passwordSalt: {
        type: Sequelize.STRING
    },
    loginTokenHash: {
        type: Sequelize.STRING
    },
    isActive: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
        allowNull: false
    }
},
    {
        classMethods: {

        },
        instanceMethods: {
            setPassword: function (password) {
                const {hash, salt} = authService.encryptPassword(password);
                this.passwordHash = hash;
                this.passwordSalt = salt;
            },
            getPublicInfo: function () {
                return _.omit(this.dataValues, 'passwordHash', 'passwordSalt', 'loginTokenHash');
            },
            login: function () {
                const payload = {
                    id: this.id,
                    role: this.role
                };
                return new Promise((resolve, reject) => {
                    jwt.sign(payload, config.authSecret, {
                        expiresIn
                    }, (err, token) => {
                        if (err) {
                            reject(err);
                            return;
                        }
                        this.loginTokenHash = SHA256(token).toString();

                        this.save().then(() => {
                            resolve(token);
                        }).catch(reject);
                    });
                });
            }
        }
    }
);



module.exports = User;