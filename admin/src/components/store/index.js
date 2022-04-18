import React, { useEffect, useState } from "react";
import Form from "./Form";
import { Breadcrumb, message } from "antd";
import { Link } from "react-router-dom";
import api from "../../service/apiService";

export default function Store() {
  const [data, setData] = useState({});

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const res = await api.get("/store");
      setData(res.data);
    } catch (error) {
      console.log(error.message);
      message.error("Khởi tạo dữ liệu không thành công.");
    }
  };

  return (
    <div className="m-4">
      <div className="my-4">
        <Breadcrumb>
          <Breadcrumb.Item>
            <Link to="/">Dashboard</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>Cửa hàng</Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <Form data={data} />
    </div>
  );
}
