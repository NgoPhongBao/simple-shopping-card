import uploadModel from "./upload.model.js";
import {
  errorResponse,
  successResponse,
} from "../../../common/helper/response.helper.js";
import "dotenv/config"

const uploadController = {
  uploadImage: async (req, res) => {
    const {base64} = req.body
    try {
      const uploadRes = await uploadModel.uploadImage(base64);
      if (uploadRes.error) {
        return res.status(400).json(errorResponse(uploadRes));
      }
      return res.status(200).json(successResponse(uploadRes));
    } catch (error) {
      return res.status(400).json(
        errorResponse({
          message: error.message,
        })
      );
    }
  },
};


export default uploadController;
