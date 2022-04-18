import model from "./model.js";
import {
  errorResponse,
  successResponse,
} from "../../../common/helper/response.helper.js";

const controller = {
  getProductHome: async (req, res) => {
    try {
      const productRes = await model.getProductHome();
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
    try {
      const productRes = await model.detail(req.params.id);
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
  getProduct: async (req, res) => {
    try {
      const _res = await model.getProduct({...req.query});
      if (_res.error) {
        return res.status(400).json(errorResponse(_res));
      }
      return res.status(200).json(successResponse(_res));
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
