// in your routes file
import express from "express";
import { contactPage } from "../controller/index.controller.js";

const router = express.Router();

router.get("/contact", contactPage);

export default router;
