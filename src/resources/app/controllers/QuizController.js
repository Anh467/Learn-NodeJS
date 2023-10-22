const db= require('../models')
const fs= require('fs')
const { v4: uuidv4 } = require('uuid')
const Resize = require('../../common/resize');
const path= require('path')
const dbConfig = require("../../config/db/config");
const sqlServer = dbConfig.sqlServer
const { Sequelize, Op } = require('sequelize');
const PROJECT_PATH= require('../../../public/getProjectPath');
const multer = require('multer');
const sequelize = new Sequelize(sqlServer.DB, sqlServer.USER, sqlServer.PASSWORD, {
  host: sqlServer.HOST,
  port: sqlServer.PORT,
  dialect: sqlServer.dialect,
});
const FolderCourses= db.foldercourses 
const Courses= db.courses
const Customers= db.customers
const Quizzes = db.quizzes
class CourseController{
//common
//Courses
    //[GET]
    get = async function(req, res){
      res.status(200).render('course/quiz_list')
    }
    //[GET]
    index = async function(req, res){
      try {
        await Quizzes.find()
                  .then(data =>{
                    res.status(200).send(data);
                  })
        
      } catch (error) {
          res.status(500).send('Internal Server Error: ' + error.message);
      }
    }
}

module.exports= new CourseController() 