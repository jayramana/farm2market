const mysql = require("mysql2");

require("dotenv").config();

const connectDB = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
})

connectDB.connect((err) => {
    if (err) {
        throw err;
    }
    console.log("Connected to dha database");
})

const db = connectDB.promise();


module.exports = db;