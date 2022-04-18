import React from "react";
import Form from "./Form";
import api from "../../service/apiService";
import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { message, Spin, Breadcrumb } from "antd";

const BannerDetail = () => {
  const { bannerId } = useParams();
  const [bannerData, setbannerData] = useState(null);
  useEffect(() => {
    getbannerData(bannerId);
  }, []);
  const getbannerData = async (bannerId) => {
    try {
      const res = await api.get("/banner/" + bannerId);
      setbannerData(res.data);
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
            <Link to="/banner">Banner</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>Chi tiết</Breadcrumb.Item>
        </Breadcrumb>
      </div>
      {bannerData ? (
        <Form bannerData={bannerData} bannerId={bannerId} isDetail={1} />
      ) : (
        <div className="w-full h-60 flex justify-center items-center">
          <Spin />
        </div>
      )}
    </div>
  );
};

export default BannerDetail;
