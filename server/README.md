# Expense Tracker Backend

This is the backend for the **Expense Tracker** application. It allows users to register, log in, and manage their transactions. The backend is built using **Node.js**, **Express**, and **MongoDB** (via Mongoose) with JSON Web Tokens (JWT) for authentication.

## Table of Contents

1. [Features](#features)
2. [Technologies Used](#technologies-used)
3. [Setup](#setup)
   - [Pre-requisites](#pre-requisites)
   - [Installation](#installation)
   - [Environment Variables](#environment-variables)
4. [API Documentation](#api-documentation)
   - [Authentication Routes](#authentication-routes)
   - [Transaction Routes](#transaction-routes)
5. [Folder Structure](#folder-structure)
6. [Middleware & Error Handling](#middleware-and-error-handling)
7. [Security Considerations](#security-considerations)
8. [Additional Improvements](#additional-improvements)
9. [License](#license)

---

## Features

- **User Authentication**: Allows users to sign up and log in using email and password.
- **JWT Token Authentication**: Uses JWT tokens to authenticate users on each request.
- **Transaction Management**: Users can:
  - Add, update, delete, and view transactions.
  - View a summary of their income, expenses, and balance.
- **Transaction Validation**: Ensures that transactions are valid (e.g., expenses are negative, incomes are positive).
- **CORS Support**: Allows cross-origin requests from specified origins.
- **Error Handling**: Handles various errors, such as invalid inputs, unauthorized requests, and server issues.

---

## Technologies Used

- **Node.js** - JavaScript runtime used for building the backend.
- **Express** - Web framework for Node.js.
- **MongoDB** - NoSQL database for storing user and transaction data.
- **Mongoose** - MongoDB object modeling for Node.js.
- **JWT (JSON Web Tokens)** - For secure user authentication.
- **bcryptjs** - For hashing passwords before storing them in the database.
- **dotenv** - To manage environment variables.
- **cors** - Middleware to enable CORS (Cross-Origin Resource Sharing).
- **morgan** (optional) - HTTP request logging middleware.

---

## Setup

### Pre-requisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) (preferably version 14 or higher)
- [MongoDB](https://www.mongodb.com/) or a cloud MongoDB service like [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- A code editor like [VSCode](https://code.visualstudio.com/)

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/expense-tracker-backend.git
   cd expense-tracker-backend
   ```

2. **Install the dependencies**:
   ```bash
   npm install
   ```

3. **Set up environment variables**:
   - Create a `.env` file in the root of the project.
   - Add the following variables:
     ```env
     MONGO_URI=your_mongodb_connection_string
     JWT_SECRET=your_jwt_secret_key
     PORT=5000
     ```
     Replace `your_mongodb_connection_string` with your MongoDB URI and `your_jwt_secret_key` with a secret key for JWT generation.

4. **Run the application**:
   ```bash
   npm start
   ```

   This will start the server on the specified `PORT` (default is `5000`).

---

## API Documentation

### Authentication Routes

#### POST `/api/auth/signup`
- **Description**: Registers a new user.
- **Request Body**:
  ```json
  {
    "name": "John Doe",
    "email": "john.doe@example.com",
    "password": "password123"
  }
  ```
- **Response**:
  ```json
  {
    "message": "User registered successfully 🎉",
    "token": "JWT_TOKEN",
    "user": {
      "id": "USER_ID",
      "name": "John Doe",
      "email": "john.doe@example.com"
    }
  }
  ```
- **Access**: Public

#### POST `/api/auth/login`
- **Description**: Logs in a user and returns a JWT token.
- **Request Body**:
  ```json
  {
    "email": "john.doe@example.com",
    "password": "password123"
  }
  ```
- **Response**:
  ```json
  {
    "message": "Login successful 🎉",
    "token": "JWT_TOKEN",
    "user": {
      "id": "USER_ID",
      "name": "John Doe",
      "email": "john.doe@example.com"
    }
  }
  ```
- **Access**: Public

---

### Transaction Routes

#### POST `/api/transactions`
- **Description**: Adds a new transaction (expense or income).
- **Request Body**:
  ```json
  {
    "amount": -50,
    "type": "expense",
    "category": "Food",
    "note": "Lunch",
    "date": "2025-09-26"
  }
  ```
- **Response**:
  ```json
  {
    "success": true,
    "transaction": {
      "id": "TRANSACTION_ID",
      "amount": -50,
      "type": "expense",
      "category": "Food",
      "note": "Lunch",
      "date": "2025-09-26"
    }
  }
  ```
- **Access**: Private (JWT token required)

#### GET `/api/transactions`
- **Description**: Retrieves all transactions for the authenticated user.
- **Response**:
  ```json
  {
    "success": true,
    "transactions": [
      {
        "id": "TRANSACTION_ID",
        "amount": -50,
        "type": "expense",
        "category": "Food",
        "note": "Lunch",
        "date": "2025-09-26"
      }
    ]
  }
  ```
- **Access**: Private (JWT token required)

#### GET `/api/transactions/summary`
- **Description**: Retrieves the summary of the user's transactions, including income, expenses, and balance.
- **Response**:
  ```json
  {
    "success": true,
    "summary": {
      "income": 1000,
      "expense": -500,
      "balance": 500,
      "totalTransactions": 10
    }
  }
  ```
- **Access**: Private (JWT token required)

#### PUT `/api/transactions/:id`
- **Description**: Updates an existing transaction.
- **Request Body**:
  ```json
  {
    "amount": -40,
    "type": "expense",
    "category": "Food",
    "note": "Dinner"
  }
  ```
- **Response**:
  ```json
  {
    "success": true,
    "transaction": {
      "id": "TRANSACTION_ID",
      "amount": -40,
      "type": "expense",
      "category": "Food",
      "note": "Dinner",
      "date": "2025-09-26"
    }
  }
  ```
- **Access**: Private (JWT token required)

#### DELETE `/api/transactions/:id`
- **Description**: Deletes a transaction.
- **Response**:
  ```json
  {
    "success": true,
    "message": "Transaction deleted successfully"
  }
  ```
- **Access**: Private (JWT token required)

---

## Folder Structure

Here’s a breakdown of the folder structure:

```
server
│
├── node_modules/           # External dependencies (installed via npm)
├── src/
│   ├── config/             # MongoDB connection
│   ├── controllers/        # Logic for auth and transaction management
│   ├── middleware/         # JWT authentication middleware
│   ├── models/             # Mongoose models (User, Transaction)
│   ├── routes/             # API route handlers
│   ├── .env               # Environment variables
│   ├── .gitignore          # Git ignore file
│   ├── index.js            # Entry point of the application
│   ├── package.json        # npm dependencies
└── └── package-lock.json   # npm lock file
```

---

## Middleware and Error Handling

- **JWT Authentication Middleware**: All routes except signup and login are protected by JWT authentication middleware. The middleware checks the token from the `Authorization` header and ensures that the request is from an authenticated user.

- **Error Handling**: Errors are handled with specific status codes and meaningful messages. You can extend error handling by creating a centralized error handler.

---

## Security Considerations

- **JWT Token**: Always keep your JWT secret key safe. Do not expose it in any public code or repositories.
- **Password Hashing**: User passwords are hashed using `bcryptjs` before storing them in the database.
- **Rate Limiting**: Consider adding rate limiting to the authentication routes to prevent brute-force attacks.

---

## Additional Improvements

- **Pagination**: Implement pagination for the `GET /api/transactions` route to handle large data sets.
- **Email Verification**: Add email verification during user registration to ensure valid accounts.
- **Logging**: Use a logging library like `winston` or `morgan` for better monitoring and debugging.
- **Rate Limiting**: Use `express-rate-limit` to prevent brute force attacks.

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
