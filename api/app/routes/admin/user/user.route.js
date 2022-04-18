import express from "express";
const userRouter = express.Router();
import userController from "./user.controller.js";

userRouter.post("/user", userController.createUser);
userRouter.get("/user", userController.getListUser);
userRouter.get("/user/:id(\\d+)", userController.getUserDetail);
userRouter.put("/user/:id(\\d+)", userController.updateUser);
userRouter.delete("/user/:id(\\d+)", userController.deleteUser);
userRouter.put("/user/change-password/:id(\\d+)", userController.changePassword);
userRouter.get("/user/profile", userController.profile);

export default userRouter;
