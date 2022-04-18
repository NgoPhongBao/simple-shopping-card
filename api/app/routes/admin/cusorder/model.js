import mssql from "../../../model/mssql.js";
import MESS from "../../../common/const/mess.const.js";

const model = {
  update: async (body = {}) => {
    const { id = null, status = 1, username = "", fullName = "", phoneNumber = "", address = "", note } = body;
    try {
      const pool = await mssql.pool;
      await pool
        .request()
        .input("orderId", id)
        .input("Status", status)
        .input("fullName", fullName)
        .input("phoneNumber", phoneNumber)
        .input("address", address)
        .input("note", note)
        .input("ModifyUser", username)
        .execute("CusOrder_Update_Admin");
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
    const { pageSize = 10, pageindex = 1, keyword = "", status = null } = query;
    try {
      const pool = await mssql.pool;
      const res = await pool
        .request()
        .input("pageSize", pageSize)
        .input("pageindex", pageindex)
        .input("keyword", keyword)
        .input("status", status)
        .execute("CusOrder_GetList_Admin");
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
  detail: async (id) => {
    try {
      const pool = await mssql.pool;
      const res = await pool
        .request()
        .input("OrderId", id)
        .execute("CusOrder_GetDetail_Admin");
      return {
        data: {
          ...res.recordsets[0][0],
          products: res.recordsets[1]
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
