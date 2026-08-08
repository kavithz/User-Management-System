const { Pool } = require("pg");
require("dotenv").config();

// A pool manages multiple connections so we don't open/close one per query
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

pool
  .connect()
  .then((client) => {
    console.log("PostgreSQL connected successfully");
    client.release();
  })
  .catch((err) => {
    console.error("PostgreSQL connection error:", err.message);
  });

module.exports = pool;
