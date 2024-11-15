const { Pool } = require('pg');
require('dotenv').config();

// Create a new Pool instance to manage database connections
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

// Export the pool for use in other files
module.exports = pool;
