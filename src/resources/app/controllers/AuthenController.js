const db= require('../models')
const Customer= db.customers
//
const ROLE_STUDENT= "STUDENT"
//for add image
const path= require('path')
const fs = require('fs');
const { v4: uuidv4 } = require('uuid')
const Resize = require('../../common/resize');
const PROJECT_PATH= require('../../../public/getProjectPath')
//
const ROLE_USER= "USER"

class AuthenController{
// Common
    //[GET]
    checkAuthentication=  async function(req, res, next) {
        // biến truyền qua cho trang
        var isAuthenticated , CustomerName, CustomerImg, CustomerID
        var Account, Password
        // lấy kết quả có tồn tại không
        if(req.session.User){
            Account = req.session.User.Account
            Password= req.session.User.Password
        }
        //nếu cả account và password đều tồn tại chứng tỏ đã đăng nhập
        if(Account != null && Password != null){
            console.log("#############check const {CustomerName, CustomerImg} #############")
            // lấy img và name của user
            const data= await Customer.findOne({
                attributes: ['CustomerName', 'CustomerImg', 'CustomerID'],
                where: {
                    Account: Account,
                    Password: Password
                }
            })
            if(data){
                CustomerName = data.CustomerName
                CustomerImg = data.CustomerImg
                CustomerID= data.CustomerID
            }
            // trả cho trang nào load 
            isAuthenticated = true;
        }      
        else
            isAuthenticated = false;
        // trả kết quả cho trang 
            res.locals.isAuthenticated = isAuthenticated;
            res.locals.CustomerName = CustomerName;
            res.locals.CustomerImg = CustomerImg;
            res.locals.CustomerID = CustomerID;
        console.log("##########check authentication:"+  res.locals.isAuthenticated +"###########")
        next();
      }

// Login 
    //[GET]
    index= function(req, res){
        var Account, Password
        if(req.session.User){
            Account = req.session.User.Account
            Password= req.session.User.Password
        }
        console.log("check my req.session"+ req.session.User +"\n Account: " + Account +"\n Password: " + Password)
        Customer.findOne({
            where: {
                Password: Password,
                Account: Account
            },
            raw: true 
        })
        .then( customer=>{
            if (customer==null) throw  new Error("Đăng nhập không thành công")
            res.redirect("/home")
        })
        .catch(err=>{
            res.render("authen/login")
        });
    }
    //[POST]
    login= function(req, res){
        const {Account, Password}= req.body
        console.log("check my req.body"+ Account +"\n Account: " + Account +"\n Password: " + Password)
        Customer.findOne({
            where: {
                Password: Password,
                Account: Account
            },
            raw: true 
        })
        .then( customer=>{
            if (customer==null) throw  new Error("Đăng nhập không thành công")
            req.session.User = {
                Account: customer.Account,
                Password: customer.Password,
                CustomerID: customer.CustomerID
            }
            res.redirect('/home')
        })
        .catch( err => {
                res.status(500).render('authen/login',{
                    message: "Đã có lỗi xảy ra: "+ err.message,
                    messageClass : "border border-danger"
                });
            }
        )
    } 
    
// SignUp
    //[GET]
    signup= function(req, res){
        var Account, Password
        if(req.session.User){
            Account = req.session.User.Account
            Password= req.session.User.Password
        }
        console.log("check my req.session"+ req.session.User +"\n Account: " + Account +"\n Password: " + Password)
        Customer.findOne({
            where: {
                Password: Password,
                Account: Account
            },
            raw: true 
        })
        .then( customer=>{
            if (customer==null) throw  new Error("Đăng nhập không thành công")
            res.redirect("/home")
        })
        .catch(err=>{
            res.render("authen/signup")
        });
    }
    //[POST]
    newUser=  async function(req, res) {
        const {Account, Password, CustomerName, Mail, DateOfBirth, Gender}= req.body
        try{
            var CustomerImg = `${uuidv4()}.png`
            var customerID
            var customer= Customer.build({
                Account : Account,
                Password : Password,
                CustomerName : CustomerName,
                CustomerImg: CustomerImg,
                Mail: Mail,
                DateOfBirth : DateOfBirth,
                Gender: Gender,
                RoleCustomer: ROLE_USER
            })
            await Customer.findOne({
                where: {Account: Account}
            }).then(data=>{
                if(data) throw new Error(`Tài khoản ${Account} đã tồn tại`)
            })
            await customer.save()
            .then(data=>{
                customerID= data.CustomerID
            }).catch(err=>{
                throw err
            })
            
            //set vị trí lưu ảnh 
            var path_prj= path.join(PROJECT_PATH(), "img", "user", customerID, "avatar")

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
                const filename = await fileUpload.save(req.file.buffer, CustomerImg);
            }

            // lưu đăng nhập người dùng 
            req.session.User = {
                Account: Account,
                Password: Password,
                CustomerID: customerID
            }
            
           // chuyển hướng người dùng về trang chủ  
            res.status(200).redirect('../home')
            
        }catch(err){
            res.status(500).render('authen/signup',{
                message: err.message,
                Customer: {
                    Gender: Gender,
                    Account: Account, 
                    Password:Password, 
                    CustomerName: CustomerName, 
                    Mail: Mail, 
                    DateOfBirth: DateOfBirth, 
                    Gender: Gender, 
                },
            })
        }
    }
    
// Logout
    //[post]
    logout= function(req, res) {
        
        req.session.destroy((err) => {
            if (err) {
                console.error('Lỗi khi xóa session:', err);
            } else {
                console.log('Session đã bị xóa thành công.');
            }
            res.redirect('/');
        });
    }

}
module.exports= new AuthenController