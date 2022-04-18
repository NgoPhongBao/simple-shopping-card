import model from "./model.js";
import {
  errorResponse,
  successResponse,
} from "../../../common/helper/response.helper.js";

const controller = {
  getList: async (req, res) => {
    try {
      const response = await model.getList(req.query);
      if (response.error) {
        return res.status(400).json(errorResponse(response));
      }
      return res.status(200).json(successResponse(response));
    } catch (error) {
      return res.status(400).json(
        errorResponse({
          message: error.message,
        })
      );
    }
  },
  detail: async (req, res) => {
    const { id } = req.params;
    try {
      const response = await model.detail(id);
      if (response.error) {
        return res.status(400).json(errorResponse(response));
      }
      return res.status(200).json(successResponse(response));
    } catch (error) {
      return res.status(400).json(
        errorResponse({
          message: error.message,
        })
      );
    }
  },
  update: async (req, res) => {
    const { id } = req.params;
    const { username } = req;
    try {
      const response = await model.update({
        ...req.body,
        username,
        id,
      });
      if (response.error) {
        return res.status(400).json(errorResponse(response));
      }
      return res.status(200).json(successResponse(response));
    } catch (error) {
      return res.status(400).json(
        errorResponse({
          message: error.message,
        })
      );
    }
  },
};

export default controller;
