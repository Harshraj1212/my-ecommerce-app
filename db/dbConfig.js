
import mysql from "mysql2";

// For external database connection
const pool = mysql.createPool({
  connectionLimit: 10,
  host: process.env.DB_HOST,        // Only use DB_HOST
  port: process.env.DB_PORT,        // Only use DB_PORT
  user: process.env.DB_USER,        // Only use DB_USER
  password: process.env.DB_PASSWORD, // Only use DB_PASSWORD
  database: process.env.DB_NAME,    // Only use DB_NAME
  // Add SSL for external database connections
  ssl: { rejectUnauthorized: false }
});

// Test connection

pool.getConnection((err, connection) => {
  if (err) {
    console.error('❌ Database connection failed:', err.message);
    console.error('Error code:', err.code);
  } else {
    console.log('✅ Database connected successfully');
    connection.release();
  }
});

export default pool;