import express from "express";
const router = express.Router();
import controller from "./controller.js";

router.get("/cusorder", controller.getList);
router.get("/cusorder/:id(\\d+)", controller.detail);
router.put("/cusorder/:id(\\d+)", controller.update);

export default router;
