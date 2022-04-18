import React from "react";
import Detail from "./Detail";
import Related from "./Related";
import Breadcrumb from "../common/Breadcrumb";

export default function Product(props) {
  const { productData = {} } = props;
  const { related = [], productDescription } = productData;
  return (
    <>
      <Breadcrumb
        breadcrumb={[{ url: productData.url, name: productData.productName }]}
      />
      <Detail productData={productData} />
      {related.length ? <Related related={related} /> : null}
    </>
  );
}
