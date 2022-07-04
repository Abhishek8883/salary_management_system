'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Employee extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Employee.hasOne(models.Salary, {
        foreignKey: "employee_id",
        sourcekey: "id"
      })
    }
  }
  Employee.init({
    Name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    mobile: { type: DataTypes.BIGINT, allowNull: false, unique: true },
    address: { type: DataTypes.STRING, allowNull: false },
    base_salary: { type: DataTypes.INTEGER, allowNull: false }
  }, {
    sequelize,
    modelName: 'Employee',
    timestamps: false
  });
  return Employee;
};