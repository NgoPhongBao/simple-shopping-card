import express from "express";
const router = express.Router();
import controller from "./controller.js";

router.get("/about", controller.getOne);

export default router;
