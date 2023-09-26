const customerRouter = require('./customer')
const authenRouter = require('./authen')
function route(app){
    //do
    app.get('/', function(req, res) {
        res.render('home')
    })
    //news
    app.get('/news', function(req, res) {
    res.render('news')
    })
    //home
    app.get('/home', function(req, res) {
        res.render('home')
    })
    //customer
    app.use('/customer', customerRouter)
    //authen
    app.use('/authen', authenRouter)
}

module.exports= route