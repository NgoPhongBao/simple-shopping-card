import express from "express";
const permissionGroupRouter = express.Router();
import permissionGroupController from "./permission-group.controller.js";

permissionGroupRouter.post("/permission-group", permissionGroupController.createPermissionGroup);
permissionGroupRouter.get("/permission-group", permissionGroupController.getListPermissionGroup);
permissionGroupRouter.get("/permission-group/:id(\\d+)", permissionGroupController.getPermissionGroupDetail);
permissionGroupRouter.put("/permission-group/:id(\\d+)", permissionGroupController.updatePermissionGroup);
permissionGroupRouter.delete("/permission-group/:id(\\d+)", permissionGroupController.deletePermissionGroup);
permissionGroupRouter.get("/permission-group/all", permissionGroupController.getAllPermissionGroup);

export default permissionGroupRouter;
