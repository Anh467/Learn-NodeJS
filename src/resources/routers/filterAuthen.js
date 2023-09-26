const authenController= require('../app/controllers/AuthenController');
const express= require('express');
const route= express.Router()

route.get('/', authenController.checkAuthentication)

module.exports= route