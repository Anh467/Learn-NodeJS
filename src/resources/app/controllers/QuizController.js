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
      try {
        const courseid = req.params.courseid
        await Quizzes.findOne({
                      courseid: courseid
                    }) //findById(quizzesid)
                  .then(data =>{
                    if(data == undefined) throw new Error("Can't find data")
                    if(data.length == 0) throw  new Error('Get list quiz failed');
                    res.status(200).send({
                      quizzes: data,
                      title: "Quiz"
                    });
                  })
        
      } catch (error) {
        res.status(500).send({
          message:{
              value: `${error.message}`,
              color: "red"
          },
          title: "Quiz"
        })
      }
    }
    //[GET]
    index = async function(req, res){
      try {
        // get request params
        const customerid = req.params.customerid
        const coursename = req.params.coursename
        const foldername = req.params.foldername
        // res CourseID / CourseName / CustomerID / QuizzesID
        const course = await Courses.findOne({
          attributes: [ 'CourseName', 'CourseID', 'QuizzesID'],
          where :{
            CourseName: coursename,
            FolderID: {
              [Op.eq]: sequelize.literal(`(select FolderID
                                        from dbo.FolderCourse
                                        where CustomerID = '${customerid}' and FolderName = N'${foldername}')`),
            }
          },
          raw : true
        })
        /*
        res.status(200).render('course/quiz_list',{
          CourseID: customerid,
          CourseName: coursename,
        })
        */
        res.status(200).render('course/quiz_list',{
          CourseID: course.CourseID,
          CourseName: course.CourseName,
          CustomerID: customerid,
          QuizzesID: course.QuizzesID
        })  
      } catch (error) {
        res.status(500).render('course/quiz_list',{
          message:{
              value: `${error.message}`,
              color: "red"
          },
          title: "Quiz"
      })
      }
    }
}

module.exports= new CourseController() 