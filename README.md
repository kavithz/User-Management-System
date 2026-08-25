# User Management System

User Management System is a full-stack web application for secure user registration, authentication, and user management. It uses a React frontend with a Node.js/Express backend and a PostgreSQL database.

The project demonstrates full-stack development with JWT authentication, hashed passwords, protected API routes, and complete CRUD operations for managing users.

## Key Features

- **Secure Registration** — new users can register with name, email, and password; passwords are hashed with bcrypt before being stored
- **Authenticated Login** — users log in with email and password and receive a JWT token
- **Protected Routes** — the backend requires a valid JWT (`Authorization: Bearer <token>`) to access user data
- **User Directory & Search** — view all registered users and search by name or email
- **Full CRUD Management** — create, update, and delete user records
- **Centralized Error Handling** — consistent HTTP status codes and error messages across the API

## Technologies Used

**Frontend**
- React
- Vite
- React Router DOM
- Axios

**Backend**
- Node.js
- Express.js
- PostgreSQL (`pg`)

**Authentication & Security**
- JWT (`jsonwebtoken`)
- bcrypt
- CORS

## Project Structure

```text
User-Management-System/
├── backend/
│   ├── config/       # PostgreSQL connection setup
│   ├── middleware/    # JWT auth middleware
│   ├── routes/        # auth and user routes
│   ├── server.js
│   └── package.json
│
├── frontend/
│   ├── src/
│   └── package.json
│
├── database/
│   └── database.sql   # database schema
│
└── README.md
```

## How to Run the Project

The project may be downloaded or cloned to different locations, so replace `/path/to/User-Management-System` below with your actual project folder path.

You will need a PostgreSQL database (local or hosted) before starting the backend.

### Database

Create the database and run the schema:

```bash
psql -U postgres -c "CREATE DATABASE user_management;"
psql -U postgres -d user_management -f /path/to/User-Management-System/database/database.sql
```

### Backend

```bash
cd /path/to/User-Management-System/backend
npm install
```

Create a `.env` file in the `backend` folder with the following variables:

```text
PORT=5001
DATABASE_URL=postgresql://postgres:YOUR_POSTGRES_PASSWORD@localhost:5432/user_management
JWT_SECRET=your_own_secret_key
JWT_EXPIRES_IN=1h
```

## Local Development

Backend runs on port 5001 and frontend runs on port 3000.

Start the backend:

```bash
npm run dev
```

The API will run on `http://localhost:5001`.

### Frontend

```bash
cd /path/to/User-Management-System/frontend
npm install
```

Create a `.env` file in the `frontend` folder with:

```text
VITE_API_URL=http://localhost:5001/api
```

Start the frontend:

```bash
npm run dev
```

The app will run on `http://localhost:3000`.

> **Note:** the backend's CORS is set to only allow requests from `http://localhost:3000`. If you change the frontend port, update the `origin` in `backend/server.js` to match.

### Build for Production

```bash
cd /path/to/User-Management-System/frontend
npm run build
npm run preview
```

## Environment Variables

**Backend (`backend/.env`)**
- `PORT` — port the Express server runs on (default `5001`)
- `DATABASE_URL` — PostgreSQL connection string
- `JWT_SECRET` — secret key used to sign JWT tokens
- `JWT_EXPIRES_IN` — token expiry time (e.g. `1h`)

**Frontend (`frontend/.env`)**
- `VITE_API_URL` — base URL of the backend API

Use your own values — never commit real secrets or database credentials to a public repository.

## Development Notes

- Both `backend` and `frontend` require `npm install` before first run — they have separate `package.json` files.
- The backend requires a working `DATABASE_URL` and the schema applied before the API will work.
- All routes under `/api/users` require a valid JWT — log in via `/api/auth/login` first to get a token.
- The project path differs depending on where the project is downloaded or cloned, so always update commands to match your local path.

## GitHub / Security

Before pushing to a public repository, make sure the following are **not** committed:

- `.env` files (both `backend/.env` and `frontend/.env`)
- Real database credentials or JWT secrets
- `node_modules/`

These should already be excluded via `.gitignore`, but always double-check before pushing.

## Future Improvements

- Role-based access control
- Refresh tokens for better session security
- Email verification
- Password reset
- Pagination for the users table
- Stronger input validation
- Better mobile responsiveness
