const dbConfig = require("../../config/db/config");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  port: dbConfig.PORT,
  dialect: dbConfig.dialect,
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.customers = require("./customer")(sequelize, Sequelize);
db.foldercourses = require("./foldercourse")(sequelize, Sequelize);
db.courses = require("./course")(sequelize, Sequelize);
module.exports = db;