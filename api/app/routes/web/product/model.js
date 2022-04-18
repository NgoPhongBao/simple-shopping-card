import mssql from "../../../model/mssql.js";
import MESS from "../../../common/const/mess.const.js";

const model = {
  getProductHome: async () => {
    try {
      const pool = await mssql.pool;
      const res = await pool.request().execute("Product_GetProductHome_Web");

      const products = res.recordsets[0] || [];
      const images = res.recordsets[1] || [];

      products.forEach((el) => {
        el.images = [];
        images.forEach((item) => {
          if (item.productId === el.productId) {
            el.images.push(item.imageUrl);
          }
        });
      });

      return {
        data: products,
        message: MESS.requestSuccess,
      };
    } catch (error) {
      console.log(error)
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
        .execute("Product_GetDetail_Web");

      const product = res.recordsets[0] ? res.recordsets[0][0] : {};
      const images = res.recordsets[1] || [];
      const attributes = res.recordsets[2] || [];
      const related = res.recordsets[3] || [];

      product.images =
        images.map((item) => {
          return item.imageUrl;
        }) || [];

      product.attributes = attributes || [];
      product.related = related || [];

      return {
        data: product,
        message: MESS.requestSuccess,
      };
    } catch (error) {
      return {
        error,
        message: error.message,
      };
    }
  },
  getProduct: async (queryParams = {}) => {
    let { pageSize = 12, pageIndex = 1, keyword = "" } = queryParams;

    try {
      const pool = await mssql.pool;
      const res = await pool
        .request()
        .input("pageSize", pageSize)
        .input("pageIndex", pageIndex)
        .input("keyword", keyword)
        .execute("Product_GetProduct_Web");
      const products = res.recordsets[0] || [];
      const images = res.recordsets[1] || [];

      products.forEach((el) => {
        el.images = [];
        images.forEach((item) => {
          if (el.productId === item.productId) {
            el.images.push(item.imageUrl);
          }
        });
      });

      return {
        data: {
          pageIndex,
          pageSize,
          keyword,
          totalItems: res.recordsets[0].length
            ? res.recordsets[0][0].totalItems
            : 0,
          items: products,
        },
        message: MESS.requestSuccess,
      };
    } catch (error) {
      console.log(error)
      return {
        error,
        message: error.message,
      };
    }
  },
};

export default model;
