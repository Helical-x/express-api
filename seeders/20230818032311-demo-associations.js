'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const movies = await queryInterface.sequelize.query('SELECT id FROM Movies');
    const characters = await queryInterface.sequelize.query('SELECT id FROM Characters');
    const genres = await queryInterface.sequelize.query('SELECT id FROM Genres');


    const movieCharacterAssociations = [];

    for (let i = 0; i < movies[0].length; i++) {
      for (let j = 0; j < characters[0].length; j += 3) {
        movieCharacterAssociations.push({
          movieId: movies[0][i].id,
          characterId: characters[0][j].id,
          createdAt: new Date(),
          updatedAt: new Date(),
        });
      }
    }

    const movieGenreAssociations = [];

    for (let i = 0; i < movies[0].length; i += 2) {
      for (let j = 0; j < genres[0].length; j += 2) {
        movieGenreAssociations.push({
          movieId: movies[0][i].id,
          genreId: genres[0][j].id,
          createdAt: new Date(),
          updatedAt: new Date(),
        });
      }
    }


    await queryInterface.bulkInsert('MovieCharacters', movieCharacterAssociations, {});
    await queryInterface.bulkInsert('MovieGenres', movieGenreAssociations, {});

  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('MovieCharacters', null, {});
    await queryInterface.bulkDelete('MovieGenres', null, {});
  }
};
