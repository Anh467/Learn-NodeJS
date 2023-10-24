const courseController= require('../app/controllers/QuizController');
const upload= require('../common/uploadMiddleware');
const express= require('express');
const route= express.Router()
// Courses
    //[GET]
    route.get('/:customerid/:foldername/:coursename', courseController.index)
    //[GET]
    route.get('/:quizzesid', courseController.gets)
    //[PUT]
    route.put('/:quizzesid/:index', courseController.update)
    //[POST]
    route.post('/:quizzesid', courseController.create)
    //[DELETE]
    route.delete('/:quizzesid/:index', courseController.delete)
module.exports= route