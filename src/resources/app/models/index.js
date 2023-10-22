// mongoose library
const mongoose = require('mongoose')
// sequelize library
const Sequelize = require("sequelize");
// get config 
const dbConfig = require("../../config/db/config");
// get config sqlserver
const sqlServer = dbConfig.sqlServer
// get config mongoose
const mongoDB = dbConfig.mongoDB
// connect to db(sql) by sequelize orm 
const sequelize = new Sequelize(sqlServer.DB, sqlServer.USER, sqlServer.PASSWORD, {
  host: sqlServer.HOST,
  port: sqlServer.PORT,
  dialect: sqlServer.dialect,
});
// connect to db(nosql) by mongoose orm 

// declare model db for store
const db = {};
// model of Sequelize
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.customers = require("./customer")(sequelize, Sequelize);
db.foldercourses = require("./foldercourse")(sequelize, Sequelize);
db.courses = require("./course")(sequelize, Sequelize);
// model of Mongoose
module.exports = db;