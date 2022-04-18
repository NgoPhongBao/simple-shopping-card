import mssql from "../../../model/mssql.js";
import MESS from "../../../common/const/mess.const.js";
import { hashPassword } from "../../../common/helper/func.helper.js";

const userModel = {
  createOrUpdateUser: async (body = {}) => {
    let {
      id = null,
      fullName = "",
      username = "",
      permissionGroupId = null,
      phoneNumber = "",
      enable = 1,
      isAdmin = 0,
      createdUser = "",
    } = body;
    try {
      const hash = await hashPassword("123456");
      const pool = await mssql.pool;
      await pool
        .request()
        .input("userId", id)
        .input("fullName", fullName)
        .input("username", username)
        .input("password", hash)
        .input("permissionGroupId", permissionGroupId)
        .input("phoneNumber", phoneNumber)
        .input("enable", enable)
        .input("isAdmin", isAdmin)
        .input("createdUser", createdUser)
        .execute("UserAccount_CreateOrUpdate_Admin");
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
  getListUser: async (query = {}) => {
    const { pageSize = 10, pageIndex = 1, keyword = "", enable = null } = query;

    try {
      const pool = await mssql.pool;
      const res = await pool
        .request()
        .input("pageSize", pageSize)
        .input("pageIndex", pageIndex)
        .input("keyword", keyword)
        .input("enable", enable)
        .execute("UserAccount_GetList_Admin");
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
  deleteUser: async (id) => {
    try {
      const pool = await mssql.pool;
      await pool
        .request()
        .input("UserId", id)
        .execute("UserAccount_Delete_Admin");
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
  getUserDetail: async (id) => {
    try {
      const pool = await mssql.pool;
      const res = await pool
        .request()
        .input("UserId", id)
        .execute("UserAccount_GetDetail_Admin");
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
  changePassword: async (body = {}) => {
    const { password = "", id, username } = body;
    try {
      const hash = await hashPassword(password);

      const pool = await mssql.pool;
      await pool
        .request()
        .input("userId", id)
        .input("password", hash)
        .input("modifyUser", username)
        .execute("UserAccount_ChangePassword_Admin");
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
  profile: async (username) => {
    try {
      const pool = await mssql.pool;
      const res = await pool
        .request()
        .input("username", username)
        .execute("UserAccount_GetDetailByUsername_Admin");
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

export default userModel;
