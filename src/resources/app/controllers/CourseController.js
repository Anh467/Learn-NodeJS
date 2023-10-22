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
class CourseController{
//common
//Courses
    //[GET]
    course= async function(req, res) {
        // init for own this course 
        var isOwn= false
        // get param 
        const foldername= req.params.foldername
        // get user's customerid who own this one 
        const customerid=  req.params.customerid
        try{
            var CustomerIDSession = req.session.User? req.session.User.CustomerID : undefined
            var condition = {
                raw : true,
            }
            var folderCourse = await FolderCourses.findOne({
                attributes: ['FolderID'],
                where:{
                    FolderName: foldername,
                    CustomerID : customerid
                }
            })
            // check this user is own this course 
            if(CustomerIDSession == customerid){
                isOwn= true
                condition.where= {
                    FolderID: folderCourse.FolderID
                }
            }else{
                condition.where= {
                    FolderID: folderCourse.FolderID,
                    privacry : "public"
                }
            }
            Courses.findAll(condition).then(data =>{
                res.status(200).render('course/course_list',{
                    Courses: data,
                    CustomerID: customerid,
                    FolderName: foldername,
                    FolderID: folderCourse.FolderID,
                    isOwn: isOwn,
                    title: "Course"
                })
            }).catch(err=>{
                throw err
            })
        }catch(error){
            res.status(500).render('course/course_list',{
                message:{
                    value: `ERR[${error}]Tạo mới thư mục khóa học không thành công!!!: ${error.message}`,
                    color: "red"
                },
                title: "Course"
            })
        }
    }
    //[POST]
    newCourse = async function(req, res){
        try{
            // get param
            const customerid= req.params.customerid
            const foldername= req.params.foldername
            // get req body 
            const {FolderID, FolderName, privacry, Description}= req.body
            //check login 
            if(!req.session.User) throw new Error("You must be logged in")
            const CustomerID= req.session.User.CustomerID
            // check permission 
            if (customerid != CustomerID) throw new Error("You don't have permission to create")
            var CourseID 
            var courseImg= `${uuidv4()}.png`
            var courses= Courses.build({
                FolderID: FolderID,
                CourseImg: courseImg,
                CourseName: FolderName,
                Description: Description,
                privacry: privacry
            }) 
            await Courses.findOne({
                where:{
                    CourseName: FolderName,
                    FolderID: FolderID
                }
            }).then(data => {
                if( data ) 
                    throw new Error(`Khóa học với tên là ${FolderName} đã tồn tại`)
            })

            await courses.save({
                raw: true
            }).then(data => {
                            if(data)
                                CourseID= data.CourseID
                            else throw new Error(`Đã có lỗi xảy ra, tạo thư mục khóa học mới không thành công`)
                        })
                        .catch(err =>{
                            throw new Error(err.message)
                        })
            //set vị trí lưu ảnh 
            var path_prj= path.join(PROJECT_PATH(), "img", "user", CustomerID,"FolderCourse",''+FolderID, ''+CourseID)
            // tạo folder nếu nó k tồn tại 
            if (!fs.existsSync(path_prj)) 
                try {
                    fs.mkdirSync(path_prj, { recursive: true });
                } catch (error) {
                    throw new ('Lỗi khi tạo thư mục:', error);
                }

            //first way to upload file 
            //resize ảnh lưu ảnh 
            if (req.file) {
                const fileUpload = new Resize(path_prj);
                const filename = await fileUpload.save(req.file.buffer, courseImg);
            }
            
            // chuyển hướng người dùng về trang chủ  
            res.json({
                Course:courses,
                message:{
                    value: `Tạo thành công thư mục ${FolderName}`,
                    color: "green"
                }, 
                title: "Folder Course",
                CustomerID: CustomerID,
                FolderID: FolderID, 
                FolderName: foldername
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
    //[PUT]
    updateCourse = async function(req, res){
        try{
               
            // get param
            const customerid= req.params.customerid
            const foldername= req.params.foldername
            // get req body 
            const {CourseID, FolderID, FolderName, privacry, Description}= req.body
            // get session
            const user = req.session.User
            const customerIDSession = user? user.CustomerID : undefined
            // check login
            if(!customerIDSession) throw new Error("You must log in to update")
            // check permission
            if(customerIDSession != customerid) throw new Error("You don't have permission to update")
            // get course
            var course = await Courses.findOne({
                where:{
                    CourseID: CourseID
                }
            })
            // get image name
            var couresImg =  req.file? req.file.originalname : undefined
            if(  couresImg == undefined || couresImg == course.FolderImg )
                couresImg = course.CourseImg
            else                            
                couresImg = `${uuidv4()}.png`
            //set vị trí lưu ảnh 
            var path_prj= path.join(PROJECT_PATH(), "img", "user", customerid,"FolderCourse",''+FolderID, ''+CourseID)

            // tạo folder nếu nó k tồn tại 
            if (!fs.existsSync(path_prj)) 
                try {
                    fs.mkdirSync(path_prj, { recursive: true });
                } catch (error) {
                    throw new ('Lỗi khi tạo thư mục:', error);
                }

            //resize ảnh lưu ảnh 
            if (req.file) {
                const fileUpload = new Resize(path_prj);
                const filename = await fileUpload.save(req.file.buffer, couresImg);
            }
            // build
            course.set({
                CourseImg: couresImg,
                CourseName: FolderName,
                privacry: privacry, 
                Description: Description
            })   
            // save
            await course.save().then(data =>{
                res.json({
                    message:{
                        value: `Update ${data} Folder course success!!!`,
                        color: "green"
                    },
                    Course: data,
                    CustomerID: customerid, 
                    title: "Course",
                    FolderID: FolderID
                })
            }).catch(err =>{
                throw new "CourseName already exists"
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