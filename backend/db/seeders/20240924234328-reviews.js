'use strict';
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

const { Review } = require('../models');
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
    await Review.bulkCreate([
      {
        spotId: 7,
        userId: 1,
        review: 'Very nice beach',
        stars: 5
      },
      {
        spotId: 1,
        userId: 2,
        review: 'I like it',
        stars: 3
      },
      {
        spotId: 2,
        userId: 3,
        review: 'Amazing stay!',
        stars: 5
      },
      {
        spotId: 3,
        userId: 2,
        review: 'Amazing view and very comfortable stay!',
        stars: 4
      },
      {
        spotId: 4,
        userId: 3,
        review: 'Perfect location, but the amenities could be better.',
        stars: 3
      },
      {
        spotId: 3,
        userId: 4,
        review: 'A wonderful and peaceful retreat, loved the waterfront!',
        stars: 5
      },
      {
        spotId: 6,
        userId: 5,
        review: 'The cabin was cozy and the skiing was fantastic!',
        stars: 5
      },
      {
        spotId: 7,
        userId: 6,
        review: 'Great location in the city, but a bit noisy at night.',
        stars: 4
      },
      {
        spotId: 6,
        userId: 1,
        review: 'I had an absolutely amazing stay at this Airbnb! The place was incredibly clean, cozy, and felt just like home. The host was very accommodating and responsive, answering all my questions promptly and providing excellent recommendations for local restaurants and attractions.',
        stars: 5
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
    options.tableName = 'Reviews';
    await queryInterface.bulkDelete(options, {
      id: { [Op.in]: [1, 2, 3] }
    }, {})
  }
};
