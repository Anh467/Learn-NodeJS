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
                res.status(500).render('/authen/loginFail',{
                    message: "Đã có lỗi xảy ra",
                    err: err.message
                });
            }
        )
    } 
    checkAuthentication= function(req, res, next) {
        var Account, Password
        if(req.session.User){
            Account = req.session.User.Account
            Password= req.session.User.Password
        }
        if(Account != null && Password != null)
            res.locals.isAuthenticated = false;
        else
            res.locals.isAuthenticated = true;
        console.log("##########check authentication:"+  res.locals.isAuthenticated +"###########")
        next();
      }
    logout= function(req, res) {
         if (req.session.user) {
            delete req.session.user;
            req.session.save(); 
            res.redirect("/home")
          }

    }
}
module.exports= new AuthenController