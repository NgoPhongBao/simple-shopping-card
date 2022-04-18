import mssql from "../../../model/mssql.js";
import MESS from "../../../common/const/mess.const.js";

const model = {
  getView: async () => {
    try {
      const pool = await mssql.pool;
      const res = await pool.request()
        .execute("ViewNum_Get_Admin");
      return {
        data: res.recordset,
        message: MESS.updateSuccess,
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
