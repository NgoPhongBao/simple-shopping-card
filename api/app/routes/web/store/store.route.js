import express from "express";
const storeRouter = express.Router();
import storeController from "./store.controller.js";

storeRouter.get("/store", storeController.getOneStore);

export default storeRouter;
