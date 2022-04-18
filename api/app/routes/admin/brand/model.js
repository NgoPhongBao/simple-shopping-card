import mssql from "../../../model/mssql.js";
import MESS from "../../../common/const/mess.const.js";

const model = {
  createOrUpdate: async (body = {}) => {
    const { id = null, brandName = "", username = "" } = body;
    try {
      const pool = await mssql.pool;
      await pool
        .request()
        .input("brandId", id)
        .input("brandName", brandName)
        .input("CreatedUser", username)
        .execute("Brand_CreateOrUpdate_Admin");
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
  getList: async (query = {}) => {
    const { pageSize = 10, pageindex = 1, keyword = "", enable = 1 } = query;
    try {
      const pool = await mssql.pool;
      const res = await pool
        .request()
        .input("pageSize", pageSize)
        .input("pageindex", pageindex)
        .input("keyword", keyword)
        .execute("Brand_GetList_Admin");
      return {
        data: {
          totalItems: res.recordset.length ? res.recordset[0].TotalItems : 0,
          pageSize,
          pageindex,
          items: res.recordset.length ? res.recordset : [],
        },
        message: MESS.createSuccess,
      };
    } catch (error) {
      return {
        error,
        message: error.message,
      };
    }
  },
  delete: async (id) => {
    try {
      const pool = await mssql.pool;
      const res = await pool
        .request()
        .input("brandId", id)
        .execute("Brand_Delete_Admin");
      return {
        message: MESS.deleteSuccess,
      };
    } catch (error) {
      return {
        error,
        message: error.message,
      };
    }
  },
  detail: async (id) => {
    try {
      const pool = await mssql.pool;
      const res = await pool
        .request()
        .input("brandId", id)
        .execute("Brand_GetDetail_Admin");
      return {
        data: res.recordset[0],
        message: MESS.requestSuccess,
      };
    } catch (error) {
      return {
        error,
        message: error.message,
      };
    }
  },
  getAll: async (id) => {
    try {
      const pool = await mssql.pool;
      const res = await pool
        .request()
        .execute("Brand_GetAll_Admin");
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
