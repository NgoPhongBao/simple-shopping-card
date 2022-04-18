import express from "express";
const newsRouter = express.Router();
import newsController from "./news.controller.js";

newsRouter.post("/news", newsController.createNews);
newsRouter.get("/news", newsController.getListNews);
newsRouter.get("/news/:id(\\d+)", newsController.getNewsDetail);
newsRouter.put("/news/:id(\\d+)", newsController.updateNews);
newsRouter.delete("/news/:id(\\d+)", newsController.deleteNews);

export default newsRouter;
