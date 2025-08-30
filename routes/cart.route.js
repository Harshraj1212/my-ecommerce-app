import express  from "express";
import {addToCart, loadCarts, cartView, updateQty, getCart} from "../controller/cart.controller.js";
import { verify } from "../middleware/authenticate.js";

const router = express.Router();
router.get("/addToCart/:userId/:productId",verify,addToCart);
router.get("/loadCarts/:userId",verify,loadCarts);
router.get("/goToCart/:userId",verify,cartView);
router.get("/addToCart/updateQty/:qty/:userId/:productId",verify,updateQty);
router.get("/getCart/:userId",verify,getCart);

export default router;