import mssql from "../../../model/mssql.js";
import MESS from "../../../common/const/mess.const.js";

const model = {
  order: async (bodyParams = {}) => {
    const {
      cart = [],
      fullName = "",
      phoneNumber = "",
      address = "",
    } = bodyParams;
    try {
      const pool = await mssql.pool;
      const res = await pool
        .request()
        .input("fullName", fullName)
        .input("phoneNumber", phoneNumber)
        .input("address", address)
        .execute("CusOrder_Create_Web");

      const orderId = res.recordset[0] ? res.recordset[0].orderId : null;

      if (!orderId) {
        return {
          error: true,
          message: MESS.requestFailed,
        };
      }

      cart.forEach(async (el) => {
        await pool
          .request()
          .input("orderId", orderId)
          .input("productId", el.productId)
          .input("number", el.number)
          .input("price", el.price)
          .execute("OrderDetail_Create_Web");
      });

      return {
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
