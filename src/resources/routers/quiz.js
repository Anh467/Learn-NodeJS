const courseController= require('../app/controllers/QuizController');
const upload= require('../common/uploadMiddleware');
const express= require('express');
const route= express.Router()
// Courses
    //[GET]
    route.get('/:customerid/:foldername/:coursename', courseController.index)
    //[GET]
    route.get('/:quizzesid', courseController.gets)
    //[POST]
    route.post('/:quizzesid/:index', courseController.update)
module.exports= route