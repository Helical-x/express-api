# Disney Movie API

The Disney Movie API provides endpoints to manage characters, movies, and genres related to Disney movies.

## Table of Contents
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Email and Password Configuration](#email-and-password-configuration)
- [Running with Docker Compose](#running-with-docker-compose)
- [API Documentation](#api-documentation)
- [Authentication](#authentication)
- [Endpoints](#endpoints)
- [License](#license)

## Features

- Manage characters, movies, and genres.
- Perform CRUD operations on characters, movies, and genres.
- Filter characters by movie, genre, and weight.
- Token-based authentication for secure endpoints.

## Prerequisites

- Docker Compose (for running the application)

## Email and Password Configuration
- To configure the email and password for sending emails through nodemailer, update the docker-compose.yml file in the root directory of the project with your email service provider's information.

## Running with Docker Compose

1. Run the application using Docker Compose:
   ```bash
   docker-compose up -d
   ```
2. Migrate database:
    ```bash
   docker-compose exec app npx sequelize-cli db:migrate
   ```
3. Seed database 
     ```bash 
    docker-compose exec app npx sequelize-cli db:seed:all
    ```

## API Documentation

The API documentation can be found in the [Swagger UI](http://localhost:3000/api-docs) when the application is running.

## Authentication

Some endpoints require authentication. Obtain a token by registering and logging in using the `/auth/register` and `/auth/login` endpoints.

## Endpoints

Refer to the API documentation for a complete list of endpoints and their descriptions.


## License

This project is licensed under the [MIT License](LICENSE).


