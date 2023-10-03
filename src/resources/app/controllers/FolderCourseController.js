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
            var isOwn= false
            var condition = {
                attributes: ['FolderName', 'FolderImg', 'Description', 'privacry', 'CustomerID', 'FolderID'],
                raw : true,
            }
            var CustomerID = req.params.customerid
            if(CustomerID== "" || CustomerID == undefined ) throw new Error("You must be logged in")
            var CustomerIDSession= (req.session.User== undefined || req.session.User.CustomerID== "")? "": req.session.User.CustomerID
            if(CustomerIDSession == CustomerID){
                isOwn= true
                condition.where= {
                    CustomerID: CustomerID
                }
            }else{
                condition.where= {
                    CustomerID: CustomerID,
                    privacry : "public"
                }
            }
            FolderCourses.findAll(condition).then(data=>{
                if(!data) throw ("Không tìm thấy kết quả")
                res.status(200).render('course/folder_course_list',{
                    FolderCourses: data,
                    isOwn: isOwn
                })
            }).catch(err=>{
                throw err
            })
        } catch (error) {
            res.status(500).render('course/folder_course_list',{
                error: "Folder not found: "+error.message
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
                        [Op.eq]: sequelize.literal(`(SELECT TOP (1) FolderID FROM dbo.FolderCourse WHERE FolderName = N'${foldername}' and CustomerID= '${customerid}') `),
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