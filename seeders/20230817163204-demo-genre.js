'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Genres', [
      {
        name: 'Action',
        image: 'action.jpg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Drama',
        image: 'drama.jpg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Comedy',
        image: 'comedy.jpg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Sci-Fi',
        image: 'sci-fi.jpg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Adventure',
        image: 'adventure.jpg',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Genres', null, {});
  }
};
