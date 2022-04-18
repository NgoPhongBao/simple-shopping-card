import model from "./model.js";
import {
  errorResponse,
  successResponse,
} from "../../../common/helper/response.helper.js";
import { query } from "express";

const controller = {
  getMenu: async (req, res) => {
    try {
      const _res = await model.getMenu();
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

  getTop: async (req, res) => {
    try {
      const _res = await model.getTop();
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
