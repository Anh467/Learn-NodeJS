const authenController= require('../app/controllers/AuthenController');
const express= require('express');
const route= express.Router()

route.get('/login', authenController.index)
route.post('/login', authenController.login)


module.exports= route