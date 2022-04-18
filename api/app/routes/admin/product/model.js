import mssql from "../../../model/mssql.js";
import MESS from "../../../common/const/mess.const.js";
import { isBase64 } from "../../../common/helper/file.helper.js";
import uploadModel from "../upload/upload.model.js";

const model = {
  createOrUpdateNews: async (body = {}) => {
    let {
      id = null,
      productName = "",
      productCategoryId = null,
      brandId = null,
      price = 0,
      productDescription = "",
      enable = 1,
      shortDescription = "",
      isTopSale = 0,
      isNew = 0,
      url = "",
      title = "",
      keywords = "",
      description = "",
      images = [],
      username = "",
      attributes = [],
    } = body;
    try {
      const pool = await mssql.pool;

      const checkRes = await pool
        .request()
        .input("url", url)
        .input("siteId", id)
        .execute("Url_CheckExist_Admin");

      if (checkRes.recordset[0].result) {
        return {
          error: true,
          message: "URL đã được sử dụng, vui lòng nhập URL khác!",
        };
      }

      const res = await pool
        .request()
        .input("productId", id)
        .input("productName", productName)
        .input("productCategoryId", productCategoryId)
        .input("brandId", brandId)
        .input("price", price)
        .input("productDescription", productDescription)
        .input("shortDescription", shortDescription)
        .input("isTopSale", isTopSale)
        .input("isNew", isNew)
        .input("enable", enable)
        .input("url", url)
        .input("title", title)
        .input("keywords", keywords)
        .input("description", description)
        .input("createdUser", username)
        .execute("Product_CreateOrUpdate_Admin");

      const productId = res.recordset[0].result;

      if (id) {
        await pool
          .request()
          .input("productId", productId)
          .execute("AttributeValue_Delete_Admin");

        await pool
          .request()
          .input("productId", productId)
          .execute("ProductImage_Delete_Admin");
      }

      for (let i = 0; i < images.length; i++) {
        let imageUrl = images[i];

        if (isBase64(imageUrl)) {
          const imgRes = await uploadModel.uploadImage(imageUrl);
          imageUrl = imgRes.data;
        }

        await pool
          .request()
          .input("productId", productId)
          .input("imageUrl", imageUrl)
          .execute("ProductImage_Create_Admin");
      }

      for (let i = 0; i < attributes.length; i++) {
        await pool
          .request()
          .input("productId", productId)
          .input("attributeId", attributes[i].attributeId)
          .input("attValue", attributes[i].attValue)
          .execute("AttributeValue_Create_Admin");
      }

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
    const {
      pageSize = 10,
      pageIndex = 1,
      keyword = "",
      enable = null,
      productCategoryId = null,
      brandId = null,
      isTopSale = null,
      isNew = null,
    } = query;

    try {
      const pool = await mssql.pool;
      const res = await pool
        .request()
        .input("pageSize", pageSize)
        .input("pageIndex", pageIndex)
        .input("keyword", keyword)
        .input("enable", enable)
        .input("productCategoryId", productCategoryId)
        .input("brandId", brandId)
        .input("isTopSale", isTopSale)
        .input("isNew", isNew)
        .execute("Product_GetList_Admin");
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
  delete: async (id) => {
    try {
      const pool = await mssql.pool;
      await pool
        .request()
        .input("productId", id)
        .execute("Product_Delete_Admin");
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
        .input("productId", id)
        .execute("Product_GetDetail_Admin");
      if (res.recordset.length) {
        const data = res.recordset[0];
        data.images = (res.recordsets[1] || []).map((el) => el.imageUrl);
        data.attributes = res.recordsets[2] || [];
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
};

export default model;
