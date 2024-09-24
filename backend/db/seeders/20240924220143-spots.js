'use strict';

const { render } = require('../../app');
const { Spot } = require('../models')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

    await Spot.bulkCreate([
      {
        ownerId: 1,
        address: '123 Rd',
        city: 'San Diego',
        state:'California',
        country:'United States',
        lat: 32.7,
        lng: -117.2,
        name:'Beach House',
        description:'A beautiful beach house with ocean views, perfect for relaxing vacations',
        price:300.00,

      }
    ])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
