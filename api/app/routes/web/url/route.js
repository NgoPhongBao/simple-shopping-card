import express from "express";
const router = express.Router();
import controller from "./controller.js";

router.get("/url", controller.getSiteInfo);

export default router;
