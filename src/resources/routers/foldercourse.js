const folderCourseController= require('../app/controllers/FolderCourseController');
const express= require('express');
const route= express.Router()

route.get('/:customerid/:foldername', folderCourseController.course)
route.get('/:customerid', folderCourseController.index)
route.get('/', folderCourseController.index)

module.exports= route