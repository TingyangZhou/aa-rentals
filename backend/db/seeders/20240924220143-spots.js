'use strict';

const { render } = require('../../app');
const { Spot } = require('../models');
const { Op } = require('sequelize'); 

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
      },
      {
        ownerId: 2,
        address: '456 Ocean Ave',
        city: 'Miami',
        state: 'Florida',
        country: 'United States',
        lat: 25.7617,
        lng: -80.1918,
        name: 'Ocean Breeze Villa',
        description: 'A stunning villa with direct beach access and modern amenities for a luxurious stay',
        price: 450.00,
      }      
    ],{ validate: true })
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Spots', {
      address: { [Op.in]: ['123 Rd', '456 Ocean Ave'] }
    }, {})
  }
};
