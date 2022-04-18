import mssql from "../../../model/mssql.js";
import MESS from "../../../common/const/mess.const.js";
import { isBase64 } from "../../../common/helper/file.helper.js";
import uploadModel from "../upload/upload.model.js";

const storeModel = {
  createOrUpdateStore: async (body) => {
    let {
      storeId = null,
      storeName = "",
      address = "",
      taxCode = "",
      email = "",
      phoneNumber = "",
      maps = "",
      openTime = "",
      logoUrl = "",
      imageUrl = "",
      shortDescription = "",
    } = body;
    try {
      if (logoUrl) {
        if (isBase64(logoUrl)) {
          const imgRes = await uploadModel.uploadImage(logoUrl);
          if (imgRes.error) {
            return {
              error: true,
              message: MESS.createFailed,
            };
          }
          logoUrl = imgRes.data;
        }
      }

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
        .input("storeId", storeId)
        .input("storeName", storeName)
        .input("address", address)
        .input("taxCode", taxCode)
        .input("email", email)
        .input("phoneNumber", phoneNumber)
        .input("maps", maps)
        .input("openTime", openTime)
        .input("logoUrl", logoUrl)
        .input("imageUrl", imageUrl)
        .input("shortDescription", shortDescription)
        .execute("Store_CreateOrUpdate_Admin");
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

  getOneStore: async () => {
    try {
      const pool = await mssql.pool;
      const res = await pool.request().execute("Store_GetOne_Admin");
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

export default storeModel;
