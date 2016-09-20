'use strict';

const env = process.env.NODE_ENV || 'development';
const config = require('../configs/config.json')[env];
const Sequelize = require('sequelize');

const {user, password, database, options} = config.db;

const sequelize = new Sequelize(database, user, password, options);

// sequelize
//   .authenticate()
//   .then(function(err) {
//     console.log('Connection has been established successfully.');
//   })
//   .catch(function (err) {
//     console.log('Unable to connect to the database:', err);
//   });


module.exports = sequelize;