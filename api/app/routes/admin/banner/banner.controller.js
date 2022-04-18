import bannerModel from "./banner.model.js";
import {
  errorResponse,
  successResponse,
} from "../../../common/helper/response.helper.js";

const BannerController = {
  createBanner: async (req, res) => {
    const {username} = req
    try {
      const BannerRes = await bannerModel.createOrUpdateBanner({...req.body, username});
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
  getListBanner: async (req, res) => {
    try {
      const BannerRes = await bannerModel.getListBanner(req.query);
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
  deleteBanner: async (req, res) => {
    const {id} = req.params
    try {
      const BannerRes = await bannerModel.deleteBanner(id);
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
  getBannerDetail: async (req, res) => {
    const {id} = req.params
    try {
      const BannerRes = await bannerModel.getBannerDetail(id);
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
  updateBanner: async (req, res) => {
    const {id} = req.params
    const {username} = req
    try {
      const BannerRes = await bannerModel.createOrUpdateBanner({...req.body, username, id });
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


export default BannerController;
