import model from "./model.js";
import {
  errorResponse,
  successResponse,
} from "../../../common/helper/response.helper.js";

const controller = {
  updateView: async (req, res) => {
    try {
      if (!req.session.views) {
        req.session.views = 1;
        const _res = await model.updateView();
        if (_res.error) {
          return res.status(400).json(errorResponse(_res));
        }
      } else {
        req.session.views += 1;
      }
      return res
        .status(200)
        .json(
          successResponse({
            message: "Update view successfully!",
            data: { views: req.session.views },
          })
        );
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
