import model from "./model.js";
import {
  errorResponse,
  successResponse,
} from "../../../common/helper/response.helper.js";

const controller = {
  create: async (req, res) => {
    const { username } = req;
    try {
      const CatRes = await model.createOrUpdate({
        ...req.body,
        username,
      });
      if (CatRes.error) {
        return res.status(400).json(errorResponse(CatRes));
      }
      return res.status(200).json(successResponse(CatRes));
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
      const CatRes = await model.getList(req.query);
      if (CatRes.error) {
        return res.status(400).json(errorResponse(CatRes));
      }
      return res.status(200).json(successResponse(CatRes));
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
      const CatRes = await model.delete(id);
      if (CatRes.error) {
        return res.status(400).json(errorResponse(CatRes));
      }
      return res.status(200).json(successResponse(CatRes));
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
      const CatRes = await model.detail(id);
      if (CatRes.error) {
        return res.status(400).json(errorResponse(CatRes));
      }
      return res.status(200).json(successResponse(CatRes));
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
      const CatRes = await model.createOrUpdate({
        ...req.body,
        username,
        id,
      });
      if (CatRes.error) {
        return res.status(400).json(errorResponse(CatRes));
      }
      return res.status(200).json(successResponse(CatRes));
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
      const CatRes = await model.getAll(id);
      if (CatRes.error) {
        return res.status(400).json(errorResponse(CatRes));
      }
      return res.status(200).json(successResponse(CatRes));
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
