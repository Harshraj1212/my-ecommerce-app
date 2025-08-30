import mysql from "mysql2";

let pool = mysql.createPool({
    connectionLimit: 100,
    user: "root",
    password: "Harsh@123",
    database: "shoesmall",
    host: "localhost"
});

export default pool;