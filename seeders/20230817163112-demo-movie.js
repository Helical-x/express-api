'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Movies', [
      {
        image: 'movie1.jpg',
        title: 'Movie 1',
        review: 4,
        releaseDate: new Date('2023-01-15'), 
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        image: 'movie2.jpg',
        title: 'Movie 2',
        review: 3,
        releaseDate: new Date('2023-02-20'), 
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        image: 'movie3.jpg',
        title: 'Movie 3',
        review: 4,
        releaseDate: new Date('2023-03-10'), 
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        image: 'movie4.jpg',
        title: 'Movie 4',
        review: 5,
        releaseDate: new Date('2023-04-05'), 
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        image: 'movie5.jpg',
        title: 'Movie 5',
        review: 3,
        releaseDate: new Date('2023-05-18'), 
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Movies', null, {});
  }
};
