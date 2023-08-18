const express = require('express');
const authController = require("../controllers/authController");
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: API for user registration and login
 */

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: User registered successfully
 *       500:
 *         description: An error occurred while registering
 */

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login as a registered user
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 *       401:
 *         description: Invalid email or password
 *       500:
 *         description: An error occurred while logging in
 */

router.post('/register', authController.register);
router.post('/login', authController.login);


module.exports = router;
