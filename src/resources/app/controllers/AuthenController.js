const db= require('../models')
const path= require('path')
const fs = require('fs');
const ROLE_STUDENT= "STUDENT"
const ROLE_USER= "USER"
const Resize = require('../../common/resize');
const PROJECT_PATH= require('../../../public/getProjectPath')
const Customer= db.customers
class AuthenController{
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
    newUser=  async function(req, res) {
        try{
            const {Account, Password, CustomerName, Mail, DateOfBirth, Gender, CustomerImg}= req.body
            var customerID
            var customer= Customer.build({
                Account : Account,
                Password : Password,
                CustomerName : CustomerName,
                CustomerImg: req.file.originalname,
                Mail: Mail,
                DateOfBirth : DateOfBirth,
                Gender: Gender,
                RoleCustomer: ROLE_USER
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
            //resize ảnh
            const fileUpload = new Resize(path_prj);
            if (!req.file) {
                throw new Error('Please provide an image')
            }
            req.session.User = {
                Account: Account,
                Password: Password,
                CustomerID: customerID
            }
            // lưu ảnh 
            const filename = await fileUpload.save(req.file.buffer, req.file.originalname);
            res.status(200).redirect('../home')
            
        }catch(err){
            res.status(500).render('authen/signup',{
                message: err.message
            })
        }
    }
    
}
module.exports= new AuthenController