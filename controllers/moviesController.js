const { Movie,Character, Genre, MovieCharacter, MovieGenre } = require('../models');
const { Op } = require('sequelize');

const moviesController = {
    getAll: async (req, res) => {
        const { title, genreId, order } = req.query;
        try {
            const whereClause = {};
            let orderOption = [];

            if (title) {
                whereClause.title = { [Op.like]: `%${title}%` };
            }

            if (order && (order === 'ASC' || order === 'DESC')) {
                orderOption = [['releaseDate', order]];
            }

            const includeOptions = [];

            if (genreId) {
                includeOptions.push({
                    model: Genre,
                    attributes: [],
                    where: {
                        id: genreId
                    }
                });
            }

            const movies = await Movie.findAll({
                where: whereClause,
                order: orderOption,
                attributes: ['image', 'title', 'releaseDate'],
                include: includeOptions
            });
            res.json(movies);
        } catch (error) {
            res.status(500).json({ error: 'An error occurred while fetching movies. ' + error });
        }
    },

    getById: async (req, res) => {
        try {
            const movieId = req.params.id;
            const movie = await Movie.findByPk(movieId, {
                include: [
                    {
                        model: Character,
                        attributes: {
                            exclude: ['MovieCharacter']
                        },
                        through: { attributes: [] }, // Exclude MovieCharacter attributes
                    }
                ]
            });
            if (!movie) {
                return res.status(404).json({ error: 'Movie not found.' });
            }
            res.json(movie);
        } catch (error) {
            res.status(500).json({ error: 'An error occurred while fetching the movie.' });
        }
    },

    create: async (req, res) => {
        try {
            const { image, title, review, releaseDate  } = req.body;
            const newMovie = await Movie.create({ image, title, review, releaseDate });
            res.json(newMovie);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Server Error' });
        }
    },

    updateById: async (req, res) => {
        try {
            const { id } = req.params;
            const { image, title, fecha_creacion, review } = req.body;

            const movie = await Movie.findByPk(id);
            if (!movie) {
                return res.status(404).json({ message: 'Movie not found' });
            }

            const updatedMovie = await movie.update({ image, title, fecha_creacion, review });
            res.json(updatedMovie);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Server Error' });
        }
    },

    deleteById: async (req, res) => {
        try {
            const { id } = req.params;
            const movie = await Movie.findByPk(id);
            if (!movie) {
                return res.status(404).json({ message: 'Movie not found' });
            }

            await movie.destroy();
            res.json({ message: 'Movie deleted successfully' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Server Error' });
        }
    },

    addCharacter: async (req, res) => {
        try {
            const movie = await Movie.findByPk(req.params.movieId);
            if (!movie) {
                return res.status(404).json({ error: 'Movie not found.' });
            }

            const character = await Character.findByPk(req.params.characterId);
            if (!character) {
                return res.status(404).json({ error: 'Character not found.' });
            }

            await MovieCharacter.create({
                movieId: movie.id,
                characterId: character.id
            });

            res.json({ message: 'Character added to movie.' });
        } catch (error) {
            res.status(500).json({ error: 'An error occurred while adding the character to the movie.' });
        }
    },

    removeCharacter: async (req, res) => {
        try {
            const movie = await Movie.findByPk(req.params.movieId);
            if (!movie) {
                return res.status(404).json({ error: 'Movie not found.' });
            }

            const character = await Character.findByPk(req.params.characterId);
            if (!character) {
                return res.status(404).json({ error: 'Character not found.' });
            }

            await MovieCharacter.destroy({
                where: {
                    movieId: movie.id,
                    characterId: character.id
                }
            });

            res.json({ message: 'Character removed from movie.' });
        } catch (error) {
            res.status(500).json({ error: 'An error occurred while removing the character from the movie.' });
        }
    },

    addGenre: async (req, res) => {
        try {
            const movie = await Movie.findByPk(req.params.movieId);
            if (!movie) {
                return res.status(404).json({ error: 'Movie not found.' });
            }

            const genre = await Genre.findByPk(req.params.genreId);
            if (!genre) {
                return res.status(404).json({ error: 'Genre not found.' });
            }

            await MovieGenre.create({
                movieId: movie.id,
                genreId: genre.id
            });

            res.json({ message: 'Genre added to movie.' });
        } catch (error) {
            res.status(500).json({ error: 'An error occurred while adding the genre to the movie.' });
        }
    },

    removeGenre: async (req, res) => {
        try {
            const movie = await Movie.findByPk(req.params.movieId);
            if (!movie) {
                return res.status(404).json({ error: 'Movie not found.' });
            }

            const genre = await Genre.findByPk(req.params.genreId);
            if (!genre) {
                return res.status(404).json({ error: 'Genre not found.' });
            }

            await MovieGenre.destroy({
                where: {
                    movieId: movie.id,
                    genreId: genre.id
                }
            });

            res.json({ message: 'Genre removed from movie.' });
        } catch (error) {
            res.status(500).json({ error: 'An error occurred while removing the genre from the movie.' });
        }
    }
};

module.exports = moviesController;
