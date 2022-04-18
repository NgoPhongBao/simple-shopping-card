import React from "react";
import Form from "./Form";
import api from "../../service/apiService";
import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { message, Spin, Breadcrumb } from "antd";

const BrandDetail = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  useEffect(() => {
    getData(id);
  }, []);
  const getData = async (id) => {
    try {
      const res = await api.get("/brand/" + id);
      setData(res.data);
    } catch (error) {
      message.error("Khởi tạo dữ liệu thất bại!");
    }
  };
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
          <Breadcrumb.Item>Chi tiết</Breadcrumb.Item>
        </Breadcrumb>
      </div>
      {data ? (
        <Form data={data} id={id} isDetail={1} />
      ) : (
        <div className="w-full h-60 flex justify-center items-center">
          <Spin />
        </div>
      )}
    </div>
  );
};

export default BrandDetail;
