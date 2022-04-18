import express from "express";
const router = express.Router();
import controller from "./controller.js";

router.get("/about", controller.getOne);
router.put("/about", controller.createOrUpdate);

export default router;
