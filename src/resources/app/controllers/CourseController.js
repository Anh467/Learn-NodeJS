const db= require('../models')
const fs= require('fs')
const { v4: uuidv4 } = require('uuid')
const Resize = require('../../common/resize');
const path= require('path')
const dbConfig = require("../../config/db/config");
const { Sequelize, Op } = require('sequelize');
const PROJECT_PATH= require('../../../public/getProjectPath');
const multer = require('multer');
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  port: dbConfig.PORT,
  dialect: dbConfig.dialect,
});
const FolderCourses= db.foldercourses 
const Courses= db.courses
const Customers= db.customers
class CourseController{
//common
//Courses
    //[GET]
    course= async function(req, res) {
        // init for own this course 
        var isOwn= false
        // get param 
        const foldername= req.params.foldername
        // get foldercourse 
        var customerOwnCourse =  await FolderCourses.findOne({
            attributes: ['CustomerID'],
            where :{        
                FolderID: {
                    [Op.eq]: sequelize.literal(`(SELECT TOP (1) FolderID FROM dbo.FolderCourse WHERE FolderName = N'${foldername}')`),
                }
            }
        })
        // get user's customerid who own this one 
        const customerid=  customerOwnCourse.CustomerID
        try{
            var CustomerIDSession = req.session.User? req.session.User.CustomerID : undefined
            var condition = {
                raw : true,
            }
            // check this user is own this course 
            if(CustomerIDSession == customerid){
                isOwn= true
                condition.where= {
                    FolderID: {
                        [Op.eq]: sequelize.literal(`(SELECT TOP (1) FolderID FROM dbo.FolderCourse WHERE FolderName = N'${foldername}' and CustomerID= '${customerid}') `),
                      },
                }
            }else{
                condition.where= {
                    FolderID: {
                        [Op.eq]: sequelize.literal(`(SELECT TOP (1) FolderID FROM dbo.FolderCourse WHERE FolderName = N'${foldername}' and CustomerID= '${customerid}') `),
                      },
                    privacry : "public"
                }
            }
            Courses.findAll(condition).then(data =>{
                res.status(200).render('course/course_list',{
                    Courses: data,
                    CustomerID: customerid,
                    FolderName: foldername,
                    isOwn: isOwn
                })
            }).catch(err=>{
                throw err
            })
        }catch(error){
            res.status(500).render('course/course_list',{
                message:{
                    value: `ERR[${error}]Tạo mới thư mục khóa học không thành công!!!: ${error.message}`,
                    color: "red"
                } 
            })
        }
    }
    //[POST]
    newCourse = async function(req, res){
        try{

        }catch(err){
            res.json({
                message:{
                    value: `ERR There are some error happen!!!: ${error.message}`,
                    color: "red"
                } 
            })
        }
    } 
    //[PUT]
    updateCourse = async function(req, res){
        try{

        }catch(err){
            res.json({
                message:{
                    value: `ERR There are some error happen!!!: ${error.message}`,
                    color: "red"
                } 
            })
        }
    } 
    //[DELETE]
    deleteCourse = async function(req, res){
        try{
            // get body 
            const {id} = req.body
            //[Op.eq]: sequelize.literal(`(SELECT TOP (1) FolderID FROM dbo.FolderCourse WHERE FolderName = N'${foldername}' and CustomerID= '${customerid}') `),
            // get user session
            const customerID = req.session.User? req.session.User.CustomerID : undefined
            // get user own this course
            const folderCourse = await FolderCourses.findOne({
                attributes: ['CustomerID'],
                where :{
                    FolderID: {
                        [Op.eq]: sequelize.literal(`( select top(1) FolderID from dbo.Course where CourseID = ${id[0]} )`),
                    }
                },
                raw : true
            })
            if(!folderCourse.CustomerID == customerID) 
                throw new Error("You don't own all of these courses")
            // get delete courselist 
            await Courses.destroy({
                attributes :['CourseID', 'FolderID', 'CourseName', 'CourseImg', 'Description', 'privacry'],
                where: {
                    CourseID:{
                        [Op.in]: id
                    }
                },
            }).then(data =>{
                res.json({
                    message:{
                        value: `You deleted ${data} courses`,
                        color: "green"
                    } 
                })
            })
        }catch(err){
            res.json({
                message:{
                    value: `ERR There are some error happen!!!: ${err.message}`,
                    color: "red"
                } 
            })
        }
    } 
}

module.exports= new CourseController() 