import React from "react";
import Form from "./Form";
import api from "../../service/apiService";
import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { message, Spin, Breadcrumb } from "antd";

const NewsEdit = () => {
  const { newsId } = useParams();
  const [newsData, setNewsData] = useState(null);
  useEffect(() => {
    getNewsData(newsId);
  }, []);
  const getNewsData = async (newsId) => {
    try {
      const res = await api.get("/news/" + newsId);
      setNewsData(res.data);
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
            <Link to="/news">Bài viết</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>Chỉnh sửa</Breadcrumb.Item>
        </Breadcrumb>
      </div>
      {newsData ? (
        <Form newsData={newsData} newsId={newsId} />
      ) : (
        <div className="w-full h-60 flex justify-center items-center">
          <Spin />
        </div>
      )}
    </div>
  );
};

export default NewsEdit;
