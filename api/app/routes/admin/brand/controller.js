import model from "./model.js";
import {
  errorResponse,
  successResponse,
} from "../../../common/helper/response.helper.js";

const controller = {
  create: async (req, res) => {
    const { username } = req;
    try {
      const reponse = await model.createOrUpdate({
        ...req.body,
        username,
      });
      if (reponse.error) {
        return res.status(400).json(errorResponse(reponse));
      }
      return res.status(200).json(successResponse(reponse));
    } catch (error) {
      return res.status(400).json(
        errorResponse({
          message: error.message,
        })
      );
    }
  },
  getList: async (req, res) => {
    try {
      const reponse = await model.getList(req.query);
      if (reponse.error) {
        return res.status(400).json(errorResponse(reponse));
      }
      return res.status(200).json(successResponse(reponse));
    } catch (error) {
      return res.status(400).json(
        errorResponse({
          message: error.message,
        })
      );
    }
  },
  delete: async (req, res) => {
    const { id } = req.params;
    try {
      const reponse = await model.delete(id);
      if (reponse.error) {
        return res.status(400).json(errorResponse(reponse));
      }
      return res.status(200).json(successResponse(reponse));
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
      const reponse = await model.detail(id);
      if (reponse.error) {
        return res.status(400).json(errorResponse(reponse));
      }
      return res.status(200).json(successResponse(reponse));
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
      const reponse = await model.createOrUpdate({
        ...req.body,
        username,
        id,
      });
      if (reponse.error) {
        return res.status(400).json(errorResponse(reponse));
      }
      return res.status(200).json(successResponse(reponse));
    } catch (error) {
      return res.status(400).json(
        errorResponse({
          message: error.message,
        })
      );
    }
  },
  getAll: async (req, res) => {
    const { id } = req.params;
    try {
      const reponse = await model.getAll(id);
      if (reponse.error) {
        return res.status(400).json(errorResponse(reponse));
      }
      return res.status(200).json(successResponse(reponse));
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
