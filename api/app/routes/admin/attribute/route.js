import express from "express";
const router = express.Router();
import controller from "./controller.js";

router.post("/attribute", controller.create);
router.get("/attribute", controller.getList);
router.get("/attribute/:id(\\d+)", controller.detail);
router.put("/attribute/:id(\\d+)", controller.update);
router.delete("/attribute/:id(\\d+)", controller.delete);
router.get("/attribute/all", controller.getAll);

export default router;
