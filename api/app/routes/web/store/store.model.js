import mssql from "../../../model/mssql.js";
import MESS from "../../../common/const/mess.const.js";

const storeModel = {
  getOneStore: async (page = "") => {
    try {
      const pool = await mssql.pool;
      const res = await pool
        .request()
        .execute("Store_GetOne_Web");
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
