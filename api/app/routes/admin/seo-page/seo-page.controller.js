import seoPageModel from "./seo-page.model.js";
import {
  errorResponse,
  successResponse,
} from "../../../common/helper/response.helper.js";

const seoPageController = {
  getDetailSeoPage: async (req, res) => {
    const {page} = req.query
    try {
      const seoPageRes = await seoPageModel.getDetailSeoPage(page);
      if (seoPageRes.error) {
        return res.status(400).json(errorResponse(seoPageRes));
      }
      return res.status(200).json(successResponse(seoPageRes));
    } catch (error) {
      return res.status(400).json(
        errorResponse({
          message: error.message,
        })
      );
    }
  },
  updateSeoPage: async (req, res) => {
    try {
      const seoPageRes = await seoPageModel.updateSeoPage(req.body);
      if (seoPageRes.error) {
        return res.status(400).json(errorResponse(seoPageRes));
      }
      return res.status(200).json(successResponse(seoPageRes));
    } catch (error) {
      return res.status(400).json(
        errorResponse({
          message: error.message,
        })
      );
    }
  },
};

export default seoPageController;
