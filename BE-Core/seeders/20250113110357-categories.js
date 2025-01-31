'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   let data = require('../data/testing_category.json')
   data = data.map(category => {
     delete category.id
     category.createdAt = new Date()
     category.updatedAt = new Date()
     return category
   })
     await queryInterface.bulkInsert('Categories', data, {})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Categories', null, {})
  }
};
