import express from "express";
import path from "path";
import session from "express-session";
import { fileURLToPath } from "url";
import bodyParser from "body-parser";
import dotenv from "dotenv";

import indexRoute from "./routes/index.route.js";
import cartRoute from "./routes/cart.route.js";
import orderRoute from "./routes/order.route.js";
import productRoute from "./routes/product.route.js";
import mysqlSessionImport from "express-mysql-session";
import pool from "./db/dbConfig.js";

dotenv.config();

const MySQLStore = mysqlSessionImport(session);
const sessionStore = new MySQLStore({}, pool.promise())

const app = express();

// Fix typo
app.set("view engine", "ejs");

const __dirname = path.dirname(fileURLToPath(import.meta.url));
app.use(express.static(path.join(__dirname, "public")));

app.use( session({
    key: "user_side",
    secret: "xxxxxxxxxxxxxxxxx",
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24, // 1 day
    },
  })
);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/", indexRoute);
app.use("/cart", cartRoute);
app.use("/order", orderRoute);
app.use("/product", productRoute);

// Make port dynamic for deployment
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
