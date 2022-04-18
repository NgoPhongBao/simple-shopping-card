import userModel from "./user.model.js";
import {
  errorResponse,
  successResponse,
} from "../../../common/helper/response.helper.js";

const userController = {
  createUser: async (req, res) => {
    const {username: createdUser} = req
    try {
      const userRes = await userModel.createOrUpdateUser({...req.body, createdUser});
      if (userRes.error) {
        return res.status(400).json(errorResponse(userRes));
      }
      return res.status(200).json(successResponse(userRes));
    } catch (error) {
      return res.status(400).json(
        errorResponse({
          message: error.message,
        })
      );
    }
  },
  getListUser: async (req, res) => {
    try {
      const userRes = await userModel.getListUser(req.query);
      if (userRes.error) {
        return res.status(400).json(errorResponse(userRes));
      }
      return res.status(200).json(successResponse(userRes));
    } catch (error) {
      return res.status(400).json(
        errorResponse({
          message: error.message,
        })
      );
    }
  },
  deleteUser: async (req, res) => {
    const {id} = req.params
    try {
      const userRes = await userModel.deleteUser(id);
      if (userRes.error) {
        return res.status(400).json(errorResponse(userRes));
      }
      return res.status(200).json(successResponse(userRes));
    } catch (error) {
      return res.status(400).json(
        errorResponse({
          message: error.message,
        })
      );
    }
  },
  getUserDetail: async (req, res) => {
    const {id} = req.params
    try {
      const userRes = await userModel.getUserDetail(id);
      if (userRes.error) {
        return res.status(400).json(errorResponse(userRes));
      }
      return res.status(200).json(successResponse(userRes));
    } catch (error) {
      return res.status(400).json(
        errorResponse({
          message: error.message,
        })
      );
    }
  },
  updateUser: async (req, res) => {
    const {id} = req.params
    const {username} = req
    try {
      const userRes = await userModel.createOrUpdateUser({...req.body, username, id});
      if (userRes.error) {
        return res.status(400).json(errorResponse(userRes));
      }
      return res.status(200).json(successResponse(userRes));
    } catch (error) {
      return res.status(400).json(
        errorResponse({
          message: error.message,
        })
      );
    }
  },
  changePassword: async (req, res) => {
    const {id} = req.params
    const {username} = req
    try {
      const userRes = await userModel.changePassword({...req.body, username, id});
      if (userRes.error) {
        return res.status(400).json(errorResponse(userRes));
      }
      return res.status(200).json(successResponse(userRes));
    } catch (error) {
      return res.status(400).json(
        errorResponse({
          message: error.message,
        })
      );
    }
  },
  profile: async (req, res) => {
    const {username} = req
    try {
      const userRes = await userModel.profile(username);
      if (userRes.error) {
        return res.status(400).json(errorResponse(userRes));
      }
      return res.status(200).json(successResponse(userRes));
    } catch (error) {
      return res.status(400).json(
        errorResponse({
          message: error.message,
        })
      );
    }
  },
};


export default userController;
