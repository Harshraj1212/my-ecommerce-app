import express from "express";
import path from "path";
import session from "express-session";
import { fileURLToPath } from "url";
import bodyParser from "body-parser";

import indexRoute from "./routes/index.route.js";
import cartRoute from "./routes/cart.route.js";
import orderRoute from "./routes/order.route.js";
import productRoute from "./routes/product.route.js";

const app = express();

// Fix typo
app.set("view engine", "ejs");

const __dirname = path.dirname(fileURLToPath(import.meta.url));
app.use(express.static(path.join(__dirname, "public")));

app.use(session({
  secret: "xxxxxxxxxxxxxxxxx",   // <-- change later if possible
  resave: false,
  saveUninitialized: true
}));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/", indexRoute);
app.use("/cart", cartRoute);
app.use("/order", orderRoute);
app.use("/product", productRoute);

// Make port dynamic for deployment
const PORT = process.env.PORT || 7001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
