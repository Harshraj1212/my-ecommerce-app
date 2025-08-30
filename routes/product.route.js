import express  from "express";
import { searching } from "../controller/product.controller.js";

const router = express.Router();

 router.get("/searching/:input",searching);

export default router;