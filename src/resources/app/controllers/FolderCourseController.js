const db= require('../models')
const fs= require('fs')
const Resize = require('../../common/resize');
const path= require('path')
const dbConfig = require("../../config/db/config");
const { Sequelize, Op } = require('sequelize');
const PROJECT_PATH= require('../../../public/getProjectPath')
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  port: dbConfig.PORT,
  dialect: dbConfig.dialect,
});
const FolderCourses= db.foldercourses
const Courses= db.courses
class CustomerController{
    
//FolderCourses
    //[GET]
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

    //[POST]
    newFolderCourse= async function(req, res){
        const {FolderName, privacry, Description, FolderImage}= req.body
        if(!req.session.User) throw new Error("You must be logged in")
        const CustomerID= req.session.User.CustomerID
        var FolderID
        try {
            
            var foldercourses= FolderCourses.build({
                FolderImage: req.file?req.file.originalname: "",
                FolderName: FolderName,
                CustomerID: CustomerID,
                Description: Description
            })
            console.log("Check type img:"+typeof FolderImage)
            console.log("Check type img buffer :"+typeof FolderImage.buffer)
            await FolderCourses.findOne({
                where:{
                    FolderName: FolderName,
                    CustomerID: CustomerID
                }
            }).then(data => {
                if( data ) 
                    throw new Error(`Thư mục với tên là ${FolderName} đã tồn tại`)
            })

            await foldercourses.save()
                        .then(data => {
                            if(data)
                                FolderID= data.FolderID
                            else throw new Error(`Đã có lỗi xảy ra, tạo thư mục khóa học mới không thành công`)
                        })
                        .catch(err =>{
                            throw new Error(err.message)
                        })
            //set vị trí lưu ảnh 
            var path_prj= path.join(PROJECT_PATH(), "img", "user", CustomerID,"FolderCourse",''+FolderID)
            // tạo folder nếu nó k tồn tại 
            if (!fs.existsSync(path_prj)) 
            try {
                fs.mkdirSync(path_prj, { recursive: true });
            } catch (error) {
                throw new ('Lỗi khi tạo thư mục:', error);
            }
            //

            
                //first way to upload file 
            
                //resize ảnh lưu ảnh 
                if (req.fileUpload) {
                    const fileUpload = new Resize(path_prj);
                    const filename = await fileUpload.save(req.file.buffer, req.file.originalname);
                }
            
            // chuyển hướng người dùng về trang chủ  
            res.json({
                FolderName: FolderName, 
                privacry: privacry, 
                Description: Description 
            })
        } catch (error) {
            res.json({
                message: "Tạo mới thư mục khóa học không thành công!!!: "+error.message,
                FolderCourses:{
                    FolderName: FolderName,
                    privacry: privacry, 
                    Description: Description,
                }
            })
        }
    }
//Courses
    //[GET]
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