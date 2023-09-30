module.exports = (sequelize, Sequelize) => {
  const Customer = sequelize.define("CUSTOMER", {
    CustomerID: {
      type: Sequelize.STRING(20), // Chọn kiểu dữ liệu phù hợp
      primaryKey: true,
    },
    Account: {
      type: Sequelize.STRING(155),
      unique: true,
    },
    Password: {
      type: Sequelize.STRING(155),
    },
    CustomerName: {
      type: Sequelize.STRING(255),
    },
    CustomerImg: {
      type: Sequelize.STRING(200),
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
    createdAt: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.literal("GETDATE()"), // Sử dụng hàm GETDATE() của SQL Server
    },
    updatedAt: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.literal("GETDATE()"), // Sử dụng hàm GETDATE() của SQL Server
    },
  }, {
    tableName: 'CUSTOMER', 
  });

  return Customer;
};
