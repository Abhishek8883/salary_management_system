'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Salaries', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      employee_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique:true
      },
      month: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      year: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      total_working_days: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      total_leave_taken: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      overtime: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      total_salary_made: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      Is_salary_calculated:{
        type:Sequelize.INTEGER,
        defaultValue: 0
      }
    },{
      timestamps:false
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Salaries');
  }
};