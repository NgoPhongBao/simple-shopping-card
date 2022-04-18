import express from "express";
const permissionRouter = express.Router();
import permissionController from "./permission.controller.js";

permissionRouter.post("/permission", permissionController.createPermission);
permissionRouter.get("/permission", permissionController.getListPermission);
permissionRouter.get("/permission/:id(\\d+)", permissionController.getPermissionDetail);
permissionRouter.put("/permission/:id(\\d+)", permissionController.updatePermission);
permissionRouter.delete("/permission/:id(\\d+)", permissionController.deletePermission);
permissionRouter.get("/permission/all", permissionController.getAllPermission);

export default permissionRouter;
