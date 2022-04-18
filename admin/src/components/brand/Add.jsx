import React from "react";
import Form from "./Form";
import { Breadcrumb } from "antd";
import { Link } from "react-router-dom";

const BrandAdd = () => {
  return (
    <div className="m-4">
      <div className="my-4">
        <Breadcrumb>
          <Breadcrumb.Item>
            <Link to="/">Dashboard</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <Link to="/brand">Thương hiệu</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>Thêm mới</Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <Form />
    </div>
  );
};

export default BrandAdd;
