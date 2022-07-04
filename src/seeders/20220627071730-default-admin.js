'use strict';
const {hashPassword,comparepassword} = require('../utils/bcrypt')

module.exports = {
  async up (queryInterface, Sequelize) {
    
      // Add seed commands here.
     
      // Example:
      await queryInterface.bulkInsert('admins', [{
        name: 'admin',
        email:"admin@email.com",
        password:hashPassword("12345678")
      }], {});
    
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('admins', null, {});
  }
};
