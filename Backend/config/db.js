const mysql = require("mysql2/promise");
require("dotenv").config();

const dbConfig = {
  host: process.env.DB_HOST || "db",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "sundaramg@123",
  database: process.env.DB_NAME || "farm2market",
  port: process.env.DB_PORT || 3306,
};

let connection;

async function connectWithRetry() {
  try {
    connection = await mysql.createConnection(dbConfig);
    console.log("✅ Connected to dha database");
  } catch (err) {
    console.error("❌ Database connection failed, retrying in 5s...", err.message);
    setTimeout(connectWithRetry, 5000);
  }
}

connectWithRetry();

module.exports = {
  getConnection: () => connection,
};
