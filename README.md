# 👤 User Management System

## 📖 Overview

User Management System is a full-stack web application for secure user registration, authentication and user management. It uses a React frontend with a Node.js and Express backend and a PostgreSQL database.

The project was built to demonstrate full-stack development using React for the frontend and Express with PostgreSQL for the backend. It includes JWT authentication, password hashing, protected API routes and CRUD operations.

## 🎯 Project Objective

The objective of this project is to create a secure user management application where users can:

* Register a new account.
* Log in securely with a hashed password.
* Stay authenticated using a JWT token.
* View all registered users.
* Search users by name or email.
* Add edit and delete user records.
* Access protected pages only after logging in.

## ✨ Features

**Secure Registration**
New users can create an account using their name email and password. Passwords are hashed with bcrypt before being saved.

**Authenticated Login**
Users can log in with their email and password. After a successful login the backend creates a JWT token for authentication.

**Protected Routes**
Pages like the Dashboard and Users page can only be accessed by logged-in users. The backend also checks the JWT token before allowing access to protected data.

**User Directory & Search**
Users can view all registered users in a table and search for users by name or email.

**Full CRUD Management**
Users can add edit and delete user records. All changes are stored in the PostgreSQL database.

**Centralized Error Handling**
The API uses proper HTTP status codes and clear error messages. Errors are handled using try/catch and a global error handler.

## 💻 Technologies Used

**Frontend**

* React
* Vite
* React Router DOM
* Axios

**Backend**

* Node.js
* Express.js
* PostgreSQL


**Authentication & Security**

* JWT
* bcrypt
* CORS

## 📚 What I Learned

Through this project I gained practical experience in:

* Building a full-stack web application.
* Connecting a React frontend with an Express backend using REST APIs.
* Implementing secure authentication using JWT and bcrypt.
* Creating protected backend routes.
* Working with PostgreSQL databases.
* Using SQL queries to manage data.
* Implementing CRUD operations.
* Handling API errors and HTTP status codes.
* Debugging frontend and backend issues.
* Organizing a project with a clean folder structure.

## 🚀 Future Improvements

Some features that could be added in future versions include:

* Role-based access control.
* Refresh tokens for better session security.
* Email verification.
* Password reset.
* Pagination for the users table.
* Better input validation.
* Better mobile responsiveness.

## ✅ Conclusion

User Management System is a practical full-stack application that demonstrates secure authentication and user management. It shows how React frontend, Express backend and PostgreSQL database can work together with JWT authentication and CRUD operations.
