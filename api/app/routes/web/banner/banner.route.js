import express from "express";
const bannerRouter = express.Router();
import bannerController from "./banner.controller.js";

bannerRouter.get("/banner", bannerController.getBanner);

export default bannerRouter;
