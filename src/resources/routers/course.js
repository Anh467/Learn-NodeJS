const courseController= require('../app/controllers/CourseController');
const upload= require('../common/uploadMiddleware');
const express= require('express');
const route= express.Router()
// Courses
    //[GET]
    route.get('/:customerid/:foldername', courseController.course)
    //[DELETE]
    route.delete('/:customerid/:foldername', courseController.deleteCourse)
    //[POST]
    route.post('/:customerid/:foldername',upload.single('FolderImg') , courseController.newCourse)
    //[PUT]
    route.put('/:coursename',upload.single('FolderImg') , courseController.updateCourse)
module.exports= route