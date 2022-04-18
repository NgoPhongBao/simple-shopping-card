import { useState } from "react";
import ProductCard from "../../components/common/ProductCard";
import { v4 } from "uuid";

export default function TabProduct(props) {
  const { newProducts = [], topSaleProducts = [] } = props;

  const [tabActive, setTabActive] = useState("new");
  return (
    <div className="product-area pt-65 pb-30 fadein">
      <div className="container">
        <div className="product-tab-list mb-30 nav" role="tablist">
          {newProducts.length ? (
            <a
              className={` d-block p-0 ${tabActive === "new" ? "active" : ""}`}
              onClick={() => setTabActive("new")}
              style={{ cursor: "pointer" }}
            >
              <h4>Sản phẩm mới</h4>
            </a>
          ) : null}
          {topSaleProducts.length ? (
            <a
              className={` d-block p-0 ${tabActive === "top" ? "active" : ""}`}
              onClick={() => setTabActive("top")}
              style={{ cursor: "pointer" }}
            >
              <h4>Sản phẩm bán chạy</h4>
            </a>
          ) : null}
        </div>
        <div className="tab-content jump">
          <div
            className={`tab-pane fade ${tabActive === "new" ? "active" : ""}`}
            id="new"
          >
            <div className="custom-row">
              {newProducts.map((el) => {
                return (
                  <div className="custom-col-5 mb-30" key={v4()}>
                    <ProductCard data={el} />{" "}
                  </div>
                );
              })}
            </div>
          </div>
          <div
            className={`tab-pane fade ${tabActive === "top" ? "active" : ""}`}
            id="top"
          >
            <div className="custom-row">
              {topSaleProducts.map((el) => {
                return (
                  <div className="custom-col-5 mb-30" key={v4()}>
                    <ProductCard data={el} />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
