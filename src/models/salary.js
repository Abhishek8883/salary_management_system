'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Salary extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {

    }
  }
  Salary.init({
    employee_id: { type: DataTypes.INTEGER, allowNull: false, unique: true },
    month: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    year: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    total_working_days: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    total_leave_taken: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    overtime: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    total_salary_made: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    Is_salary_calculated: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    }
  }, {
    sequelize,
    modelName: 'Salary',
    timestamps: false
  });
  return Salary;
};