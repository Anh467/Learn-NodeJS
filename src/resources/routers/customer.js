const customerController= require('../app/controllers/CustomerController');
const upload= require('../common/uploadMiddleware');
const express= require('express');
const route= express.Router()
//[GET] user profile
route.get('/:customerid', customerController.userProfile)
//[GET] user infor
route.get('/', customerController.index)
//[POST] update ussr infor
route.post('/', upload.single('CustomerImg'), customerController.update)
module.exports= route 