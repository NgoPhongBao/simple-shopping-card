import mssql from "../../../model/mssql.js";
import MESS from "../../../common/const/mess.const.js";

const model = {
  getAll: async () => {
    try {
      const pool = await mssql.pool;
      const res = await pool
        .request()
        .execute("Brand_Get_Web");
      return {
        data: res.recordset,
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
