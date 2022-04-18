import mssql from "../../../model/mssql.js";
import MESS from "../../../common/const/mess.const.js";

const seoPageModel = {
  updateSeoPage: async (body) => {
    let {
      page = "",
      // url = "",
      title = "",
      keywords = "",
      description = "",
    } = body;
    try {
      const pool = await mssql.pool;
      await pool
        .request()
        .input("page", page)
        // .input("url", url)
        .input("title", title)
        .input("keywords", keywords)
        .input("description", description)
        .execute("SeoPage_Update_Admin");
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

  getDetailSeoPage: async (page = "") => {
    try {
      const pool = await mssql.pool;
      const res = await pool
        .request()
        .input("page", page)
        .execute("SeoPage_GetDetail_Admin");
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

export default seoPageModel;
