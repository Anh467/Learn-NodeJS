const db= require('../models')
//for add image
const path= require('path')
const fs = require('fs');
const { v4: uuidv4 } = require('uuid')
const Resize = require('../../common/resize');
const PROJECT_PATH= require('../../../public/getProjectPath');
const customer = require('../models/customer');
//
const Customer= db.customers
class CustomerController{
    index=  async (req, res) => {
        // let limit  = req.params.limit
        // let offset  = req.params.offset
        try {
            var user = req.session.User
            if( user == undefined ) throw new Error("You must login to review your profile")
            //res.render('customer/CustomerInfor')
            await Customer.findOne({
                attributes: ['CustomerID', 'CustomerName', 'CustomerImg', 'Mail', 'DateOfBirth', 'Gender', 'RoleCustomer'],
                where:{
                    CustomerID: user.CustomerID
                },
                raw: true
            }).then(data =>{
               //res.status(200).send({Customer : data})
               console.log(data.CustomerID)
               //'customer/CustomerInfor', 
                res.status(200).render('customer/CustomerInfor', {
                                        Customer : data
                                    })
            }).catch(err =>{
                throw new Error(err)
            })
        } catch (error) {
            res.status(500).render( 'home', {
                message:{
                    value: `ERR[${error}]Đã có lỗi xảy ra: ${error.message}`,
                    color: "red"
                } 
            });
        }
        
        //res.render('news')
    }

    update = async (req, res) => {
        const{ CustomerName, Mail, DateOfBirth, Gender, CustomerImg} = req.body
        try {
            var user = req.session.User 
            if( user == undefined ) throw new Error('You must be logged in')
            var imgName= CustomerImg
            const customer= await Customer.findOne({
                                                where: {
                                                    CustomerID: user.CustomerID
                                                }
                                            })
            if(  imgName == undefined || imgName == customer.CustomerImg )
                imgName = customer.CustomerImg
            else                            
                imgName = `${uuidv4()}.png`      
            //set vị trí lưu ảnh 
            var path_prj= path.join(PROJECT_PATH(), "img", "user", user.CustomerID, "avatar")

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
                const filename = await fileUpload.save(req.file.buffer, imgName);
            }
            // update user              
            customer.set({
                CustomerName: CustomerName,
                Mail: Mail,
                DateOfBirth: DateOfBirth,
                Gender: Gender,
                CustomerImg: imgName
            })              
            
            await customer.save().then(data=>{
                res.redirect('/customer')
            }).catch(err => {
                throw new Error(err.message)
            })
        } catch (error) {
            res.status(500).render( 'home', {
                message:{
                    value: `ERR[${error}]Đã có lỗi xảy ra: ${error.message}`,
                    color: "red"
                } 
            });
        }
    }

    userProfile = async (req, res) => {
        try {
            // get param id user
            var customerID = req.params.customerid
            // get session id user
            var user = req.session.user
            var customerIDSession = user ? user.CustomerID : undefined
            // get customer information
            var customer = await Customer.findOne({
                attributes: ['CustomerID', 'CustomerName', 'CustomerImg', 'Mail', 'DateOfBirth', 'Gender', 'RoleCustomer'],
                where:{
                    CustomerID: customerID
                }
            })
            // check existing of user
            if(!customer)  throw new Error("User not found")
            // res
            res.status(200).render('customer/CustomerProfile',{
                isOwn: (customerID == customerIDSession),
                customer: {
                    CustomerID: customer.CustomerID,
                    CustomerImg: customer.CustomerImg,
                    CustomerName: customer.CustomerName,
                    Mail: customer.Mail,
                    DateOfBirth: customer.DateOfBirth,
                }
            })
        } catch (error) {
            res.status(500).render('customer/CustomerProfile',{
                message:{
                    value: `ERR: Access user profile fail!!!: ${error.message}`,
                    color: "red"
                } 
            })
        }
    }
}

module.exports= new CustomerController()