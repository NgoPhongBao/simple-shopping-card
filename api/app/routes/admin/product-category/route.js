import express from "express";
const router = express.Router();
import controller from "./controller.js";

router.post("/product-category", controller.create);
router.get("/product-category", controller.getList);
router.get("/product-category/:id(\\d+)", controller.detail);
router.put("/product-category/:id(\\d+)", controller.update);
router.delete("/product-category/:id(\\d+)", controller.delete);
router.get("/product-category/all", controller.getAll);

export default router;
