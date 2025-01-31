'use strict';
const { hashPass } = require('../helpers/bcrypt')
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    let data = require('../data/users.json')

    data = data.map(user => {
      delete user.id
      user.password = hashPass(user.password)
      user.createdAt = new Date()
      user.updatedAt = new Date()

      return user
    })
    await queryInterface.bulkInsert('Users', data, {})
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.bulkDelete('Users', null, {})
  }
};
