'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(module.filename);
const env = process.env.NODE_ENV || 'development';
const config = require('../configs/config.json')[env];

const {user, password, database, options} = config.db;
const sequelize = new Sequelize(database, user, password, options);

const db = {};

fs.readdirSync(__dirname)
    .filter(file => ((file.indexOf('.') !== 0) && (file !== basename)))
    .forEach(file => {
        const model = sequelize.import(path.join(__dirname, file));
        db[model.name] = model;
    });

Object.keys(db).forEach(modelName => {
    if ('associate' in db[modelName]) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;