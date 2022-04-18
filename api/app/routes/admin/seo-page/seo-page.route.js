import express from "express";
const seoPageRouter = express.Router();
import seoPageController from "./seo-page.controller.js";

seoPageRouter.get("/seo-page", seoPageController.getDetailSeoPage);
seoPageRouter.put("/seo-page", seoPageController.updateSeoPage);

export default seoPageRouter;
