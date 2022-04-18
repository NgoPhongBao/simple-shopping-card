import bannerModel from "./banner.model.js";
import {
  errorResponse,
  successResponse,
} from "../../../common/helper/response.helper.js";

const bannerController = {

  getBanner: async (req, res) => {
    try {
      const BannerRes = await bannerModel.getBanner();
      if (BannerRes.error) {
        return res.status(400).json(errorResponse(BannerRes));
      }
      return res.status(200).json(successResponse(BannerRes));
    } catch (error) {
      return res.status(400).json(
        errorResponse({
          message: error.message,
        })
      );
    }
  },

};


export default bannerController;
