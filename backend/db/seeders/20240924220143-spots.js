'use strict';
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

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
        name: 'Breeze Villa',
        description: 'A stunning villa with direct beach access and modern amenities for a luxurious stay',
        price: 450.00,
      },
      {
        ownerId: 3,
        address: '789 Sunset Blvd',
        city: 'Los Angeles',
        state: 'California',
        country: 'United States',
        lat: 34.0522,
        lng: -118.2437,
        name: 'Sunset Paradise',
        description: 'An elegant mansion with breathtaking views of the city and the ocean.',
        price: 800.00,
      },
      {
        ownerId: 4,
        address: '101 Bayfront Dr',
        city: 'Tampa',
        state: 'Florida',
        country: 'United States',
        lat: 27.9506,
        lng: -82.4572,
        name: 'Bayfront Oasis',
        description: 'A peaceful waterfront retreat with modern finishes and beautiful bay views.',
        price: 750.00,
      },
      {
        ownerId: 5,
        address: '202 Highland Rd',
        city: 'Aspen',
        state: 'Colorado',
        country: 'United States',
        lat: 39.1911,
        lng: -106.8175,
        name: 'Mountain Escape',
        description: 'A luxurious mountain lodge, perfect for skiing and winter getaways.',
        price: 600.00,
      },
      {
        ownerId: 6,
        address: '303 Lakeshore Ave',
        city: 'Chicago',
        state: 'Illinois',
        country: 'United States',
        lat: 41.8781,
        lng: -87.6298,
        name: 'Urban Retreat',
        description: 'A chic condo in the heart of Chicago with stunning views of the lake and skyline.',
        price: 200.00,
      }
      
    ], { validate: true });
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'Spots';
    await queryInterface.bulkDelete(options, {
      address: { [Op.in]: ['123 Rd', '456 Ocean Ave'] }
    }, {});
  }
};