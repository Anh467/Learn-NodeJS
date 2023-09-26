const express= require('express')
const session = require('express-session');
const morgan = require('morgan')
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars')
const path = require('path')
const port= 3000
const route= require('./resources/routers')
const app= express()
//session
app.use(session({
    resave: true, 
    saveUninitialized: true, 
    secret: 'somesecret', 
    cookie: { maxAge: 60000 }}));
//bodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//check request
app.use(morgan("combined"))
app.use(express.static(path.join(__dirname,'public'))) 
// template engine
app.engine('hbs',exphbs.engine({
    extname: 'hbs'
}))
app.set('view engine','hbs')
app.set('views', path.join(__dirname, 'resources/views'))
//route
route(app)


app.listen(port, ()=>
    console.log(`listening on port ${port}`)
)