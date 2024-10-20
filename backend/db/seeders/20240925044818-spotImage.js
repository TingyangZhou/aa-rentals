'use strict';
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

const { SpotImage } = require('../models')
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

    await SpotImage.bulkCreate([
      {spotId: 1,
        url:'https://aarentalsbucket.s3.us-east-2.amazonaws.com/1.jpg',
        preview:true

      },
      {spotId: 1,
        url:'https://aarentalsbucket.s3.us-east-2.amazonaws.com/1-2.jpg',
        preview:true

      },
      {spotId: 1,
        url:'https://aarentalsbucket.s3.us-east-2.amazonaws.com/1-3.jpg',
        preview:true

      },
      {spotId: 1,
        url:'https://aarentalsbucket.s3.us-east-2.amazonaws.com/1-4.jpg',
        preview:true

      },
      {spotId: 1,
        url:'https://aarentalsbucket.s3.us-east-2.amazonaws.com/1-5.jpg',
        preview:true

      },
      {spotId: 2,
        url:'https://aarentalsbucket.s3.us-east-2.amazonaws.com/2.jpg',
        preview:true
      },
      {spotId: 2,
        url:'https://aarentalsbucket.s3.us-east-2.amazonaws.com/2.jpg',
        preview:true
      },
      {spotId: 2,
        url:'https://aarentalsbucket.s3.us-east-2.amazonaws.com/2.jpg',
        preview:true
      },
      {
        spotId: 3,
        url: 'https://aarentalsbucket.s3.us-east-2.amazonaws.com/3.jpeg',
        preview: true
      },
      {
        spotId: 3,
        url: 'https://aarentalsbucket.s3.us-east-2.amazonaws.com/3.jpeg',
        preview: true
      },
      {
        spotId: 3,
        url: 'https://aarentalsbucket.s3.us-east-2.amazonaws.com/3.jpeg',
        preview: true
      },
      {
        spotId: 4,
        url: 'https://aarentalsbucket.s3.us-east-2.amazonaws.com/4.jpg',
        preview: true
      },
      {
        spotId: 4,
        url: 'https://aarentalsbucket.s3.us-east-2.amazonaws.com/4.jpg',
        preview: true
      },
      {
        spotId: 4,
        url: 'https://aarentalsbucket.s3.us-east-2.amazonaws.com/4.jpg',
        preview: true
      },
      {
        spotId: 5,
        url: 'https://aarentalsbucket.s3.us-east-2.amazonaws.com/5.jpg',
        preview: true
      },
      {
        spotId: 5,
        url: 'https://aarentalsbucket.s3.us-east-2.amazonaws.com/5.jpg',
        preview: true
      },
      {
        spotId: 5,
        url: 'https://aarentalsbucket.s3.us-east-2.amazonaws.com/5.jpg',
        preview: true
      },
      {
        spotId: 6,
        url: 'https://aarentalsbucket.s3.us-east-2.amazonaws.com/6.jpg',
        preview: true
      },
      {
        spotId: 6,
        url: 'https://aarentalsbucket.s3.us-east-2.amazonaws.com/6.jpg',
        preview: true
      },
      {
        spotId: 6,
        url: 'https://aarentalsbucket.s3.us-east-2.amazonaws.com/6.jpg',
        preview: true
      },
      {
        spotId: 6,
        url: 'https://aarentalsbucket.s3.us-east-2.amazonaws.com/6.jpg',
        preview: true
      },
      {
        spotId: 6,
        url: 'https://aarentalsbucket.s3.us-east-2.amazonaws.com/6.jpg',
        preview: true
      },
      {
        spotId: 7,
        url: 'https://aarentalsbucket.s3.us-east-2.amazonaws.com/7.jpg',
        preview: true
      },
      {
        spotId: 7,
        url: 'https://aarentalsbucket.s3.us-east-2.amazonaws.com/7.jpg',
        preview: true
      },
      {
        spotId: 7,
        url: 'https://aarentalsbucket.s3.us-east-2.amazonaws.com/7.jpg',
        preview: true
      },
      {
        spotId: 7,
        url: 'https://aarentalsbucket.s3.us-east-2.amazonaws.com/7.jpg',
        preview: true
      },
      {
        spotId: 8,
        url: 'https://aarentalsbucket.s3.us-east-2.amazonaws.com/8.jpg',
        preview: true
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
    options.tableName = 'SpotImages';
    await queryInterface.bulkDelete(options, {
      url: { [Op.in]: ['https://images.app.goo.gl/J2T3764iNL8akcMW7', 'https://www.google.com/imgres?imgurl=https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?cs%3Dsrgb%26dl%3Dpexels-binyaminmellish-106399.jpg%26fm%3Djpg&tbnid=kdENxlNldMG6sM&vet=1&imgrefurl=https://www.pexels.com/search/houses/&docid=pOKaSh3YkKiy2M&w=5408&h=3605&source=sh/x/im/m1/1&kgs=e556ea0cc2d90162&shem=abme,trie'] }
    }, {})
  }
};
