import React from "react";

export default function Desc({ productDescription = "" }) {
  return (
    <div className="container">
      <div className="description-review-area mt-25 mb-40">
        <p className="h5 fw-bold">Mô tả</p>
        <div className="mt-20">
          <div
            className="product-description-wrapper"
            dangerouslySetInnerHTML={{ __html: productDescription }}
          ></div>
        </div>
      </div>
    </div>
  );
}
