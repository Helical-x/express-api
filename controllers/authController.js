const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../models');
const nodemailer = require('../nodemailerConfig');
require('dotenv').config();


const authController = {
    register: async (req, res) => {
        try {
            const { email, password } = req.body;
            const hashedPassword = await bcrypt.hash(password, 10);

            const newUser = await User.create({
                email,
                password: hashedPassword,
            });

            // Send confirmation email
            const mailOptions = {
                from: process.env.EMAIL_USERNAME,
                to: newUser.email,
                subject: 'Registration Successful',
                text: 'Thank you for registering with our Disney Movie API!',
            };

            nodemailer.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.error('Error sending email:', error);
                } else {
                    console.log('Email sent:', info.response);
                }
            });

            res.json({ message: 'User registered successfully', user: newUser });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'An error occurred while registering.' });
        }
    },

    login: async (req, res) => {
        try {
            const { email, password } = req.body;
            const user = await User.findOne({ where: { email } });

            if (!user) {
                return res.status(401).json({ error: 'Invalid email or password' });
            }

            const passwordMatch = await bcrypt.compare(password, user.password);

            if (!passwordMatch) {
                return res.status(401).json({ error: 'Invalid email or password' });
            }

            const token = jwt.sign({ userId: user.id }, 'your-secret-key', { expiresIn: '1h' });

            res.json({ message: 'Login successful', token });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'An error occurred while logging in.' });
        }
    },
};

module.exports = authController;
