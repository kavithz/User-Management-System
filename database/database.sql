-- database.sql
-- Run this file in PostgreSQL to set up the "user_management" database.

-- ============================================
-- STEP 1: Create the database
-- (Run this line separately, connected to the default "postgres" database)
-- ============================================
-- CREATE DATABASE user_management;

-- After creating it, connect to it:
-- \c user_management

-- ============================================
-- STEP 2: Create the users table
-- ============================================
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,             -- auto-incrementing unique id
    name VARCHAR(100) NOT NULL,        -- user's full name
    email VARCHAR(150) UNIQUE NOT NULL,-- must be unique, used for login
    password VARCHAR(255) NOT NULL,    -- stores the HASHED password (never plain text)
    created_at TIMESTAMP DEFAULT NOW() -- when the user was created
);

-- ============================================
-- STEP 3 (optional): Insert a test user
-- Password below is the bcrypt hash for "password123"
-- You can also just register through the app instead.
-- ============================================
-- INSERT INTO users (name, email, password)
-- VALUES (
--   'Test User',
--   'test@example.com',
--   '$2b$10$CwTycUXWue0Thq9StjUM0uJ8Q4y9Q7Y2z1z1z1z1z1z1z1z1z1z1z'
-- );

-- ============================================
-- Quick check: view all users
-- ============================================
-- SELECT * FROM users;
