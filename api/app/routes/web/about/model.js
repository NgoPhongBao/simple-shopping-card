import mssql from "../../../model/mssql.js";
import MESS from "../../../common/const/mess.const.js";

const model = {
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
