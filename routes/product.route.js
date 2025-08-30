import express from "express";
import { searching, allProducts } from "../controller/product.controller.js";

const router = express.Router();

// List all products
router.get("/products", allProducts);

// Search products
router.get("/searching/:input", searching);

export default router;
