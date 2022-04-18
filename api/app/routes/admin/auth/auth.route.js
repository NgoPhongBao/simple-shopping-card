import express from "express";
const authRouter = express.Router();
import authController from "./auth.controller.js";

authRouter.post("/auth/login", authController.login);

export default authRouter;
