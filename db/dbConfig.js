import mysql from "mysql2";
import dotenv from "dotenv";

dotenv.config(); // load env variables

let pool = mysql.createPool({
  connectionLimit: 100,
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
 port: process.env.MYSQL_PORT
});

export default pool;
