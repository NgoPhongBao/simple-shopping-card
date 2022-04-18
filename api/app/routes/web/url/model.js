import mssql from "../../../model/mssql.js";
import MESS from "../../../common/const/mess.const.js";

const model = {
  getSiteInfo: async (queryParams = {}) => {
    const {url} = queryParams
    try {
      const pool = await mssql.pool;
      const res = await pool.request()
        .input("url", url)
        .execute("Url_GetSiteInfoByUrl_Web");
      return {
        data: res.recordset[0] || {},
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
