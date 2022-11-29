"use strict";

const Sequelize = require("sequelize");
const config = require(__dirname + "/../config/config.json")["development"];
const db = {};

let sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

// db.(모델스파일) = require(경로)(sequelize, Sequelize);
db.Login = require("./Login")(sequelize, Sequelize);
db.Todo = require("./Todo")(sequelize, Sequelize);
db.Calendar = require("./Calendar")(sequelize, Sequelize);
db.Shortcut = require("./Shortcut")(sequelize, Sequelize);

module.exports = db;
