import storeModel from "./store.model.js";
import {
  errorResponse,
  successResponse,
} from "../../../common/helper/response.helper.js";

const storeController = {
  getOneStore: async (req, res) => {
    const {page} = req.query
    try {
      const storeRes = await storeModel.getOneStore(page);
      if (storeRes.error) {
        return res.status(400).json(errorResponse(storeRes));
      }
      return res.status(200).json(successResponse(storeRes));
    } catch (error) {
      return res.status(400).json(
        errorResponse({
          message: error.message,
        })
      );
    }
  },
};

export default storeController;
