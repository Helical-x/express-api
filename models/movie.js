'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Movie extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Movie.belongsToMany(models.Character, {
        through: 'MovieCharacter',
        foreignKey: 'movieId',
        otherKey: 'characterId'
      });
      Movie.belongsToMany(models.Genre, {
        through: 'MovieGenre',
        foreignKey: 'movieId',
        otherKey: 'genreId'
      });
    }
  }
  Movie.init({
    image: DataTypes.STRING,
    title: DataTypes.STRING,
    review: DataTypes.INTEGER,
    releaseDate: DataTypes.DATE,
    deletedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Movie',
    paranoid: true
  });
  return Movie;
};
