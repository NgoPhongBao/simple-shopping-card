import mssql from "../../../model/mssql.js";
import MESS from "../../../common/const/mess.const.js";

const permissionModel = {
  createOrUpdatePermission: async (body = {}) => {
    let {
      id = null,
      permissionName = "",
      permissionKey = "",
      permissionType = "",
      username = ""
    } = body;
    try {
      const pool = await mssql.pool;
      await pool
        .request()
        .input("permissionId", id)
        .input("permissionName", permissionName)
        .input("permissionKey", permissionKey)
        .input("permissionType", permissionType)
        .input("createdUser", username)
        .execute("Permission_CreateOrUpdate_Admin");
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
  getListPermission: async (query = {}) => {
    const { pageSize = 10, pageIndex = 1, keyword = "", permissionType = "" } = query;
    try {
      const pool = await mssql.pool;
      const res = await pool
        .request()
        .input("pageSize", pageSize)
        .input("pageIndex", pageIndex)
        .input("keyword", keyword)
        .input("permissionType", permissionType)
        .execute("Permission_GetList_Admin");
      return {
        data: {
          totalItems: res.recordset.length ? res.recordset[0].totalItems : 0,
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
  deletePermission: async (id) => {
    try {
      const pool = await mssql.pool;
      await pool
        .request()
        .input("permissionId", id)
        .execute("Permission_Delete_Admin");
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
  getPermissionDetail: async (id) => {
    try {
      const pool = await mssql.pool;
      const res = await pool
        .request()
        .input("permissionId", id)
        .execute("Permission_GetDetail_Admin");
      if(res.recordset.length){
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
  getAllPermission: async () => {
    try {
      const pool = await mssql.pool;
      const res = await pool
        .request()
        .execute("Permission_GetAll_Admin");
      return {
        data: res.recordset.length ? res.recordset : [],
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

export default permissionModel;
