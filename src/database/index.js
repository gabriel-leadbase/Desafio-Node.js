const { Sequelize } = require('sequelize');

const dbConfig = require('../config/database.js');

const connection = new Sequelize(dbConfig);

module.exports = connection;
