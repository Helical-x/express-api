var express = require('express');
const characterController = require("../controllers/charactersController");
var router = express.Router();

/**
 * @swagger
 * securityDefinitions:
 *   BearerAuth:
 *     type: apiKey
 *     in: header
 *     name: Authorization
 *     description: Enter your JWT token in the format 'Bearer {token}'
 */


/**
 * @swagger
 * tags:
 *   name: Characters
 *   description: API for managing characters
 */

/**
 * @swagger
 * /characters:
 *   get:
 *     summary: Get a list of characters with filters
 *     tags: [Characters]
 *     parameters:
 *       - name: name
 *         in: query
 *         schema:
 *           type: string
 *         description: Filter characters by name
 *       - name: age
 *         in: query
 *         schema:
 *           type: integer
 *         description: Filter characters by age
 *       - name: weight
 *         in: query
 *         schema:
 *           type: number
 *         description: Filter characters by weight
 *       - name: movieId
 *         in: query
 *         schema:
 *           type: integer
 *         description: Filter characters by associated movie ID
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example: [{"name": "Character 1", "image": "character1.jpg"}, {"name": "Character 2", "image": "character2.jpg"}]
 */

router.get('/', characterController.getAll);

/**
 * @swagger
 * /characters/{id}:
 *   get:
 *     summary: Get character by ID
 *     tags: [Characters]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the character to retrieve
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 image:
 *                   type: string
 *                   description: The image URL of the character
 *                 name:
 *                   type: string
 *                   description: The name of the character
 *                 age:
 *                   type: integer
 *                   description: The age of the character
 *                 weight:
 *                   type: number
 *                   format: float
 *                   description: The weight of the character
 *                 history:
 *                   type: string
 *                   description: The history of the character
 *                 deletedAt:
 *                   type: string
 *                   format: date-time
 *                   description: The deletion timestamp of the character
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                   description: The creation timestamp of the character
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *                   description: The last update timestamp of the character
 *                 Movies:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       image:
 *                         type: string
 *                         description: The image URL of the movie
 *                       title:
 *                         type: string
 *                         description: The title of the movie
 *                       review:
 *                         type: integer
 *                         description: The review rating of the movie
 *                       releaseDate:
 *                         type: string
 *                         format: date-time
 *                         description: The release date of the movie
 *                       deletedAt:
 *                         type: string
 *                         format: date-time
 *                         description: The deletion timestamp of the movie
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                         description: The creation timestamp of the movie
 *                       updatedAt:
 *                         type: string
 *                         format: date-time
 *                         description: The last update timestamp of the movie
 *             example:
 *               id: 1
 *               image: character1.jpg
 *               name: Character 1
 *               age: 30
 *               weight: 70.5
 *               history: Character 1 history
 *               deletedAt: null
 *               createdAt: "2023-08-18T15:40:46.000Z"
 *               updatedAt: "2023-08-18T15:40:46.000Z"
 *               Movies:
 *                 - id: 1
 *                   image: movie1.jpg
 *                   title: Movie 1
 *                   review: 4
 *                   releaseDate: "2023-01-15T00:00:00.000Z"
 *                   deletedAt: null
 *                   createdAt: "2023-08-18T15:40:46.000Z"
 *                   updatedAt: "2023-08-18T15:40:46.000Z"
 *                 - id: 2
 *                   image: movie2.jpg
 *                   title: Movie 2
 *                   review: 3
 *                   releaseDate: "2023-02-20T00:00:00.000Z"
 *                   deletedAt: null
 *                   createdAt: "2023-08-18T15:40:46.000Z"
 *                   updatedAt: "2023-08-18T15:40:46.000Z"
 *                 # ... (repeat for other movies)
 */



router.get('/:id', characterController.getById);

/**
 * @swagger
 * /characters:
 *   post:
 *     summary: Create a new character
 *     tags: [Characters]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               image:
 *                 type: string
 *               age:
 *                 type: integer
 *               weight:
 *                 type: number
 *               history:
 *                 type: string
 *             example:
 *               name: "New Character"
 *               image: "new_character.jpg"
 *               age: 25
 *               weight: 70.5
 *               history: "A brief history of the new character."
 *     responses:
 *       201:
 *         description: Character created successfully
 *         content:
 *           application/json:
 *             example: {"id": 3, "name": "New Character", "image": "new_character.jpg"}
 *       400:
 *         description: Invalid input
 */

router.post('/', characterController.create);


/**
 * @swagger
 * /characters/{id}:
 *   put:
 *     summary: Update a character by ID
 *     tags: [Characters]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the character to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               image:
 *                 type: string
 *                 description: The image URL of the character
 *               name:
 *                 type: string
 *                 description: The name of the character
 *               age:
 *                 type: integer
 *                 description: The age of the character
 *               weight:
 *                 type: number
 *                 format: float
 *                 description: The weight of the character
 *               history:
 *                 type: string
 *                 description: The history of the character
 *           example:
 *             image: updated_character.jpg
 *             name: Updated Character
 *             age: 32
 *             weight: 75.0
 *             history: Updated character history
 *     responses:
 *       200:
 *         description: Character updated successfully
 *         content:
 *           application/json:
 *             example:
 *               id: 1
 *               image: updated_character.jpg
 *               name: Updated Character
 *               age: 32
 *               weight: 75.0
 *               history: Updated character history
 *               deletedAt: null
 *               createdAt: "2023-08-18T15:40:46.000Z"
 *               updatedAt: "2023-08-18T16:00:15.000Z"
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Character not found
 */

router.put('/:id', characterController.updateById);

/**
 * @swagger
 * /characters/{id}:
 *   delete:
 *     summary: Delete a character by ID
 *     tags: [Characters]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the character to delete
 *     responses:
 *       204:
 *         description: Character deleted successfully
 *       404:
 *         description: Character not found
 */
router.delete('/:id', characterController.deleteById);

module.exports = router;
