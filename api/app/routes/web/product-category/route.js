import express from "express";
const router = express.Router();
import controller from "./controller.js";

router.get("/product-category/menu", controller.getMenu);
router.get("/product-category/top", controller.getTop);
router.get("/product-category/product", controller.getProduct);

export default router;
