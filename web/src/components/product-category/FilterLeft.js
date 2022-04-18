import React from "react";
import { useRouter } from "next/router";
import { Slider } from "antd";
import { formatPrice } from "../../utils";

export default function FilterLeft(props) {
  const {
    productCategories = [],
    brands = [],
    query,
    setQuery,
    getProduct,
  } = props;

  const router = useRouter();
  const {
    query: { slug },
  } = router;

  return (
    <div className="shop-sidebar-wrapper gray-bg-7 mrg-top-md mrg-top-sm">
      <div className="shop-widget">
        <h4 className="shop-sidebar-title">Danh mục sản phẩm</h4>
        <div className="shop-catigory">
          <ul id="faq">
            <li>
              {slug === "danh-muc-san-pham" ? (
                <i className="fa fa-hand-o-right" aria-hidden="true"></i>
              ) : null}{" "}
              <span
                style={{
                  fontWeight: slug === "danh-muc-san-pham" ? "600" : "400",
                  cursor: "pointer",
                }}
                onClick={() => {
                  getProduct({ ...query, slug: "danh-muc-san-pham", pageIndex: 1 });
                }}
              >
                Tất cả
              </span>
            </li>
            {productCategories.map((el) => {
              return (
                <li key={el.productCategoryId}>
                  {slug === el.url ? (
                    <i className="fa fa-hand-o-right" aria-hidden="true"></i>
                  ) : null}{" "}
                  <span
                    style={{
                      fontWeight: slug === el.url ? "600" : "400",
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      getProduct({ ...query, slug: el.url, pageIndex: 1 });
                    }}
                  >
                    {el.productCategoryName}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      <div className="shop-price-filter mt-40 shop-sidebar-border pt-35">
        <h4 className="shop-sidebar-title">Lọc theo giá</h4>
        <div className="price_filter mt-25">
          <div id="slider-range" />
          <div className="price_slider_amount">
            <div className="label-input">
              <Slider
                range={{ draggableTrack: true }}
                tooltipVisible={false}
                min={0}
                max={50000000}
                step={100000}
                value={query.rangePrice}
                onChange={(value) => {
                  setQuery({
                    ...query,
                    rangePrice: value,
                  });
                }}
              />
              <p>{`${formatPrice(query.rangePrice[0])} đ - ${formatPrice(
                query.rangePrice[1]
              )} đ`}</p>
            </div>
            <button
              type="button"
              onClick={() => {
                getProduct(query);
              }}
            >
              Lọc
            </button>
          </div>
        </div>
      </div>
      <div className="shop-widget mt-40 shop-sidebar-border pt-35">
        <h4 className="shop-sidebar-title">Thương hiệu</h4>
        <div className="sidebar-list-style mt-20">
          <ul>
            {brands.map((el) => {
              return (
                <li key={el.brandId}>
                  <input
                    type="checkbox"
                    checked={query.brand.indexOf(el.brandId) >= 0}
                    onChange={(e) => {
                      const _brand = [...query.brand];
                      if (e.target.checked) {
                        _brand.push(el.brandId);
                      } else {
                        const idx = _brand.findIndex(
                          (item) => item === el.brandId
                        );
                        if (idx >= 0) _brand.splice(idx, 1);
                      }
                      getProduct({
                        ...query,
                        pageIndex: 1,
                        brand: _brand,
                      });
                    }}
                  />
                  <span>{el.brandName}</span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}
