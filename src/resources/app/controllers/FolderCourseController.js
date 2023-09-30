const db= require('../models')
const FolderCourses= db.foldercourses
class CustomerController{
    index=  function(req, res) {
        FolderCourses.findAll({
            raw : true,
            where:{
                CustomerID: "CID00000001"
            }
        }).then(data=>{
            res.status(200).send(data)
        }).catch(err=>{
            res.status(404).send(data)
        })
    }
}

module.exports= new CustomerController()