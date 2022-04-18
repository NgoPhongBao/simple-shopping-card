import React, { useState } from "react";
import Breadcrumb from "../common/Breadcrumb";
import FilterLeft from "./FilterLeft";
import RightBlock from "./RightBlock";
import { useRouter } from "next/router";

export default function ProductCategory(props) {
  const { productCategories = [], brands = [], productData = {} } = props;

  const router = useRouter();

  const [query, setQuery] = useState({
    rangePrice: [0, 50000000],
    pageSize: 8,
    pageIndex: 1,
    brand: [],
    orderBy: "price_low_to_high",
    slug: router.query.slug,
  });

  const getProduct = (query) => {
    setQuery(query);
    router.push(
      {
        pathname: "/[slug]",
        query: { ...query },
      },
      undefined,
      { scroll: false }
    );
  };

  return (
    <>
      <Breadcrumb
        breadcrumb={[
          {
            url: router.query.slug,
            name:
              router.query.slug === "danh-muc-san-pham"
                ? "Danh mục sản phẩm"
                : productCategories.find((el) => el.url === router.query.slug)
                    .productCategoryName,
          },
        ]}
      />
      <div className="shop-page-area pt-30 pb-65 fadein">
        <div className="container">
          <div className="row flex-row-reverse">
            <div className="col-lg-9">
              <RightBlock
                query={query}
                setQuery={setQuery}
                productData={productData}
                getProduct={getProduct}
              />
            </div>
            <div className="col-lg-3">
              <FilterLeft
                productCategories={productCategories}
                brands={brands}
                query={query}
                setQuery={setQuery}
                getProduct={getProduct}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
