import express from "express";
const router = express.Router();
import controller from "./controller.js";

router.get("/brand/all", controller.getAll);

export default router;
