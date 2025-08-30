import express  from "express";
import { indexPage,signupPage,signup,signin,signinPage,viewmore,signout } from "../controller/index.controller.js";
import { searching } from "../controller/product.controller.js";
import { verify } from "../middleware/authenticate.js";

const router = express.Router();
router.get("/",indexPage);
router.get("/signin",signinPage);
router.get("/signup",signupPage);
router.post("/signup",signup);
router.post("/signin",signin);
router.get("/signout",verify,signout);
router.get("/viewmore/:pid",viewmore);
router.get("/searching/:input",searching);
router.get("/cart/addToCart/searching/:input",searching);


export default router;