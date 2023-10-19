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
class FolderCourseController{
//FolderCourses
    //[GET]
    index= async function(req, res) {
        try {
            var isOwn= false
            // setting for search
            var condition = {
                attributes: ['FolderName', 'FolderImg', 'Description', 'privacry', 'CustomerID', 'FolderID'],
                raw : true,
            }
            // check person access this folder couser who own this one or not
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
            // get usesr
            var customer = await Customers.findOne({
                attributes: ['CustomerID', 'CustomerName', 'CustomerImg', 'Mail', 'DateOfBirth', 'Gender', 'RoleCustomer', 'Intro'],
                where:{
                    CustomerID: CustomerID
                }
            })
            if(!customer) throw new Error("User not found");
            // get FolderCourses
            FolderCourses.findAll(condition).then(data=>{
                if(!data) throw ("Không tìm thấy kết quả")
                 /*
                res.status(200).send({
                    FolderCourses: data,
                    isOwn: isOwn,
                    Customer: customer,
                    message:{
                        value: `Access ${data.length} Folder Coures`,
                        color: "green"
                    }    
                })
               */
                // attributes: ['CustomerID', 'CustomerName', 'CustomerImg', 'Mail', 'DateOfBirth', 'Gender', 'RoleCustomer'],
                res.status(200).render('course/folder_course_list',{
                    FolderCourses: data,
                    isOwn: isOwn,
                    Customer: {
                        CustomerID: customer.CustomerID,
                        CustomerName: customer.CustomerName,
                        CustomerImg: customer.CustomerImg,
                        Mail: customer.Mail,
                        DateOfBirth: customer.DateOfBirth,
                        Gender: customer.Gender,
                        RoleCustomer: customer.RoleCustomer,
                        Intro: customer.Intro
                    },
                    message:{
                        value: `Access ${data.length} Folder Coures`,
                        color: "green"
                    }, 
                    title: "Folder Course"
                })
            }).catch(err=>{
                throw err
            })
        } catch (error) {
            res.status(500).render('errorPage',{
                message:{
                    value: `ERR[${error}]Lấy danh sách thư mục không thành công!!!: ${error.message}`,
                    color: "red"
                } 
            })
        }
    }

    //[POST]
    newFolderCourse= async function(req, res){
        try {
            const {FolderName, privacry, Description}= req.body
            if(!req.session.User) throw new Error("You must be logged in")
            const CustomerID= req.session.User.CustomerID
            var FolderID 
            var folderImg= `${uuidv4()}.png`
            var foldercourses= FolderCourses.build({
                FolderImg: folderImg,
                FolderName: FolderName,
                CustomerID: CustomerID,
                Description: Description,
                privacry: privacry
            })
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

            //first way to upload file 
            //resize ảnh lưu ảnh 
            if (req.file) {
                const fileUpload = new Resize(path_prj);
                const filename = await fileUpload.save(req.file.buffer, folderImg);
            }
            
            // chuyển hướng người dùng về trang chủ  
            res.json({
                FolderCourse:{
                    FolderID: FolderID,
                    FolderName: FolderName, 
                    privacry: privacry, 
                    Description: Description,
                    FolderImg: folderImg,
                    CustomerID: CustomerID,
                },
                message:{
                    value: `Tạo thành công thư mục ${folderImg}`,
                    color: "green"
                }, 
                title: "Folder Course"
            })
        } catch (error) {
            res.json({
                message:{
                    value: `ERR[${error}]Tạo mới thư mục khóa học không thành công!!!: ${error.message}`,
                    color: "red"
                }, 
                title: "Folder Course"
            })
        }
    }
    //[PUT]
    updateFolderCourse = async function(req, res){
        try {
            var user= req.session.User 
            if( user == undefined ) throw new Error("You must be logged in  ")
            const {FolderName, privacry, Description, FolderID }= req.body
            var FolderImg =  req.file? req.file.originalname : undefined
            const folderCourse = await FolderCourses.findOne({
                where: {
                    CustomerID : user.CustomerID,
                    FolderID : FolderID
                }
            })

            if(folderCourse == undefined) throw new Error(" You don't have permission to modify")

            if(  FolderImg == undefined || FolderImg == folderCourse.FolderImg )
                FolderImg = folderCourse.FolderImg
            else                            
                FolderImg = `${uuidv4()}.png`      
            //set vị trí lưu ảnh 
            var path_prj= path.join(PROJECT_PATH(), "img", "user", user.CustomerID,"FolderCourse",''+FolderID)

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
                const filename = await fileUpload.save(req.file.buffer, FolderImg);
            }
            // build
            folderCourse.set({
                FolderImg: FolderImg,
                FolderName: FolderName,
                privacry: privacry, 
                Description: Description
            })
            await folderCourse.save().then(data =>{
                res.json({
                    message:{
                        value: `Update ${data} Folder course success!!!`,
                        color: "green"
                    },
                    FolderCourse: data,
                    CustomerID: user.CustomerID, 
                    title: "Folder Course"
                })
            }).catch(err =>{
                throw new Error(`Folder Name ${FolderName} already exists`)
            })
        } catch (error) {
            res.json({
                message:{
                    value: `ERR[${error}]Update folder course fail!!!: ${error.message}`,
                    color: "red"
                }, 
                title: "Folder Course" 
            })
        }
    }
    //[DELETE]
    deleteFolderCourse= async function(req, res){
        try {
            var user = req.session.User
            if( user == undefined ) throw new Error("You need to be logged in")
            const {id} = req.body
            FolderCourses.destroy({
                where:{
                    FolderID:{
                        [Op.in]: id
                    },
                    CustomerID: user.CustomerID
                }
            }).then(data =>{
                res.json({
                    message:{
                        value: `Đã xóa thành công ${data} FolderCourses `,
                        color: "Green"
                    }, 
                    title: "Folder Course" 
                })  
            }).catch(err =>{
                throw new Error(err.message)
            })
            
            
        } catch (error) {
            res.json({
                message:{
                    value: `ERR[${error}]Đã có lỗi xảy ra khi cố gắng xóa thư mục!!!: ${error.message}`,
                    color: "red"
                }, 
                title: "Folder Course" 
            })   
        }
    }

    //[GET]
    getElementFolderCourse = async function(req, res){
       
        try {
            const {where} = req.body
            FolderCourses.findOne(where)
            .catch(data =>{
                res.send(data)
            })
        } catch (error) {
            
        }
    }
 
}

module.exports= new FolderCourseController() 