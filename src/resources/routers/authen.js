const authenController= require('../app/controllers/AuthenController');
const express= require('express');
const route= express.Router()
route.get('/logout', authenController.logout)
route.get('/login', authenController.index)
route.post('/login', authenController.login)


module.exports= route