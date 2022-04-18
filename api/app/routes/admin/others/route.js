import express from "express";
const router = express.Router();
import controller from "./controller.js";

router.get("/others/statistic", controller.statistic);

export default router;
