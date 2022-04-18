import model from "./model.js";
import {
  errorResponse,
  successResponse,
} from "../../../common/helper/response.helper.js";

const controller = {
  create: async (req, res) => {
    const {username} = req
    try {
      const productRes = await model.createOrUpdateNews({...req.body, username});
      if (productRes.error) {
        return res.status(400).json(errorResponse(productRes));
      }
      return res.status(200).json(successResponse(productRes));
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
      const productRes = await model.getList(req.query);
      if (productRes.error) {
        return res.status(400).json(errorResponse(productRes));
      }
      return res.status(200).json(successResponse(productRes));
    } catch (error) {
      return res.status(400).json(
        errorResponse({
          message: error.message,
        })
      );
    }
  },
  delete: async (req, res) => {
    const {id} = req.params
    try {
      const productRes = await model.delete(id);
      if (productRes.error) {
        return res.status(400).json(errorResponse(productRes));
      }
      return res.status(200).json(successResponse(productRes));
    } catch (error) {
      return res.status(400).json(
        errorResponse({
          message: error.message,
        })
      );
    }
  },
  detail: async (req, res) => {
    const {id} = req.params
    try {
      const productRes = await model.detail(id);
      if (productRes.error) {
        return res.status(400).json(errorResponse(productRes));
      }
      return res.status(200).json(successResponse(productRes));
    } catch (error) {
      return res.status(400).json(
        errorResponse({
          message: error.message,
        })
      );
    }
  },
  update: async (req, res) => {
    const {id} = req.params
    const {username} = req
    try {
      const productRes = await model.createOrUpdateNews({...req.body, username, id });
      if (productRes.error) {
        return res.status(400).json(errorResponse(productRes));
      }
      return res.status(200).json(successResponse(productRes));
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
