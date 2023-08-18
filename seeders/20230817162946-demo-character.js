'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Characters', [
      {
        image: 'character1.jpg',
        name: 'Character 1',
        age: 30,
        weight: 70.5,
        history: 'Character 1 history',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        image: 'character2.jpg',
        name: 'Character 2',
        age: 25,
        weight: 65.2,
        history: 'Character 2 history',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        image: 'character3.jpg',
        name: 'Character 3',
        age: 40,
        weight: 80.0,
        history: 'Character 3 history',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        image: 'character4.jpg',
        name: 'Character 4',
        age: 28,
        weight: 75.8,
        history: 'Character 4 history',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        image: 'character5.jpg',
        name: 'Character 5',
        age: 22,
        weight: 60.7,
        history: 'Character 5 history',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Characters', null, {});
  }
};
