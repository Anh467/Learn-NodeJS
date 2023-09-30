const db= require('../models')
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
            }
            res.redirect('/home')
        })
        .catch( err => {
                res.status(500).render('authen/loginFail',{
                    message: "Đã có lỗi xảy ra",
                    err: err.message
                });
            }
        )
    } 
    checkAuthentication= function(req, res, next) {
        
        var Account, Password
        // lấy kết quả có tồn tại không
        if(req.session.User){
            Account = req.session.User.Account
            Password= req.session.User.Password
        }
        //nếu cả account và password đều tồn tại chứng tỏ đã đăng nhập
        if(Account != null && Password != null){

            // lấy img của user
            const {CustomerName, CustomerImg}= Customer.findOne({
                attributes:['CustomerName', 'CustomerImg'],
                where:{
                    Account: Account,
                    Password: Password
                }
            })
            // trả cho trang nào load 
            res.locals.isAuthenticated = true;
            res.locals.CustomerName = CustomerName;
            res.locals.CustomerImg = CustomerImg;
        }      
        else
            // trả cho trang nào load 
            res.locals.isAuthenticated = false;
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
}
module.exports= new AuthenController