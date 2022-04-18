import React from "react";
import Form from "./Form";
import api from "../../service/apiService";
import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { message, Spin, Breadcrumb } from "antd";

const PermissionGroupDetail = () => {
  const { permissionGroupId } = useParams();
  const [permissionData, setPermissionGroupData] = useState(null);
  useEffect(() => {
    getPermissionGroupData(permissionGroupId);
  }, []);
  const getPermissionGroupData = async (permissionGroupId) => {
    try {
      const res = await api.get("/permission-group/" + permissionGroupId);
      setPermissionGroupData(res.data);
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
            <Link to="/permission-group">Nhóm quyền</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>Chi tiết</Breadcrumb.Item>
        </Breadcrumb>
      </div>
      {permissionData ? (
        <Form
          permissionData={permissionData}
          permissionGroupId={permissionGroupId}
          isDetail={1}
        />
      ) : (
        <div className="w-full h-60 flex justify-center items-center">
          <Spin />
        </div>
      )}
    </div>
  );
};

export default PermissionGroupDetail;
