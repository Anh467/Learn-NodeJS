const db= require('../models')
const dbConfig = require("../../config/db/config");
const { Sequelize, Op } = require('sequelize');
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  port: dbConfig.PORT,
  dialect: dbConfig.dialect,
});
const FolderCourses= db.foldercourses
const Courses= db.courses
class CustomerController{
    index=  function(req, res) {
        try {
            var CustomerID = req.params.customerid
            if(CustomerID== "" || CustomerID == undefined ) throw new Error("U must be logged in")
            FolderCourses.findAll({
                attributes: ['FolderName', 'FolderImg', 'Description', 'privacry', 'CustomerID', 'FolderID'],
                raw : true,
                where:{
                    CustomerID: CustomerID
                }
            }).then(data=>{
                res.status(200).render('course/folder_course_list',{
                    FolderCourses: data
                })
            }).catch(err=>{
                throw err
            })
        } catch (error) {
            res.status(500).render('course/folder_course_list',{
                error: "Folder not found: "
            })
        }
    }

    course= function(req, res) {
        const customerid= req.params.customerid
        const foldername= req.params.foldername
        try{
            Courses.findAll({
                where: {
                    FolderID: {
                        [Op.eq]: sequelize.literal(`(SELECT TOP (1) FolderID FROM dbo.FolderCourse WHERE FolderName = '${foldername}' and CustomerID= '${customerid}') `),
                      },
                  },
                raw : true,
            }).then(data =>{
                res.status(200).render('course/course_list',{
                    Courses: data,
                    CustomerID:customerid,
                    FolderName: foldername
                })
            }).catch(err=>{
                throw err
            })
        }catch(error){
            res.status(500).render('course/course_list',{
                error: "Folder not found: "
            })
        }
    }
}

module.exports= new CustomerController()