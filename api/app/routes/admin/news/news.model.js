import mssql from "../../../model/mssql.js";
import MESS from "../../../common/const/mess.const.js";
import { isBase64 } from "../../../common/helper/file.helper.js";
import uploadModel from "../upload/upload.model.js";

const newsModel = {
  createOrUpdateNews: async (body = {}) => {
    let {
      id = null,
      newsTitle = "",
      newsDescription = "",
      isHot = 0,
      orderIndex = 0,
      content = "",
      enable = 1,
      url = "",
      title = "",
      keywords = "",
      description = "",
      imageUrl = "",
      username = ""
    } = body;
    try {
      const pool = await mssql.pool;

      const  checkRes = await pool
        .request()
        .input("url", url)
        .input("siteId", id)
        .execute("Url_CheckExist_Admin");
      
      if(checkRes.recordset[0].result){
        return {
          error : true,
          message: "URL đã được sử dụng, vui lòng nhập URL khác!",
        };
      }

      if(imageUrl){
        if(isBase64(imageUrl)){
          const imgRes = await uploadModel.uploadImage(imageUrl)
          if(imgRes.error) {
            return {
              error: true,
              message: MESS.createFailed
            };
          }
          imageUrl = imgRes.data
        }
      }

      await pool
        .request()
        .input("newsId", id)
        .input("newsTitle", newsTitle)
        .input("newsDescription", newsDescription)
        .input("isHot", isHot)
        .input("orderIndex", orderIndex)
        .input("content", content)
        .input("enable", enable)
        .input("url", url)
        .input("title", title)
        .input("keywords", keywords)
        .input("description", description)
        .input("imageUrl", imageUrl)
        .input("createdUser", username)
        .execute("News_CreateOrUpdate_Admin");
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
  getListNews: async (query = {}) => {
    const { pageSize = 10, pageIndex = 1, keyword = "", enable = null } = query;
    
    try {
      const pool = await mssql.pool;
      const res = await pool
        .request()
        .input("pageSize", pageSize)
        .input("pageIndex", pageIndex)
        .input("keyword", keyword)
        .input("enable", enable)
        .execute("News_GetList_Admin");
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
  deleteNews: async (id) => {
    try {
      const pool = await mssql.pool;
      await pool
        .request()
        .input("NewsId", id)
        .execute("News_Delete_Admin");
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
  getNewsDetail: async (id) => {
    try {
      const pool = await mssql.pool;
      const res = await pool
        .request()
        .input("NewsId", id)
        .execute("News_GetDetail_Admin");
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
};

export default newsModel;
