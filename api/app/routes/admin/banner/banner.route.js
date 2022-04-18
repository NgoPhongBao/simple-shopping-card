import express from "express";
const bannerRouter = express.Router();
import bannerController from "./banner.controller.js";

bannerRouter.post("/banner", bannerController.createBanner);
bannerRouter.get("/banner", bannerController.getListBanner);
bannerRouter.get("/banner/:id(\\d+)", bannerController.getBannerDetail);
bannerRouter.put("/banner/:id(\\d+)", bannerController.updateBanner);
bannerRouter.delete("/banner/:id(\\d+)", bannerController.deleteBanner);

export default bannerRouter;
