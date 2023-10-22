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
  //const mongooseDB = require('../../config/db')
  mongoose.connect( mongoDB.url +'/' + mongoDB.DB )
// connect
  //mongooseDB.connect()
// declare model db for store
const db = {};
// model of Sequelize
db.Sequelize = Sequelize;
db.sequelize = sequelize;
// add to store in variable db
  // sql
  const customers = require("./customer")(sequelize, Sequelize)
  const foldercourses = require("./foldercourse")(sequelize, Sequelize)
  const courses = require("./course")(sequelize, Sequelize)
  // nosql
  const quizzes = require("./quiz")
  // add
  db.customers = customers
  db.foldercourses = foldercourses
  db.courses = courses
  db.quizzes =  quizzes
// model of Mongoose
module.exports = db;