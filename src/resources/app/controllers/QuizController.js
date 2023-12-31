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
const CheckPrivacy = require('../../common/checkPrivacy')
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
    //[DELETE]
    delete = async function(req, res){
      try {
        // get req params
        const {quizzesid, index} = req.params
        // delete
        // unset
        var quiz= await Quizzes.updateOne({
                                            _id: quizzesid
                                          }, {
                                            $unset : { 
                                              [`questions.${index}`]: 1
                                            }
                                          }, { 
                                              new: true 
                                            });
        // delete null
        var quiz= await Quizzes.findOneAndUpdate({
                                            _id: quizzesid
                                          }, {
                                            $pull : { 
                                              questions: null
                                            }
                                          }, { 
                                              new: true 
                                            });
        // res
        res.status(200).send({
          delete: "done",
          quiz: quiz,
          message:{
            value: `Lấy thành công`,
            color: "green"
          }
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
    //[POST]
    create = async function(req, res){
      try {
        // get req params
        const {quizzesid} = req.params
        // get req body
        const {param} = req.body
        //
        var temp = `questions`
        const filter = { _id: quizzesid }; 
        const create = {
          $push: { [temp]: param } 
        };
        // update
        var quiz= await Quizzes.findOneAndUpdate(filter, create, { new: true });
        res.status(200).json({
                              quiz:quiz,
                              message:{
                                value: `Tạo thành công`,
                                color: "green"
                              }
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
    //[PUT]
    update = async function(req, res){
      try {
        // get req params
        const {quizzesid, index} = req.params
        // get req body
        const {param} = req.body
        //
        var temp = `questions.${index}`
        const filter = { _id: quizzesid }; 
        const update = {
          $set: { [temp]: param } 
        };
        // update
        var quiz= await Quizzes.findOneAndUpdate(filter, update, { new: true });
        res.status(200).json({
          quiz: quiz,
          message:{
            value: `Cập nhật thành công`,
            color: "green"
          },
        });
      } catch (error) {
        res.status(500).send({
          message:{
              value: `Cập nhật thất bại:${error.message}`,
              color: "red"
          },
          title: "Quiz"
        })
      }
    }
    //[GET]
    gets = async function(req, res){
      try {
        const quizzesid = req.params.quizzesid
        await Quizzes.findById(quizzesid)
                    .then(data =>{
                      if(data == undefined) throw new Error("Can't find data")
                      if(data.length == 0) throw  new Error('Get list quiz failed');
                      res.status(200).send({
                        quizzes: data,
                        title: "Quiz",
                        message:{
                          value: `Truy cập thành công`,
                          color: "green"
                        },
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
      // get session
      const User= req.session.User
      const customerIDSession = (User) ? User.CustomerID : undefined
      // get request params
      const customerid = req.params.customerid
      const coursename = req.params.coursename
      const foldername = req.params.foldername
      try {
        
        
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
        if (customerIDSession != customerid){
          if(!await CheckPrivacy(customerid, foldername, coursename))
          res.status(500).render('errorPage',{
              message:{
                  value: `Bạn không có quyền truy cập khoá học ${course.CourseName} của người dùng ${customerid}`,
                  color: "red"
              },
          })
       }
        
        res.status(200).render('course/quiz_list',{
          CourseID: course.CourseID,
          CourseName: course.CourseName,
          CustomerID: customerid,
          QuizzesID: course.QuizzesID,
          isOwn: (customerIDSession == customerid),
          
        })  
      } catch (error) {
        res.status(500).render('course/quiz_list',{
          message:{
              value: `${error.message}`,
              color: "red"
          },
          title: "Quiz",
          isOwn: (customerIDSession == customerid)
      })
      }
    }
}

module.exports= new CourseController() 