import express from "express";
const router = express.Router();
import controller from "./controller.js";

router.put("/view", controller.updateView);

export default router;
