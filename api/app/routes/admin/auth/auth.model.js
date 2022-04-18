import mssql from "../../../model/mssql.js";
import MESS from "../../../common/const/mess.const.js";
import { comparePassword } from "../../../common/helper/func.helper.js";
import jwt from "jsonwebtoken";
import "dotenv/config";

const authModel = {
  login: async (body = {}) => {
    let { username = "", password = "" } = body;
    try {
      const pool = await mssql.pool;
      const res = await pool
        .request()
        .input("username", username)
        .execute("UserAccount_GetByUsername_Admin");
      if (!res || !res.recordset.length) {
        return {
          error: true,
          message: "Tài khoản hoặc mật khẩu không chính xác!",
        };
      }
      const hash = res.recordset[0].password;
      const isValidPass = await comparePassword(password, hash);

      if (!isValidPass) {
        return {
          error: true,
          message: "Tài khoản hoặc mật khẩu không chính xác!",
        };
      }

      const data = {
        userId: res.recordset[0].userId,
        username: res.recordset[0].username,
      };

      const accessToken = jwt.sign(data, process.env.ACCESSTOKEN_KEY, {
        expiresIn: "2d",
      });

      return {
        data: { accessToken },
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

export default authModel;
