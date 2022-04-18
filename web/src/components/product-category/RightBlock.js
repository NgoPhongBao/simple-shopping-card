import React from "react";
import ProductCard from "../common/ProductCard";
import { Pagination } from "antd";

export default function RightBlock(props) {
  const { query, productData, getProduct } = props;
  const { totalItems = 0, items = [] } = productData;
  return (
    <>
      <div className="shop-topbar-wrapper ">
        <div className="shop-topbar-left">
          <p>
            Hiển thị{" "}
            {(query.pageIndex - 1) * query.pageSize + (items.length ? 1 : 0)} -{" "}
            {(query.pageIndex - 1) * query.pageSize + items.length} của{" "}
            {totalItems} kết quả{" "}
          </p>
        </div>
        <div className="product-sorting-wrapper">
          <div className="product-show shorting-style">
            <label>Sắp xếp theo giá:</label>
            <select
              value={query.orderBy}
              onChange={(e) => {
                getProduct({
                  ...query,
                  orderBy: e.target.value,
                  pageIndex: 1,
                });
              }}
            >
              <option value="price_low_to_high">Từ thấp đến cao</option>
              <option value="price_high_to_low">Cao đến thấp</option>
            </select>
          </div>
        </div>
      </div>
      <div className="jump">
        <div className="pb-20" id="product-grid">
          <div className="row">
            {items.length ? (
              items.map((el) => {
                return (
                  <div
                    className="col-xl-3 col-lg-4 col-md-4 col-sm-6 col-12 mb-30 fadein"
                    key={el.productId}
                  >
                    <ProductCard data={el} />
                  </div>
                );
              })
            ) : (
              <p className="text-center mt-50">Không tìm thấy sản phẩm.</p>
            )}
          </div>
        </div>
        {items.length ? (
          <div className="pagination-total-pages">
            <div className="pagination_cus d-flex justify-content-center">
              <Pagination
                current={query.pageIndex}
                pageSize={query.pageSize}
                total={totalItems}
                onChange={(page, pageSize) => {
                  getProduct({ ...query, pageIndex: page });
                }}
              />
            </div>
            <div className="total-pages">
              <p>
                Hiển thị{" "}
                {(query.pageIndex - 1) * query.pageSize +
                  (items.length ? 1 : 0)}{" "}
                - {(query.pageIndex - 1) * query.pageSize + items.length} của{" "}
                {totalItems} kết quả{" "}
              </p>
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
}
