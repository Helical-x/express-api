const { Genre, Movie} = require('../models');

const genresController = {
    getAll: async (req, res) => {
        try {
            const genres = await Genre.findAll();
            res.json(genres);
        } catch (error) {
            res.status(500).json({ error: 'An error occurred while fetching genres.' });
        }
    },
    getById: async (req, res) => {
        try {
            const genre = await Genre.findByPk(req.params.id, {
                include: [
                    {
                        model: Movie,
                        attributes: {
                            exclude: ['MovieCharacter']
                        },
                        through: { attributes: [] }, // Exclude MovieCharacter attributes
                    }
                ]
            });
            if (genre) {
                res.json(genre);
            } else {
                res.status(404).json({ error: 'Genre not found.' });
            }
        } catch (error) {
            res.status(500).json({ error: 'An error occurred while fetching the genre.' });
        }
    },
    create: async (req, res) => {
        try {
            const { name, image } = req.body;
            const newGenre = await Genre.create({ name, image });
            res.status(201).json(newGenre);
        } catch (error) {
            res.status(400).json({ error: 'Invalid input.' });
        }
    },
    updateById: async (req, res) => {
        try {
            const { name, image } = req.body;
            const updatedGenre = await Genre.update({ name, image }, {
                where: { id: req.params.id },
                returning: true
            });
            if (updatedGenre[0] === 0) {
                res.status(404).json({ error: 'Genre not found.' });
            } else {
                res.json(updatedGenre[1][0]);
            }
        } catch (error) {
            res.status(400).json({ error: 'Invalid input.' });
        }
    },
    deleteById: async (req, res) => {
        try {
            const deletedRowsCount = await Genre.destroy({ where: { id: req.params.id } });
            if (deletedRowsCount === 0) {
                res.status(404).json({ error: 'Genre not found.' });
            } else {
                res.sendStatus(204);
            }
        } catch (error) {
            res.status(500).json({ error: 'An error occurred while deleting the genre.' });
        }
    }
};

module.exports = genresController;
