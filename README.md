# Notes App API

A RESTful API for managing notes, including features like creating, updating, retrieving, and deleting notes. The API also supports user authentication and authorization.

## Features

- User registration and login
- Create, read, update, and delete notes
- Notes can be marked as shared or private
- Rate limiting for API endpoints
- Input validation using Joi
- Authentication using JSON Web Tokens (JWT)

---

## Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v14 or higher)
- [MongoDB](https://www.mongodb.com/) (running locally or on a cloud service like MongoDB Atlas)

---

## Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/your-username/notes_app_api.git
    cd notes_app_api
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Set up environment variables:

    Create a `.env` file in the root directory and add the following variables:

    ```env
    PORT=3000
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret
    ```

    Replace `your_mongodb_connection_string` with your MongoDB connection string and `your_jwt_secret` with a secure secret key for JWT.

4. Start the server:

    ```bash
    npm start
    ```

    The API will be available at `http://localhost:3000`.

---

## Dependencies

The project uses the following major dependencies:

- [Express](https://expressjs.com/) - Web framework for Node.js
- [Mongoose](https://mongoosejs.com/) - MongoDB object modeling tool
- [Joi](https://joi.dev/) - Data validation library
- [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken) - For JWT-based authentication
- [dotenv](https://github.com/motdotla/dotenv) - For managing environment variables

For a complete list of dependencies, refer to the `package.json` file.