const customerRouter = require('./customer')
const authenRouter = require('./authen')
const filterAuthen= require('./filterAuthen')
const folderCourse= require('./foldercourse')
const course= require('./course')
function route(app){
    //filter
    app.use(['/*','/*/*'],filterAuthen)
    //do
    app.get('/', function(req, res) {
        res.render('home')
    })
    //customer
    app.use('/customer', customerRouter)
    //authen
    app.use('/authen', authenRouter)
    //FolderCourses
    app.use('/foldercourse', folderCourse)
    //Courses
    app.use('/course', course)
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