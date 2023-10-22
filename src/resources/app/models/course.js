module.exports= (sequelize, Sequelize) => {
    const course = sequelize.define('Course',{
        CourseID :{
            type: Sequelize.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        FolderID:{
            type: Sequelize.INTEGER,
            allowNull: false,
            references:{
                model: "FolderCourse",
                key: "FolderID"
            }
        },
        CourseName:{
            type: Sequelize.STRING(50)
        },
        CourseImg:{
            type: Sequelize.STRING(200)
        },
        Description:{
            type: Sequelize.STRING(500)
        },
        privacry:{
            type: Sequelize.STRING(50)
        },
        createdAt: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.literal("GETDATE()"), 
        },
        updatedAt: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.literal("GETDATE()"), 
        },
        QuizzesID:{
            type: Sequelize.STRING(36)
        }
    }, {
        hasTrigger: true,
        tableName:'Course',
        indexes: [
            {
              unique: true,
              fields: ['FolderID', 'CourseName'],
              name: 'compositeKey', 
            },
          ],
    }
    )
    return course
}