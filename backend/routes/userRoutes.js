const express = require("express");
const bcrypt = require("bcrypt");

const pool = require("../config/db");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Requires a valid JWT for every route below
router.use(authMiddleware);

// GET /api/users?search=john - list users, optional name/email search
router.get("/", async (req, res) => {
  try {
    const { search } = req.query;

    let result;
    if (search) {
      result = await pool.query(
        `SELECT id, name, email, created_at FROM users
         WHERE name ILIKE $1 OR email ILIKE $1
         ORDER BY id ASC`,
        [`%${search}%`]
      );
    } else {
      result = await pool.query(
        "SELECT id, name, email, created_at FROM users ORDER BY id ASC"
      );
    }

    return res.status(200).json(result.rows);
  } catch (error) {
    console.error("Get users error:", error.message);
    return res.status(500).json({ message: "Server error while fetching users." });
  }
});

// GET /api/users/:id
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      "SELECT id, name, email, created_at FROM users WHERE id = $1",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "User not found." });
    }

    return res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error("Get user error:", error.message);
    return res.status(500).json({ message: "Server error while fetching users." });
  }
});

// POST /api/users - separate from /api/auth/register, used by a logged-in user to add another user
router.post("/", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Name, email and password are required.",
      });
    }

    // Keep password validation consistent with /api/auth/register
    if (password.length < 6) {
      return res.status(400).json({
        message: "Password must be at least 6 characters.",
      });
    }

    const existingUser = await pool.query(
      "SELECT id FROM users WHERE email = $1",
      [email]
    );

    if (existingUser.rows.length > 0) {
      return res.status(400).json({
        message: "A user with this email already exists.",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await pool.query(
      `INSERT INTO users (name, email, password)
       VALUES ($1, $2, $3)
       RETURNING id, name, email, created_at`,
      [name, email, hashedPassword]
    );

    return res.status(201).json({
      message: "User created successfully.",
      user: newUser.rows[0],
    });
  } catch (error) {
    console.error("Create user error:", error.message);
    return res.status(500).json({
      message: "Server error while creating user.",
    });
  }
});

// PUT /api/users/:id - updates name and email only
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email } = req.body;

    if (!name || !email) {
      return res.status(400).json({
        message: "Name and email are required.",
      });
    }

    const result = await pool.query(
      `UPDATE users SET name = $1, email = $2 WHERE id = $3
       RETURNING id, name, email, created_at`,
      [name, email, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "User not found.",
      });
    }

    return res.status(200).json({
      message: "User updated successfully.",
      user: result.rows[0],
    });
  } catch (error) {
    console.error("Update user error:", error.message);
    return res.status(500).json({
      message: "Server error while updating user.",
    });
  }
});

// DELETE /api/users/:id
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      "DELETE FROM users WHERE id = $1 RETURNING id",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "User not found.",
      });
    }

    return res.status(200).json({
      message: "User deleted successfully.",
    });
  } catch (error) {
    console.error("Delete user error:", error.message);
    return res.status(500).json({
      message: "Server error while deleting user.",
    });
  }
});

module.exports = router;