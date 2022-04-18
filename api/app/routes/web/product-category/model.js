import mssql from "../../../model/mssql.js";
import MESS from "../../../common/const/mess.const.js";

const model = {
  getMenu: async () => {
    try {
      const pool = await mssql.pool;
      const res = await pool.request().execute("ProductCategory_Getmenu_Web");
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

  getTop: async () => {
    try {
      const pool = await mssql.pool;
      const res = await pool.request().execute("ProductCategory_GetTop_Web");

      const data = res.recordsets[0]
        ? res.recordsets[0].length
          ? res.recordsets[0][0]
          : {}
        : {};
      data.products = res.recordsets[1] || [];
      return {
        data,
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

  getProduct: async (queryParams = {}) => {
    let {
      productCategoryId = null,
      rangePrice = [0, 50000000],
      pageSize = 12,
      pageIndex = 1,
      brand = [],
      orderBy = "price_low_to_high",
    } = queryParams;
    
    let _brand = ""

    if(typeof brand === "array"){
      _brand =  brand.length ? brand.join(",") : ""
    }
    else _brand = brand.toString();
    try {
      const pool = await mssql.pool;
      const res = await pool
        .request()
        .input("productCategoryId", productCategoryId)
        .input("priceFrom", rangePrice[0])
        .input("priceTo", rangePrice[1])
        .input("pageSize", pageSize)
        .input("pageIndex", pageIndex)
        .input("orderBy", orderBy)
        .input("brand", _brand)
        .execute("ProductCategory_GetProduct_Web");
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
          totalItems: res.recordsets[0].length
            ? res.recordsets[0][0].totalItems
            : 0,
          items: products,
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
};

export default model;
