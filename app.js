const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const swaggerUi = require('swagger-ui-express');
const specs = require('./swagger'); // Import the Swagger configuration file


const indexRouter = require('./routes/index');
const charactersRouter = require('./routes/characters');
const moviesRouter = require('./routes/movies');
const genresRouter = require('./routes/genres');
const authRouter = require('./routes/auth');
const verifyToken = require('./middlewares/authToken'); // Adjust the path



const app = express();
// Serve Swagger UI at /api-docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/auth', authRouter);
app.use('/', indexRouter);
app.use('/characters', verifyToken, charactersRouter);
app.use('/movies', verifyToken, moviesRouter);
app.use('/genres', verifyToken, genresRouter);


module.exports = app;
