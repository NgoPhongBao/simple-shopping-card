import express from "express";
const router = express.Router();
import controller from "./controller.js";

router.post("/product", controller.create);
router.get("/product", controller.getList);
router.get("/product/:id(\\d+)", controller.detail);
router.put("/product/:id(\\d+)", controller.update);
router.delete("/product/:id(\\d+)", controller.delete);

export default router;
