'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Employees', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      Name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      email: {
        type: Sequelize.STRING,
        unique:true,
        allowNull: false
      },
      mobile: {
        type: Sequelize.BIGINT,
        allowNull: false,
        unique:true
      },
      address: {
        type: Sequelize.STRING,
        allowNull: false
      },
      base_salary: {
        type: Sequelize.INTEGER,
        allowNull: false
      }
    },{
      timestamps:false
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Employees');
  }
};