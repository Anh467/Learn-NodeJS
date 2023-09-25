const customerRouter = require('./customer')
function route(app){
    //do
    app.get('/', function(req, res) {
        res.render('customer/ListCustomer')
    })
    //news
    app.get('/news', function(req, res) {
    res.render('news')
    })
    //home
    app.get('/home', function(req, res) {
    return res.send("/home")
    })
    //customer
    app.use('/customer', customerRouter)
}

module.exports= route