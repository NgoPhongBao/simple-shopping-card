import React from "react";
import api from "../service/apiService";
import ProductCategory from "../components/product-category";
import Product from "../components/product";
import News from "../components/news";

export default function Slug(props) {
  const { type } = props;

  switch (type) {
    case "PRODUCTCATEGORY":
      return <ProductCategory {...props} />;
    case "PRODUCTDETAIL":
        return <Product {...props} />;
    case "NEWSDETAIL":
      return <News {...props} />;
    default:
      return null;
  }
}

export async function getServerSideProps({ query }) {
  const { slug } = query;
  try {
    const _siteInfo = await api.get("/url", { url: slug });
    let { siteId = null, type = "" } = _siteInfo.data || {};

    if (!siteId && slug !== "danh-muc-san-pham") {
      return {
        notFound: true,
      };
    }

    if(slug === "danh-muc-san-pham") type = "PRODUCTCATEGORY"

    if (type === "PRODUCTCATEGORY") {
      const productCategoryMenuRes = await api.get("/product-category/menu");
      const productCategories = productCategoryMenuRes.data;
      const brandRes = await api.get("/brand/all");
      const brands = brandRes.data;
      const productsRes = await api.get(
        `/product-category/product`,
        Object.assign(
          {
            pageSize: 8,
            pageIndex: 1,
            productCategoryId: siteId
          },
          query
        )
      );
      const productData = productsRes.data;
      return {
        props: {
          productCategories,
          brands,
          productData,
          type,
        },
      };
    }

    if (type === "PRODUCTDETAIL"){
      const productRes = await api.get("/product/" + siteId)
      const productData = productRes.data;
      return {
        props: {
          productData,
          type,
        },
      };
    }

    if (type === "NEWSDETAIL"){
      const newsRes = await api.get("/news/" + siteId)
      return {
        props: {
          newsData: newsRes.data,
          type,
        },
      };
    }

    return {
      notFound: true,
    };
  } catch (error) {
    console.log(error)
    return {
      notFound: true,
    };
  }
}
