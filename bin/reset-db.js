#!/usr/bin/env node

const env = process.env.NODE_ENV || 'development';
const config = require('../configs/config.json')[env];
const logger = require('winston');
const bb = require('bluebird');

function configureLog() {
    logger.level = config.winston.level || 'error';
    logger.add(logger.transports.File, {
        filename: __dirname + '/../logs/qm-reset-db.log',
        json: false,
        maxFiles: 10,
        maxsize: 5242880,
        colorize: false
    });

    if (env === 'production') {
        logger.remove(logger.transports.Console);
    }
}

configureLog();


const User = require('../models/user');
const Topic = require('../models/topic');
const Answer = require('../models/answer');

bb.each([User, Topic, Answer], item => {
    return item.sync({ force: true });
}).catch(err => {
    logger.log(err);
});