const db= require('../models')
const Customer= db.customers
class CustomerController{
    index=  function(req, res) {
        // let limit  = req.params.limit
        // let offset  = req.params.offset
        Customer.findAll({raw: true})
            .then(customers => {
                //customers= customers.map(customer => customers.toObject())
                res.render('customer/ListCustomer', {
                    title: "Customer List",
                    customers: customers
                })
            })
            .catch(err => {
                res.status(500).send({
                message: "Error retrieving Tutorial with id="
                });
            });
        //res.render('news')
    }
}

module.exports= new CustomerController()