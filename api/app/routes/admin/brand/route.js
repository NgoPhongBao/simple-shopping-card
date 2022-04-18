import express from "express";
const router = express.Router();
import controller from "./controller.js";

router.post("/brand", controller.create);
router.get("/brand", controller.getList);
router.get("/brand/:id(\\d+)", controller.detail);
router.put("/brand/:id(\\d+)", controller.update);
router.delete("/brand/:id(\\d+)", controller.delete);
router.get("/brand/all", controller.getAll);

export default router;
