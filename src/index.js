// import mongoose 
const mongoose = require('mongoose')
// import library express framework 
const express= require('express')
const session = require('express-session');
// declare express
const app= express()
// import morgan 
const morgan = require('morgan')
// import body parse 
const bodyParser = require('body-parser');
// import handle bả 
const exphbs = require('express-handlebars')
const path = require('path')
const port= 3000
const route= require('./resources/routers')

//config no-cors
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');
    next();
  });
//session
app.use(session({
    resave: true, 
    saveUninitialized: true, 
    secret: 'somesecret', 
    cookie: { maxAge: 1000 * 60 * 60 * 24 }}));
//bodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//check request
app.use(morgan("combined"))
app.use(express.static(path.join(__dirname,'public'))) 
// template engine

app.engine('hbs',exphbs.engine({
    extname: 'hbs',
    helpers: require('./resources/configHandleBar')
}))


app.set('view engine','hbs')
app.set('views', path.join(__dirname, 'resources/views'))
//route
route(app)


app.listen(port, ()=>
    console.log(`listening on port ${port}`)
)