var express = require('express');
const moviesController = require("../controllers/moviesController");
var router = express.Router();


/**
 * @swagger
 * tags:
 *   name: Movies
 *   description: API for managing characters
 */

/**
 * @swagger
 * /movies:
 *   get:
 *     summary: Get a list of movies with filters
 *     tags: [Movies]
 *     parameters:
 *       - name: title
 *         in: query
 *         schema:
 *           type: string
 *         description: Filter movies by title
 *       - name: order
 *         in: query
 *         schema:
 *           type: string
 *           enum: [ASC, DESC]
 *         description: Sort order for the results (ascending or descending)
 *       - name: genreId
 *         in: query
 *         schema:
 *           type: integer
 *         description: Filter movies by genre
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example: [{"image": "movie1.jpg", "title": "Movie 1", "releaseDate": "2023-05-18T00:00:00.000Z"}]
 */
router.get('/', moviesController.getAll);

/**
 * @swagger
 * /movies/{id}:
 *   get:
 *     summary: Get a movie by ID
 *     tags: [Movies]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the movie
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               id: 1
 *               image: movie1.jpg
 *               title: Movie 1
 *               review: 4
 *               releaseDate: "2023-01-15T00:00:00.000Z"
 *               deletedAt: null
 *               createdAt: "2023-08-18T15:40:46.000Z"
 *               updatedAt: "2023-08-18T15:40:46.000Z"
 *               Characters:
 *                 - id: 1
 *                   image: character1.jpg
 *                   name: Character 1
 *                   age: 30
 *                   weight: 70.5
 *                   history: Character 1 history
 *                   deletedAt: null
 *                   createdAt: "2023-08-18T15:40:46.000Z"
 *                   updatedAt: "2023-08-18T15:40:46.000Z"
 *                 - id: 4
 *                   image: character4.jpg
 *                   name: Character 4
 *                   age: 28
 *                   weight: 75.8
 *                   history: Character 4 history
 *                   deletedAt: null
 *                   createdAt: "2023-08-18T15:40:46.000Z"
 *                   updatedAt: "2023-08-18T15:40:46.000Z"
 *       404:
 *         description: Movie not found
 */

router.get('/:id', moviesController.getById);


/**
 * @swagger
 * /movies:
 *   post:
 *     summary: Create a new movie
 *     tags: [Movies]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               image:
 *                 type: string
 *               title:
 *                 type: string
 *               review:
 *                 type: integer
 *             example:
 *               image: "movie_image.jpg"
 *               title: "New Movie"
 *               review: 5
 *               releaseDate: "2023-05-18T00:00:00.000Z"
 *     responses:
 *       201:
 *         description: Movie created successfully
 *         content:
 *           application/json:
 *             example:
 *               id: 3
 *               image: "movie_image.jpg"
 *               title: "New Movie"
 *               review: 5
 *               releaseDate: "2023-05-18T00:00:00.000Z"
 *       400:
 *         description: Invalid input
 */

router.post('/', moviesController.create);

/**
 * @swagger
 * /movies/{id}:
 *   put:
 *     summary: Update a movie by ID
 *     tags: [Movies]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the movie to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               image:
 *                 type: string
 *                 description: The image URL of the movie
 *               title:
 *                 type: string
 *                 description: The title of the movie
 *               review:
 *                 type: integer
 *                 description: The review rating of the movie
 *               releaseDate:
 *                 type: string
 *                 format: date
 *                 description: The release date of the movie
 *           example:
 *             image: updated_movie.jpg
 *             title: Updated Movie
 *             review: 4
 *             releaseDate: "2023-01-15"
 *     responses:
 *       200:
 *         description: Movie updated successfully
 *         content:
 *           application/json:
 *             example:
 *               id: 2
 *               image: updated_image.jpg
 *               title: Updated Movie
 *               review: 4
 *               releaseDate: "2023-01-15T00:00:00.000Z"
 *               deletedAt: null
 *               createdAt: "2023-08-18T15:40:46.000Z"
 *               updatedAt: "2023-08-18T15:50:22.000Z"
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Movie not found
 */

router.put('/:id', moviesController.updateById);

/**
 * @swagger
 * /movies/{id}:
 *   delete:
 *     summary: Delete a movie by ID
 *     tags: [Movies]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the movie to delete
 *     responses:
 *       204:
 *         description: Movie deleted successfully
 *       404:
 *         description: Movie not found
 */

router.delete('/:id', moviesController.deleteById);

/**
 * @swagger
 * /movies/{movieId}/characters/{characterId}:
 *   post:
 *     summary: Add a character to a movie
 *     tags: [Movies]
 *     parameters:
 *       - name: movieId
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the movie
 *       - name: characterId
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the character
 *     responses:
 *       200:
 *         description: Character added to movie successfully
 *       404:
 *         description: Movie or character not found
 *       500:
 *         description: An error occurred
 */
router.post('/:movieId/characters/:characterId', moviesController.addCharacter);

/**
 * @swagger
 * /movies/{movieId}/characters/{characterId}:
 *   delete:
 *     summary: Remove a character from a movie
 *     tags: [Movies]
 *     parameters:
 *       - name: movieId
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the movie
 *       - name: characterId
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the character
 *     responses:
 *       200:
 *         description: Character removed from movie successfully
 *       404:
 *         description: Movie or character not found
 *       500:
 *         description: An error occurred
 */
router.delete('/:movieId/characters/:characterId', moviesController.removeCharacter);

/**
 * @swagger
 * /movies/{movieId}/genres/{genreId}:
 *   post:
 *     summary: Add a genre to a movie
 *     tags: [Movies]
 *     parameters:
 *       - name: movieId
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the movie
 *       - name: genreId
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the genre
 *     responses:
 *       200:
 *         description: Genre added to movie successfully
 *       404:
 *         description: Movie or genre not found
 *       500:
 *         description: An error occurred
 */
router.post('/:movieId/genres/:genreId', moviesController.addGenre);

/**
 * @swagger
 * /movies/{movieId}/genres/{genreId}:
 *   delete:
 *     summary: Remove a genre from a movie
 *     tags: [Movies]
 *     parameters:
 *       - name: movieId
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the movie
 *       - name: genreId
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the genre
 *     responses:
 *       200:
 *         description: Genre removed from movie successfully
 *       404:
 *         description: Movie or genre not found
 *       500:
 *         description: An error occurred
 */
router.delete('/:movieId/genres/:genreId', moviesController.removeGenre);


module.exports = router;
