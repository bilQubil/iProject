'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    let data = require('../data/testing_products.json')
    data = data.map(product => {
      delete product.id
      product.createdAt = new Date()
      product.updatedAt = new Date()
      return product
    })
    await queryInterface.bulkInsert('Products', data, {})
  },

  async down (queryInterface, Sequelize) {
   await queryInterface.bulkDelete('Products', null, {})
  }
};
