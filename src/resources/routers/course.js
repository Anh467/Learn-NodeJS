const courseController= require('../app/controllers/CourseController');
const upload= require('../common/uploadMiddleware');
const express= require('express');
const route= express.Router()
// Courses
    //[GET]
    route.get('/:foldername', courseController.course)
    //[DELETE]
    route.delete('/', courseController.deleteCourse)
    //[POST]
    route.post('/', courseController.newCourse)
    //[PUT]
    route.put('/:coursename', courseController.updateCourse)
module.exports= route