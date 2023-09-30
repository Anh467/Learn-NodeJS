const customerRouter = require('./customer')
const authenRouter = require('./authen')
const filterAuthen= require('./filterAuthen')
const folderCourse= require('./foldercourse')
function route(app){
    //filter
    app.use(['/home/*', '/customer/*', '/authen/*', '/home', '/', '*'],filterAuthen)
    //customer
    app.use('/customer', customerRouter)
    //authen
    app.use('/authen', authenRouter)
    //FolderCourses
    app.use('/foldercourse', folderCourse)
    //do
    app.get('/', function(req, res) {
        res.render('home')
    })
    // //news
    // app.get('/news', function(req, res) {
    // res.render('news')
    // })
    //home
    app.get('/home', function(req, res) {
        res.render('home')
    })
    
}

module.exports= route