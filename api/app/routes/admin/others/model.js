import mssql from "../../../model/mssql.js";
import MESS from "../../../common/const/mess.const.js";

const model = {
  statistic: async () => {
    try {
      const pool = await mssql.pool;
      const res = await pool.request().execute("GetStatistic_Admin");
      return {
        data: {
          numberOrder: res.recordsets[0].length
            ? res.recordsets[0][0].numberOrder
            : 0,
          numberTurnover: res.recordsets[1].length
            ? res.recordsets[1][0].numberTurnover
            : 0,
            numberView: res.recordsets[2].length
          ? res.recordsets[2][0].numberView
          : 0,
        },
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
