const courseController= require('../app/controllers/QuizController');
const upload= require('../common/uploadMiddleware');
const express= require('express');
const route= express.Router()
// Courses
    //[GET]
    route.get('/:customerid/:foldername/:coursename', courseController.index)
    //[GET]
    route.get('/:courseid', courseController.get)
module.exports= route