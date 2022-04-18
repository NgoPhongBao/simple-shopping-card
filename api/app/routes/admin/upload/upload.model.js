import MESS from "../../../common/const/mess.const.js";
import "dotenv/config"
import {
  getExtensionFromBase64,
  isBase64,
  saveImageBase64,
} from "../../../common/helper/file.helper.js";

const uploadModel = {
  uploadImage: async (base64) => {
    try {
      if(!base64){
        return {
          error: true,
          message: "Upload hình ảnh không thành công",
        };
      }
      if (
        !isBase64(base64) ||
        !getExtensionFromBase64(base64, [".jpeg", ".jpg", ".png", ".gif"])
      ) {
        return {
          error: true,
          message: "Upload hình ảnh không thành công",
        };
      }
      const imgRes = await saveImageBase64(base64);
      return {
        data: imgRes,
        message: "Upload hình ảnh thành công",
      };
    } catch (error) {
      return {
        error,
        message: error.message,
      };
    }
  },
};

export default uploadModel;
