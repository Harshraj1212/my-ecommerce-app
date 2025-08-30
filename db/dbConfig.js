import mysql from "mysql2";
import dotenv from "dotenv";

dotenv.config();

const pool = mysql.createPool({
  connectionLimit: 10,
  host: process.env.DB_HOST,      // Railway MySQL host
  user: process.env.DB_USER,      // Railway MySQL user
  password: process.env.DB_PASSWORD,  // Railway MySQL password
  database: process.env.DB_NAME,  // Railway MySQL database
  port: process.env.DB_PORT || 3306
});

export default pool;
