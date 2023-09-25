module.exports = (sequelize, Sequelize) => {
    const Customer = sequelize.define('CUSTOMER', {
        CustomerID: {
          type: Sequelize.STRING,
          allowNull: false,
          primaryKey: true,
        },
        Account: {
          type: Sequelize.STRING(155),
          unique: true,
          allowNull: false,
        },
        Password: {
          type: Sequelize.STRING(155),
          allowNull: false,
        },
        FullName: {
          type: Sequelize.STRING(255),
        },
        Mail: {
          type: Sequelize.STRING(255),
        },
        DateOfBirth: {
          type: Sequelize.DATE,
        },
        Gender: {
          type: Sequelize.STRING(20),
        },
        RoleCustomer: {
          type: Sequelize.STRING(20),
        },
        TimeEnjoy: {
          type: Sequelize.DATE,
          defaultValue: Sequelize.fn('GETDATE'), // Sử dụng GETDATE() trong SQL Server
        },
      }, {
        tableName: 'CUSTOMER', // Tên bảng
        timestamps: false, // Tắt tự động thêm createdAt và updatedAt
      });
      return Customer
  };