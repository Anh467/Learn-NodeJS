const folderCourseController= require('../app/controllers/FolderCourseController');
const express= require('express');
const route= express.Router()

route.get('/', folderCourseController.index)

module.exports= route