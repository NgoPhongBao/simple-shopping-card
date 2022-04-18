import mssql from "../../../model/mssql.js";
import MESS from "../../../common/const/mess.const.js";
import { isBase64 } from "../../../common/helper/file.helper.js";
import uploadModel from "../upload/upload.model.js";

const model = {
  createOrUpdate: async (body) => {
    let {
      aboutId = null,
      title = "",
      content = "",
      imageUrl = "",
    } = body;
    try {
      if (imageUrl) {
        if (isBase64(imageUrl)) {
          const imgRes = await uploadModel.uploadImage(imageUrl);
          if (imgRes.error) {
            return {
              error: true,
              message: MESS.createFailed,
            };
          }
          imageUrl = imgRes.data;
        }
      }

      const pool = await mssql.pool;
      await pool
        .request()
        .input("aboutId", aboutId)
        .input("title", title)
        .input("content", content)
        .input("imageUrl", imageUrl)
        .execute("About_CreateOrUpdate_Admin");
      return {
        message: MESS.createSuccess,
      };
    } catch (error) {
      return {
        error,
        message: error.message,
      };
    }
  },

  getOne: async () => {
    try {
      const pool = await mssql.pool;
      const res = await pool.request().execute("About_GetOne_Admin");
      if (res.recordset.length) {
        return {
          data: res.recordset[0],
          message: MESS.requestSuccess,
        };
      }
      return {
        data: {},
        message: MESS.requestSuccess,
      };
    } catch (error) {
      return {
        error,
        message: error.message,
      };
    }
  },
};

export default model;
