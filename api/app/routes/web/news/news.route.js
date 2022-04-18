import express from "express";
const newsRouter = express.Router();
import newsController from "./news.controller.js";

newsRouter.get("/news", newsController.getListNews);
newsRouter.get("/news/:id(\\d+)", newsController.getNewsDetail);

export default newsRouter;
