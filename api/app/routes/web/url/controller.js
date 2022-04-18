import model from "./model.js";
import {
  errorResponse,
  successResponse,
} from "../../../common/helper/response.helper.js";

const controller = {
  getSiteInfo: async (req, res) => {
    try {
      const _res = await model.getSiteInfo(req.query);
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
