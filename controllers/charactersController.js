const { Character, Movie } = require('../models');
const { Op } = require('sequelize');


const characterController = {
    // Obtener todos los personajes
    getAll: async (req, res) => {
        const { name, age, weight, movieId } = req.query;
        try {
            const whereClause = {};
            if (name) {
                whereClause.name = { [Op.like]: `%${name}%` };
            }
            if (age) {
                whereClause.age = age;
            }
            if (weight){
                whereClause.weight = parseFloat(weight);
            }
            const includeOptions = [];

            if (movieId) {
                includeOptions.push({
                    model: Movie,
                    attributes: [],
                    where: {
                        id: movieId
                    }
                });
            }
            const characters = await Character.findAll({
                attributes: ['image', 'name'], // Select only 'image' and 'name'
                where: whereClause,
                include: includeOptions
            });

            // const characters = await Character.findAll({
            //     attributes: ['image', 'name'], // Select only 'image' and 'name'
            // });
            res.status(200).json(characters);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error fetching characters.' });
        }
    },

    // Obtener un personaje por su ID
    getById: async (req, res) => {
        const { id } = req.params;
        try {
            const character = await Character.findByPk(id, {
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
            if (character) {
                res.status(200).json(character);
            } else {
                res.status(404).json({ message: 'Character not found.' });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error fetching character.' });
        }
    },

    // Crear un nuevo personaje
    create: async (req, res) => {
        const { image, name, age, weight, history } = req.body;
        try {
            const newCharacter = await Character.create({
                image,
                name,
                age,
                weight,
                history
            });
            res.status(201).json(newCharacter);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error creating character.' });
        }
    },

    // Actualizar un personaje por su ID
    updateById: async (req, res) => {
        const { id } = req.params;
        const { image, name, age, weight, history } = req.body;
        try {
            const character = await Character.findByPk(id);
            if (character) {
                await character.update({
                    image,
                    name,
                    age,
                    weight,
                    history
                });
                res.status(200).json(character);
            } else {
                res.status(404).json({ message: 'Personaje no encontrado' });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error al actualizar el personaje' });
        }
    },

    // Eliminar un personaje por su ID (eliminación suave)
    deleteById: async (req, res) => {
        const { id } = req.params;
        try {
            const character = await Character.findByPk(id);
            if (character) {
                // Marcar el personaje como eliminado suavemente
                await character.destroy();
                res.status(204).json({ message: 'Character deleted successfully' }).end();
            } else {
                res.status(404).json({ message: 'Character not found.' });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error deleting character.' });
        }
    }

};

module.exports = characterController;
