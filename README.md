# User Management System

A simple full-stack **User Management System** built with:

- **Frontend:** React + Vite
- **Backend:** Node.js + Express.js
- **Database:** PostgreSQL
- **Authentication:** JWT (JSON Web Tokens) + bcrypt

This project was built to be **beginner-friendly** and easy to explain in a junior developer interview.

---

## 1. Requirements

Before you start, make sure you have installed:

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [PostgreSQL](https://www.postgresql.org/download/) (v13 or higher recommended)
- npm (comes with Node.js)

Check your versions:

```bash
node -v
npm -v
psql --version
```

---

## 2. Folder Structure

```
User-Management-System/
├── backend/                 # Node.js + Express API
│   ├── config/
│   │   └── db.js            # PostgreSQL connection (pg Pool)
│   ├── middleware/
│   │   └── authMiddleware.js# Checks JWT token on protected routes
│   ├── routes/
│   │   ├── authRoutes.js    # /api/auth/register, /api/auth/login
│   │   └── userRoutes.js    # /api/users CRUD (protected)
│   ├── .env.example
│   ├── package.json
│   └── server.js            # App entry point
│
├── frontend/                # React + Vite app
│   ├── src/
│   │   ├── api/
│   │   │   └── axios.js     # Shared axios instance + token header
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   └── PrivateRoute.jsx
│   │   ├── pages/
│   │   │   ├── Register.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   └── Users.jsx
│   │   ├── App.jsx          # Routes
│   │   ├── main.jsx         # Entry point
│   │   └── index.css
│   ├── .env.example
│   ├── index.html
│   └── package.json
│
├── database/
│   └── database.sql         # Table creation script
│
└── README.md
```

---

## 3. Database Setup

1. Open a terminal and log in to PostgreSQL:

   ```bash
   psql -U postgres
   ```

2. Create the database:

   ```sql
   CREATE DATABASE user_management;
   ```

3. Connect to it:

   ```sql
   \c user_management
   ```

4. Run the schema from `database/database.sql` (copy-paste the `CREATE TABLE` statement, or run the whole file):

   ```bash
   psql -U postgres -d user_management -f database/database.sql
   ```

This creates a `users` table with columns: `id`, `name`, `email` (unique), `password` (hashed), `created_at`.

---

## 4. Backend Setup

```bash
cd backend
npm install
```

Create your own `.env` file from the example:

```bash
cp .env.example .env
```

Then open `.env` and update `DATABASE_URL` with your real PostgreSQL username/password.

Start the backend:

```bash
npm start
```

or, for auto-restart during development:

```bash
npm run dev
```

The API will run at: **http://localhost:5000**

---

## 5. Frontend Setup

Open a **new terminal** (keep the backend running):

```bash
cd frontend
npm install
```

Create your own `.env` file:

```bash
cp .env.example .env
```

Start the frontend:

```bash
npm run dev
```

The app will run at: **http://localhost:3000**

---

## 6. Using the App

1. Go to `http://localhost:3000` → redirected to **Login**.
2. Click **Register here** → create an account.
3. Log in with that account.
4. You'll land on the **Dashboard**, showing your info.
5. Go to **Users** to add, search, edit, or delete users.

---

## 7. How the Pieces Communicate

### React ↔ Node.js
The React app (running on port 3000) never talks to the database directly. Instead, it sends HTTP requests (via **axios**) to the Express API (running on port 5000), e.g. `GET http://localhost:5000/api/users`. Express handles the request, talks to PostgreSQL, and sends back a **JSON** response, which React then displays. `cors()` middleware on the backend allows this cross-port communication.

### Node.js ↔ PostgreSQL
The backend uses the `pg` package. A single `Pool` (in `config/db.js`) manages reusable connections to PostgreSQL. Routes call `pool.query(sql, values)` with parameterized queries (`$1`, `$2`, ...) to safely insert user input into SQL — this also protects against **SQL injection**.

### Login Flow

```
User fills Login form (React)
        ↓
React sends POST /api/auth/login (email, password)
        ↓
Express finds the user by email in PostgreSQL
        ↓
bcrypt.compare() checks the password against the stored hash
        ↓
If correct → jwt.sign() creates a JWT token
        ↓
Token + user info sent back to React
        ↓
React saves token in localStorage
        ↓
Every future protected request sends:
Authorization: Bearer <token>
        ↓
authMiddleware.js verifies the token before allowing access
```

---

## 8. Environment Variables

**backend/.env**
```
PORT=5000
DATABASE_URL=postgresql://postgres:yourpassword@localhost:5432/user_management
JWT_SECRET=this_is_a_super_secret_key_change_it
JWT_EXPIRES_IN=1h
```

**frontend/.env**
```
VITE_API_URL=http://localhost:5000/api
```

---

## 9. API Reference

| Method | Route                | Protected? | Description               |
|--------|-----------------------|------------|----------------------------|
| POST   | /api/auth/register    | No         | Create a new account       |
| POST   | /api/auth/login       | No         | Log in, returns JWT token  |
| GET    | /api/users             | Yes        | Get all users (supports `?search=`) |
| GET    | /api/users/:id         | Yes        | Get one user               |
| POST   | /api/users             | Yes        | Create a user              |
| PUT    | /api/users/:id         | Yes        | Update a user              |
| DELETE | /api/users/:id         | Yes        | Delete a user              |

**Status codes used:** `200` OK, `201` Created, `400` Bad Request, `401` Unauthorized, `403` Forbidden, `404` Not Found, `500` Server Error.

Example error response:
```json
{ "message": "Invalid email or password." }
```

---

## 10. Interview Prep — Likely Questions & Short Answers

**Q: Why use JWT?**
A: JWT lets the server verify a logged-in user on every request WITHOUT storing session data on the server. The token itself carries the user's identity and is verified using a secret key.

**Q: Why hash passwords with bcrypt instead of storing them directly?**
A: If the database is ever leaked, plain text passwords would expose every user's real password. bcrypt hashing is one-way and includes salting, so even identical passwords produce different hashes and can't be reversed.

**Q: Why use middleware for authentication?**
A: Middleware lets us check the JWT token in ONE place and reuse that check across many routes, instead of repeating the same verification code in every route handler.

**Q: Why PostgreSQL instead of just storing data in a file?**
A: PostgreSQL provides structured tables, constraints (like unique email), relationships, indexing, and safely handles many simultaneous read/write operations — a text file can't do any of that reliably.

**Q: Why separate the frontend and backend into two apps?**
A: It follows a clean architecture where the frontend only handles UI/UX and the backend only handles data/business logic. They communicate over HTTP, so either side can be replaced or scaled independently (e.g. swap React for a mobile app without touching the backend).

**Q: What's the difference between `POST /api/auth/register` and `POST /api/users`?**
A: `/api/auth/register` is a public route anyone can use to create their own account. `/api/users` is a protected route (requires login) used to manage users from the Users page, similar to an admin action.

**Q: What happens if the JWT token expires?**
A: `jwt.verify()` throws an error, the middleware catches it and returns `403 Forbidden`, and the frontend would need to prompt the user to log in again.

**Q: Why did you use parameterized queries (`$1, $2`) instead of building SQL strings manually?**
A: To prevent SQL injection attacks — user input is passed as data, never concatenated directly into the SQL command.

---

## 11. Notes

- Passwords are never returned by the API — only `id`, `name`, `email`, and `created_at`.
- All protected routes require the header: `Authorization: Bearer <token>`.
- This project intentionally uses simple, readable code (no TypeScript, no Redux, no ORM) so every line can be explained in an interview.
