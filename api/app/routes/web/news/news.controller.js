import newsModel from "./news.model.js";
import {
  errorResponse,
  successResponse,
} from "../../../common/helper/response.helper.js";

const newsController = {
  getListNews: async (req, res) => {
    try {
      const newsRes = await newsModel.getListNews(req.query);
      if (newsRes.error) {
        return res.status(400).json(errorResponse(newsRes));
      }
      return res.status(200).json(successResponse(newsRes));
    } catch (error) {
      return res.status(400).json(
        errorResponse({
          message: error.message,
        })
      );
    }
  },
  
  getNewsDetail: async (req, res) => {
    const {id} = req.params
    try {
      const newsRes = await newsModel.getNewsDetail(id);
      if (newsRes.error) {
        return res.status(400).json(errorResponse(newsRes));
      }
      return res.status(200).json(successResponse(newsRes));
    } catch (error) {
      return res.status(400).json(
        errorResponse({
          message: error.message,
        })
      );
    }
  },

};


export default newsController;
