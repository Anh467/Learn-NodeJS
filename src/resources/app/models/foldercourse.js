module.exports= (sequelize, Sequelize) => {
    const foldercourse = sequelize.define('FolderCourse',{
        FolderID:{
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        CustomerID:{
            type: Sequelize.STRING(11),
            allowNull: false,
            references:{
                model: "CUSTOMER",
                key: "CustomerID"
            }
        },
        FolderName: {
            type: Sequelize.STRING(50),
        },
        FolderImg: {
            type: Sequelize.STRING(200),
        },
        Description: {
            type: Sequelize.STRING(500),
        },
        privacry: {
            type: Sequelize.STRING(10),
        },
        createdAt: {
          type: Sequelize.DATE,
          defaultValue: Sequelize.literal("GETDATE()"), 
        },
        updatedAt: {
          type: Sequelize.DATE,
          defaultValue: Sequelize.literal("GETDATE()"), 
        },
    }, {
        hasTrigger: true,
        tableName: 'FolderCourse', 
        indexes: [
          {
            unique: true,
            fields: ['CustomerID', 'FolderName'],
            name: 'compositeKey', 
          },
        ],
      });
      return foldercourse
}