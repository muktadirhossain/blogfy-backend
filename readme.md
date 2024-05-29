# MERN 101 Project : Blogfy -Server

**Blogfy Server** is a backend server for a simple blog project built with the MERN stack (MongoDB, Express, React, Node.js). This server handles user authentication, blog post creation, comments, and other related functionalities.

## Features

- User authentication (registration, login, JWT-based authentication)
- CRUD operations for blog posts
- Commenting on blog posts
- Categorization of blog posts
- Like and dislike functionality for posts
- Rate limiting and security best practices

## Table of Contents

- [Installation](#installation)
- [Configuration](#configuration)
- [Dependencies](#dependencies)

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/muktadirhossain/blogfy-backend
   cd blogfy-server
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the root of the project and add the necessary configuration values (see [Configuration](#configuration) section).

4. run Project:

   ```javascript

   // Start in development mode:
       npm run dev
           // or with yarn
       yarn dev

   // start in production mode :
       npm start
           // or with yarn
       yarn start
   ```

## Configuration

Create a `.env` file in the root directory with the following content:

## Environments variables : 🔑 🔑 🔑

```bash
    # Database Configuration
    MONGODB_CONNECTION_URI=mongodb://127.0.0.1:27017/blogfy
    DB_NAME=blogfy

    # JWT Configuration
    JWT_SECRET=5EC7CEFA1BE7C9354A639369A2AA8
    JWT_EXPIRATION_TIME=2592000 # 60*60*24*30 = 30 days in seconds

    # Email Configuration
    EMAIL_HOST=
    EMAIL_PORT=
    EMAIL_USER=
    EMAIL_PASSWORD=

    # Other Configurations
    MAX_JSON_SIZE=50mb
    URL_ENCODED=true

    # Rate Limiting Configuration
    REQUEST_LIMIT_TIME=900000 # 15 * 60 * 1000 = 15 minutes in milliseconds
    REQUEST_LIMIT_NUMBER=3000

    # Web Cache Configuration
    WEB_CACHE=false

    # Server Port
    PORT=3000

```

### Dependencies

`express:` Fast, unopinionated, minimalist web framework for Node.js

`mongoose:` MongoDB object modeling tool designed to work in an asynchronous environment

`dotenv:` Loads environment variables from a .env file into process.env

`cookie-parser:*`\* Parse Cookie header and populate req.cookies

`cors:` Middleware to enable CORS with various options

`helmet:` Helps secure Express apps by setting various HTTP headers

`hpp:` Protects against HTTP parameter pollution attacks

`express-rate-limit:` Basic rate-limiting middleware for Express
