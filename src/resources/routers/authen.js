const authenController= require('../app/controllers/AuthenController');
const express= require('express');
const route= express.Router()
route.post('/logout', authenController.logout)
route.get('/login', authenController.index)
route.post('/login', authenController.login)
route.get('/signup', authenController.signup)

module.exports= route