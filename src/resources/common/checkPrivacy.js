const db = require('../app/models')
const foldercourses = db.foldercourses
const courses = db.courses


checkPrivacy =  async function( customerid, foldername, coursename){
    const folder = await foldercourses.findOne({
        attributes: [ 'privacry', 'FolderID'],
        where:{
            FolderName: foldername,
            CustomerID: customerid
        }
    })
    if(folder.privacry == 'private') return false
    if(coursename== null || coursename == '') return true
    const course =  await courses.findOne({
        attributes: [ 'privacry'],
        where:{
            CourseName: coursename,
            FolderID: folder.FolderID
        }
    })
    if(course.privacry == 'private') return false
    return true
}

module.exports = checkPrivacy