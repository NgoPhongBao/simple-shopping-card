import authModel from "./auth.model.js";
import {
  errorResponse,
  successResponse,
} from "../../../common/helper/response.helper.js";

const authController = {
  login: async (req, res) => {
    try {
      const authRes = await authModel.login(req.body);
      if (authRes.error) {
        return res.status(400).json(errorResponse(authRes));
      }
      return res.status(200).json(successResponse(authRes));
    } catch (error) {
      return res.status(400).json(
        errorResponse({
          message: error.message,
        })
      );
    }
  },
};


export default authController;
