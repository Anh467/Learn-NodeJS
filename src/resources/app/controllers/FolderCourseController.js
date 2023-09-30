const db= require('../models')
const FolderCourses= db.foldercourses
class CustomerController{
    index=  function(req, res) {
        try {
            var CustomerID
            if(req.session.User){
                CustomerID= req.session.User.CustomerID
            }else throw new Error("U must be logged in")
            if(CustomerID== "" || CustomerID == undefined ) throw new Error("U must be logged in")
            FolderCourses.findAll({
                attributes: ['FolderName', 'FolderImg', 'Description', 'privacry', 'CustomerID', 'FolderID'],
                raw : true,
                where:{
                    CustomerID: CustomerID
                }
            }).then(data=>{
                res.status(200).render('home',{
                    FolderCourses: data
                })
            }).catch(err=>{
                throw err
            })
        } catch (error) {
            res.status(500).render('home',{
                error: "Folder not found: "
            })
        }
        
    }
}

module.exports= new CustomerController()