import express from "express";
const router = express.Router();
import controller from "./controller.js";

router.get("/product/home", controller.getProductHome);
router.get("/product/:id(\\d+)", controller.detail);
router.get("/product", controller.getProduct);

export default router;
