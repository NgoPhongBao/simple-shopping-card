import mssql from "../../../model/mssql.js";
import MESS from "../../../common/const/mess.const.js";
import { isBase64 } from "../../../common/helper/file.helper.js";
import uploadModel from "../upload/upload.model.js";

const bannerModel = {
  createOrUpdateBanner: async (body = {}) => {
    let {
      id  = -1,  
      imageUrl = "", 
      bannerType = "", 
      link  = "",  
      enable  = 1,  
      username = "",
    } = body;
    console.log(username);
    try {
      const pool = await mssql.pool;

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
        .input("BannerId", id)
        .input("imageUrl", imageUrl)
        .input("bannerType", bannerType)
        .input("link", link)
        .input("enable", enable)
        .input("CreatedUser", username)
        .execute("Banner_CreateOrUpdate_Admin");
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
  getListBanner: async (query = {}) => {
    const { pageSize = 10, pageIndex = 1, bannerType = "", enable = null } = query;
    
    try {
      const pool = await mssql.pool;
      const res = await pool
        .request()
        .input("pageSize", pageSize)
        .input("pageIndex", pageIndex)
        .input("BannerType", bannerType)
        .input("enable", enable)
        .execute("Banner_GetList_Admin");
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
  deleteBanner: async (id) => {
    try {
      const pool = await mssql.pool;
      await pool
        .request()
        .input("BannerId", id)
        .execute("Banner_Delete_Admin");
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
  getBannerDetail: async (id) => {
    try {
      const pool = await mssql.pool;
      const res = await pool
        .request()
        .input("BannerId", id)
        .execute("Banner_GetDetail_Admin");
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

export default bannerModel;
