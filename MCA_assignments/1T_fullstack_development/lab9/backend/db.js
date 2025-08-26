const mysql = require("mysql2");
require("dotenv").config();

// First, connect without database to create it if needed
const baseConnection = mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

baseConnection.query(
  `CREATE DATABASE IF NOT EXISTS \`${process.env.DB_NAME}\``,
  (err) => {
    if (err) {
      console.error("Error creating database:", err);
    } else {
      console.log("Database checked/created");
      // Now connect to the database
      db.connect((err) => {
        if (err) {
          console.error("MySQL connection error:", err);
        } else {
          console.log("Connected to MySQL database");
          // Create users table if not exists
          db.query(
            `CREATE TABLE IF NOT EXISTS users (
              id INT AUTO_INCREMENT PRIMARY KEY,
              name VARCHAR(255) NOT NULL,
              email VARCHAR(255) NOT NULL,
              phone VARCHAR(20) NOT NULL,
              profilePic VARCHAR(255) NOT NULL
            )`,
            (err) => {
              if (err) {
                console.error("Error creating users table:", err);
              } else {
                console.log("Users table checked/created");
              }
            }
          );
        }
      });
    }
  }
);

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

module.exports = db;
