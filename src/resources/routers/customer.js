const customerController= require('../app/controllers/CustomerController');
const express= require('express');
const route= express.Router()

route.get('/', customerController.index)

module.exports= route