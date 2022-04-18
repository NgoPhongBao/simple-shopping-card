import model from "./model.js";
import {
  errorResponse,
  successResponse,
} from "../../../common/helper/response.helper.js";

const controller = {
  getOne: async (req, res) => {
    try {
      const response = await model.getOne();
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
