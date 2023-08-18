var express = require('express');
const genresController = require("../controllers/genresController");
var router = express.Router();


/**
 * @swagger
 * tags:
 *   name: Genres
 *   description: API for managing genres
 */

/**
 * @swagger
 * /genres:
 *   get:
 *     summary: Get all genres
 *     tags: [Genres]
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   name:
 *                     type: string
 *                     description: The name of the genre
 *                   image:
 *                     type: string
 *                     description: The image URL of the genre
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                     description: The creation timestamp of the genre
 *                   updatedAt:
 *                     type: string
 *                     format: date-time
 *                     description: The last update timestamp of the genre
 *             example:
 *               - id: 1
 *                 name: Action
 *                 image: action.jpg
 *                 createdAt: "2023-08-18T15:40:46.000Z"
 *                 updatedAt: "2023-08-18T15:40:46.000Z"
 *               - id: 2
 *                 name: Drama
 *                 image: drama.jpg
 *                 createdAt: "2023-08-18T15:40:46.000Z"
 *                 updatedAt: "2023-08-18T15:40:46.000Z"
 *               # ... (repeat for other genres)
 */

/**
 * @swagger
 * /genres/{id}:
 *   get:
 *     summary: Get a genre by ID
 *     tags: [Genres]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the genre to retrieve
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               id: 3
 *               name: "Comedy"
 *               image: "comedy.jpg"
 *               createdAt: "2023-08-18T15:40:46.000Z"
 *               updatedAt: "2023-08-18T15:40:46.000Z"
 *               Movies:
 *                 - id: 1
 *                   image: "updated_movie.jpg"
 *                   title: "Updated Movie"
 *                   review: 4
 *                   releaseDate: "2023-01-15T00:00:00.000Z"
 *                   deletedAt: null
 *                   createdAt: "2023-08-18T15:40:46.000Z"
 *                   updatedAt: "2023-08-18T17:49:55.000Z"
 *                 - id: 3
 *                   image: "movie3.jpg"
 *                   title: "Movie 3"
 *                   review: 4
 *                   releaseDate: "2023-03-10T00:00:00.000Z"
 *                   deletedAt: null
 *                   createdAt: "2023-08-18T15:40:46.000Z"
 *                   updatedAt: "2023-08-18T15:40:46.000Z"
 *                 - id: 5
 *                   image: "movie5.jpg"
 *                   title: "Movie 5"
 *                   review: 3
 *                   releaseDate: "2023-05-18T00:00:00.000Z"
 *                   deletedAt: null
 *                   createdAt: "2023-08-18T15:40:46.000Z"
 *                   updatedAt: "2023-08-18T15:40:46.000Z"
 *       404:
 *         description: Genre not found
 */

/**
 * @swagger
 * /genres:
 *   post:
 *     summary: Create a new genre
 *     tags: [Genres]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the genre
 *               image:
 *                 type: string
 *                 description: The image URL of the genre
 *           example:
 *             name: Thriller
 *             image: thriller.jpg
 *     responses:
 *       201:
 *         description: Genre created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 name:
 *                   type: string
 *                   description: The name of the genre
 *                 image:
 *                   type: string
 *                   description: The image URL of the genre
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                   description: The creation timestamp of the genre
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *                   description: The last update timestamp of the genre
 *             example:
 *               id: 6
 *               name: Thriller
 *               image: thriller.jpg
 *               createdAt: "2023-08-18T15:40:46.000Z"
 *               updatedAt: "2023-08-18T15:40:46.000Z"
 *       400:
 *         description: Invalid input
 */

/**
 * @swagger
 * /genres/{id}:
 *   put:
 *     summary: Update a genre by ID
 *     tags: [Genres]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the genre to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the genre
 *               image:
 *                 type: string
 *                 description: The image URL of the genre
 *           example:
 *             name: Thriller Updated
 *             image: thriller_updated.jpg
 *     responses:
 *       200:
 *         description: Genre updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 name:
 *                   type: string
 *                   description: The name of the genre
 *                 image:
 *                   type: string
 *                   description: The image URL of the genre
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                   description: The creation timestamp of the genre
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *                   description: The last update timestamp of the genre
 *             example:
 *               id: 6
 *               name: Thriller Updated
 *               image: thriller_updated.jpg
 *               createdAt: "2023-08-18T15:40:46.000Z"
 *               updatedAt: "2023-08-18T16:00:15.000Z"
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Genre not found
 */

/**
 * @swagger
 * /genres/{id}:
 *   delete:
 *     summary: Delete a genre by ID
 *     tags: [Genres]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the genre to delete
 *     responses:
 *       204:
 *         description: Gender deleted successfully
 *       404:
 *         description: Gender not found
 */

router.get('/', genresController.getAll);

router.get('/:id', genresController.getById);

router.post('/', genresController.create);

router.put('/:id', genresController.updateById);

router.delete('/:id', genresController.deleteById);

module.exports = router;
