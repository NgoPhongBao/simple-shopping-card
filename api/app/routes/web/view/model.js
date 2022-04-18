import mssql from "../../../model/mssql.js";
import MESS from "../../../common/const/mess.const.js";

const model = {
  updateView: async () => {
    try {
      const pool = await mssql.pool;
      await pool.request()
        .execute("ViewNum_Update_Web");
      return {
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
