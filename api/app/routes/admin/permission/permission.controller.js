import permissionModel from "./permission.model.js";
import {
  errorResponse,
  successResponse,
} from "../../../common/helper/response.helper.js";

const permissionController = {
  createPermission: async (req, res) => {
    const {username} = req
    try {
      const permissionRes = await permissionModel.createOrUpdatePermission({...req.body, username});
      if (permissionRes.error) {
        return res.status(400).json(errorResponse(permissionRes));
      }
      return res.status(200).json(successResponse(permissionRes));
    } catch (error) {
      return res.status(400).json(
        errorResponse({
          message: error.message,
        })
      );
    }
  },
  getListPermission: async (req, res) => {
    try {
      const permissionRes = await permissionModel.getListPermission(req.query);
      if (permissionRes.error) {
        return res.status(400).json(errorResponse(permissionRes));
      }
      return res.status(200).json(successResponse(permissionRes));
    } catch (error) {
      return res.status(400).json(
        errorResponse({
          message: error.message,
        })
      );
    }
  },
  deletePermission: async (req, res) => {
    const {id} = req.params
    try {
      const permissionRes = await permissionModel.deletePermission(id);
      if (permissionRes.error) {
        return res.status(400).json(errorResponse(permissionRes));
      }
      return res.status(200).json(successResponse(permissionRes));
    } catch (error) {
      return res.status(400).json(
        errorResponse({
          message: error.message,
        })
      );
    }
  },
  getPermissionDetail: async (req, res) => {
    const {id} = req.params
    try {
      const permissionRes = await permissionModel.getPermissionDetail(id);
      if (permissionRes.error) {
        return res.status(400).json(errorResponse(permissionRes));
      }
      return res.status(200).json(successResponse(permissionRes));
    } catch (error) {
      return res.status(400).json(
        errorResponse({
          message: error.message,
        })
      );
    }
  },
  updatePermission: async (req, res) => {
    const {id} = req.params
    const {username} = req
    try {
      const permissionRes = await permissionModel.createOrUpdatePermission({...req.body, username, id});
      if (permissionRes.error) {
        return res.status(400).json(errorResponse(permissionRes));
      }
      return res.status(200).json(successResponse(permissionRes));
    } catch (error) {
      return res.status(400).json(
        errorResponse({
          message: error.message,
        })
      );
    }
  },
  getAllPermission: async (req, res) => {
    try {
      const permissionRes = await permissionModel.getAllPermission(req.query);
      if (permissionRes.error) {
        return res.status(400).json(errorResponse(permissionRes));
      }
      return res.status(200).json(successResponse(permissionRes));
    } catch (error) {
      return res.status(400).json(
        errorResponse({
          message: error.message,
        })
      );
    }
  },
};


export default permissionController;
