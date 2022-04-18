import mssql from "../../../model/mssql.js";
import MESS from "../../../common/const/mess.const.js";

const newsModel = {
  getListNews: async (query = {}) => {
    const { pageSize = 10, pageIndex = 1 } = query;

    try {
      const pool = await mssql.pool;
      const res = await pool
        .request()
        .input("pageSize", pageSize)
        .input("pageIndex", pageIndex)
        .execute("News_GetList_Web");
      return {
        data: {
          totalItems: res.recordset.length ? res.recordset[0].TotalItems : 0,
          pageSize,
          pageIndex,
          items: res.recordset.length ? res.recordset : [],
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

  getNewsDetail: async (id) => {
    try {
      const pool = await mssql.pool;
      const res = await pool
        .request()
        .input("NewsId", id)
        .execute("News_GetDetail_Web");
      if (res.recordset.length) {
        return {
          data: res.recordset[0],
          message: MESS.requestSuccess,
        };
      }
      return {
        error: true,
        message: MESS.notFound,
      };
    } catch (error) {
      return {
        error,
        message: error.message,
      };
    }
  },
};

export default newsModel;
