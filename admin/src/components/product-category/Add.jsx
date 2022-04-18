import React from "react";
import Form from "./Form";
import { Breadcrumb } from "antd";
import { Link } from "react-router-dom";

const ProductCategoryAdd = () => {
  return (
    <div className="m-4">
      <div className="my-4">
        <Breadcrumb>
          <Breadcrumb.Item>
            <Link to="/">Dashboard</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <Link to="/product-category">Danh mục sản phẩm</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>Thêm mới</Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <Form />
    </div>
  );
};

export default ProductCategoryAdd;
