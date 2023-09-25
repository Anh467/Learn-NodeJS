const express= require('express')
const morgan = require('morgan')
const exphbs = require('express-handlebars')
const path = require('path')
const port= 8080
const route= require('./resources/routers')
const app= express()
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