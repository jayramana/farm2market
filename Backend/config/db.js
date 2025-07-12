const mysql = require("mysql2/promise");
require("dotenv").config();

const pool = mysql.createPool({
  host: process.env.DB_HOST || "db",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "sundaramg@123",
  database: process.env.DB_NAME || "farm2market",
  port: process.env.DB_PORT || 3306
});

module.exports = pool;
