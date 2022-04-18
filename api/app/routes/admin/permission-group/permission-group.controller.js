import permissionGroupModel from "./permission-group.model.js";
import {
  errorResponse,
  successResponse,
} from "../../../common/helper/response.helper.js";

const permissionGroupController = {
  createPermissionGroup: async (req, res) => {
    const {username} = req
    try {
      const permissionGroupRes = await permissionGroupModel.createOrUpdatePermissionGroup({...req.body, username});
      if (permissionGroupRes.error) {
        return res.status(400).json(errorResponse(permissionGroupRes));
      }
      return res.status(200).json(successResponse(permissionGroupRes));
    } catch (error) {
      return res.status(400).json(
        errorResponse({
          message: error.message,
        })
      );
    }
  },
  getListPermissionGroup: async (req, res) => {
    try {
      const permissionGroupRes = await permissionGroupModel.getListPermissionGroup(req.query);
      if (permissionGroupRes.error) {
        return res.status(400).json(errorResponse(permissionGroupRes));
      }
      return res.status(200).json(successResponse(permissionGroupRes));
    } catch (error) {
      return res.status(400).json(
        errorResponse({
          message: error.message,
        })
      );
    }
  },
  deletePermissionGroup: async (req, res) => {
    const {id} = req.params
    try {
      const permissionGroupRes = await permissionGroupModel.deletePermissionGroup(id);
      if (permissionGroupRes.error) {
        return res.status(400).json(errorResponse(permissionGroupRes));
      }
      return res.status(200).json(successResponse(permissionGroupRes));
    } catch (error) {
      return res.status(400).json(
        errorResponse({
          message: error.message,
        })
      );
    }
  },
  getPermissionGroupDetail: async (req, res) => {
    const {id} = req.params
    try {
      const permissionGroupRes = await permissionGroupModel.getPermissionGroupDetail(id);
      if (permissionGroupRes.error) {
        return res.status(400).json(errorResponse(permissionGroupRes));
      }
      return res.status(200).json(successResponse(permissionGroupRes));
    } catch (error) {
      return res.status(400).json(
        errorResponse({
          message: error.message,
        })
      );
    }
  },
  updatePermissionGroup: async (req, res) => {
    const {id} = req.params
    const {username} = req
    try {
      const permissionGroupRes = await permissionGroupModel.createOrUpdatePermissionGroup({...req.body, username, id});
      if (permissionGroupRes.error) {
        return res.status(400).json(errorResponse(permissionGroupRes));
      }
      return res.status(200).json(successResponse(permissionGroupRes));
    } catch (error) {
      return res.status(400).json(
        errorResponse({
          message: error.message,
        })
      );
    }
  },
  getAllPermissionGroup: async (req, res) => {
    try {
      const permissionGroupRes = await permissionGroupModel.getAllPermissionGroup();
      if (permissionGroupRes.error) {
        return res.status(400).json(errorResponse(permissionGroupRes));
      }
      return res.status(200).json(successResponse(permissionGroupRes));
    } catch (error) {
      return res.status(400).json(
        errorResponse({
          message: error.message,
        })
      );
    }
  },
};


export default permissionGroupController;
