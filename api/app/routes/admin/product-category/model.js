import mssql from "../../../model/mssql.js";
import MESS from "../../../common/const/mess.const.js";

const model = {
  createOrUpdate: async (body = {}) => {
    const {
      id = null,
      productCategoryName = "",
      username = "",
      enable = 1,
      url = "",
      title = "",
      keywords = "",
      description = "",
      isTopCategory = 0
    } = body;
    try {
      const pool = await mssql.pool;

      const  res = await pool
        .request()
        .input("url", url)
        .input("siteId", id)
        .execute("Url_CheckExist_Admin");
      
      if(res.recordset[0].result){
        return {
          error : true,
          message: "URL đã được sử dụng, vui lòng nhập URL khác!",
        };
      }

      await pool
        .request()
        .input("ProductCategoryId", id)
        .input("ProductCategoryName", productCategoryName)
        .input("url", url)
        .input("title", title)
        .input("keywords", keywords)
        .input("description", description)
        .input("isTopCategory", isTopCategory)
        .input("CreatedUser", username)
        .input("enable", enable)
        .execute("ProductCategory_CreateOrUpdate_Admin");
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
        .input("enable", enable)
        .execute("ProductCategory_GetList_Admin");
        return {
          data: {
            totalItems: res.recordset.length ? res.recordset[0].TotalItems : 0,
            pageSize,
            pageindex,
            items: res.recordset.length ? res.recordset : [],
          },
          message: MESS.createSuccess,
        }
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
        .input("ProductCategoryId", id)
        .execute("ProductCategory_Delete_Admin");
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
        .input("ProductCategoryId", id)
        .execute("ProductCategory_GetDetail_Admin");
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
        .execute("ProductCategory_GetAll_Admin");
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
