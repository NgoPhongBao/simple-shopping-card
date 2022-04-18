import mssql from "../../../model/mssql.js";
import MESS from "../../../common/const/mess.const.js";

const bannerModel = {
  getBanner: async () => {
    try {
      const pool = await mssql.pool;
      const res = await pool.request().execute("Banner_GetBanner_Web");
      return {
        data: {
          mainBanner: res.recordsets[0] || [],
          subBanner: res.recordsets[1] || [],
          middleBanner: res.recordsets[2]
            ? res.recordsets[2].length
              ? res.recordsets[2][0]
              : {}
            : {},
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

export default bannerModel;
