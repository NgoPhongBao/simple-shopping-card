import express from "express";
const router = express.Router();
import controller from "./controller.js";

router.post("/order", controller.order);

export default router;
