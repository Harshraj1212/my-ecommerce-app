import express from "express";
import path from "path";
import session from "express-session";
import { fileURLToPath } from "url";
import bodyParser from "body-parser";

// Load environment variables FIRST
import './loadEnv.js'; // This will run dotenv.config() immediately

console.log("MAIN FILE - DB_HOST:", process.env.DB_HOST);

// Now import other modules
import indexRoute from "./routes/index.route.js";
import cartRoute from "./routes/cart.route.js";
import orderRoute from "./routes/order.route.js";
import productRoute from "./routes/product.route.js";
import mysqlSessionImport from "express-mysql-session";
import pool from "./db/dbConfig.js"; // This should now work

const MySQLStore = mysqlSessionImport(session);
const sessionStore = new MySQLStore({}, pool.promise());

const app = express();
app.set("view engine", "ejs");

const __dirname = path.dirname(fileURLToPath(import.meta.url));
app.use(express.static(path.join(__dirname, "public")));

app.use(session({
    key: "user_side",
    secret: "xxxxxxxxxxxxxxxxx",
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/", indexRoute);
app.use("/cart", cartRoute);
app.use("/order", orderRoute);
app.use("/product", productRoute);

// Test connection
pool.getConnection((err, connection) => {
  if (err) {
    console.error('Database connection failed:', err.message);
    console.error('Error code:', err.code);
  } else {
    console.log('Database connected successfully');
    connection.release();
  }
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});