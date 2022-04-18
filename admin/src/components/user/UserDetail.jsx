import React from "react";
import Form from "./Form";
import api from "../../service/apiService";
import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { message, Spin, Breadcrumb } from "antd";

const UserDetail = () => {
  const { userId } = useParams();
  const [userData, setUserData] = useState(null);
  useEffect(() => {
    getUserData(userId);
  }, [userId]);
  const getUserData = async (userId) => {
    try {
      const res = await api.get("/user/" + userId);
      setUserData(res.data);
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
            <Link to="/user">User</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>Chi tiết</Breadcrumb.Item>
        </Breadcrumb>
      </div>
      {userData ? (
        <Form userData={userData} userId={userId} isDetail={1} />
      ) : (
        <div className="w-full h-60 flex justify-center items-center">
          <Spin />
        </div>
      )}
    </div>
  );
};

export default UserDetail;