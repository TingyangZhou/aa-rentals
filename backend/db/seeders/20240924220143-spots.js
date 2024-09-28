'use strict';
let options = {};

const { Op } = require('sequelize');
const { Spot } = require('../models');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await Spot.bulkCreate([
      {
        ownerId: 1,
        address: '123 Rd',
        city: 'San Diego',
        state: 'California',
        country: 'United States',
        lat: 32.7,
        lng: -117.2,
        name: 'Beach House',
        description: 'A beautiful beach house with ocean views, perfect for relaxing vacations',
        price: 300.00,
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
    ], { validate: true });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Spots', {
      address: { [Op.in]: ['123 Rd', '456 Ocean Ave'] }
    }, {});
  }
};