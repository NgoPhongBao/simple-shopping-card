import mssql from "../../../model/mssql.js";
import MESS from "../../../common/const/mess.const.js";

const permissionGroupModel = {
  createOrUpdatePermissionGroup: async (body = {}) => {
    let {
      id = null,
      permissionGroupName = "",
      permissions = [],
      username = "",
    } = body;
    try {
      const pool = await mssql.pool;
      const res = await pool
        .request()
        .input("permissionGroupId", id)
        .input("permissionGroupName", permissionGroupName)
        .input("createdUser", username)
        .execute("PermissionGroup_CreateOrUpdate_Admin");
      const permissionGroupId = res.recordset[0].result;

      if (id) {
        await pool
          .request()
          .input("permissionGroupId", permissionGroupId)
          .execute("PermissionGroupPermisstion_Delete_Admin");
      }

      for (let i = 0; i < permissions.length; i++) {
        await pool
          .request()
          .input("permissionGroupId", permissionGroupId)
          .input("permissionId", permissions[i])
          .execute("PermissionGroupPermisstion_Create_Admin");
      }

      return {
        message: MESS.createSuccess,
      };
    } catch (error) {
      console.log(error)
      return {
        error,
        message: error.message,
      };
    }
  },
  getListPermissionGroup: async (query = {}) => {
    const { pageSize = 10, pageIndex = 1, keyword = "" } = query;
    try {
      const pool = await mssql.pool;
      const res = await pool
        .request()
        .input("pageSize", pageSize)
        .input("pageIndex", pageIndex)
        .input("keyword", keyword)
        .execute("PermissionGroup_GetList_Admin");
      return {
        data: {
          totalItems: res.recordset.length ? res.recordset[0].totalItems : 0,
          pageSize,
          pageIndex,
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
  deletePermissionGroup: async (id) => {
    try {
      const pool = await mssql.pool;
      await pool
        .request()
        .input("permissionGroupId", id)
        .execute("PermissionGroup_Delete_Admin");

      await pool
        .request()
        .input("permissionGroupId", id)
        .execute("PermissionGroupPermisstion_Delete_Admin");
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
  getPermissionGroupDetail: async (id) => {
    try {
      const pool = await mssql.pool;
      const res = await pool
        .request()
        .input("permissionGroupId", id)
        .execute("PermissionGroup_GetDetail_Admin");
      if (res.recordset.length) {
        const data = res.recordset[0];
        data.permissions = (res.recordsets[1] || []).map((el) => el.permissionId)
        return {
          data,
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
  getAllPermissionGroup: async (id) => {
    try {
      const pool = await mssql.pool;
      const res = await pool
        .request()
        .execute("PermissionGroup_GetAll_Admin");
        return {
          data: res.recordset || [],
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

export default permissionGroupModel;
