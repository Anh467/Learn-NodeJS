const folderCourseController= require('../app/controllers/FolderCourseController');
const upload= require('../common/uploadMiddleware');
const express= require('express');
const route= express.Router()
// Courses
    //[GET]
    route.get('/:customerid/:foldername', folderCourseController.course)
// FolderCourses
    //[GET]
    route.get('/:customerid', folderCourseController.index)
    //[POST]
    route.post('/',upload.single('FolderImg'), folderCourseController.newFolderCourse)
    //[DELETE]
    route.delete('/', folderCourseController.deleteFolderCourse)
    //[GET]
    route.get('/',  folderCourseController.index)
    //[PUT]
    route.put('/',upload.single('FolderImg'),  folderCourseController.updateFolderCourse)
    //[GET]
    route.get('/element',  folderCourseController.getElementFolderCourse)
module.exports= route