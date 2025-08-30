import express  from "express";
import { getOrderItems, orderDetails, saveOrder } from "../controller/order.controller.js";
import { verify } from "../middleware/authenticate.js";

const router = express.Router();
router.post("/save",verify,saveOrder);
router.get("/orders",verify,orderDetails);
router.get("/orderItems/:orderDetailsId",verify,getOrderItems);

export default router;