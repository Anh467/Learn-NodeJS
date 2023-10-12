const db= require('../models')
const Customer= db.customers
class CustomerController{
    index=  function(req, res) {
        // let limit  = req.params.limit
        // let offset  = req.params.offset
        try {
            
        } catch (error) {
            res.status(500).send({
                message:{
                    value: `ERR[${error}]Đã có lỗi xảy ra: ${error.message}`,
                    color: "red"
                } 
            });
        }
        
        //res.render('news')
    }
}

module.exports= new CustomerController()