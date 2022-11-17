'use strict';

const Sequelize = require('sequelize');
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

let sequelize = new Sequelize(config.database, config.username, config.password, config);


db.sequelize = sequelize;
db.Sequelize = Sequelize;

// db.Visitor = require('./Visitor')(sequelize, Sequelize);
// db.Login = require('./Login')(sequelize, Sequelize);
// db.(모델스파일) = require(경로)(sequelize, Sequelize);

module.exports = db;
