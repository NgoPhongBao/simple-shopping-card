import React from "react";
import Form from "./Form";
import api from "../../service/apiService";
import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { message, Spin, Breadcrumb } from "antd";

const PermissionEdit = () => {
  const { permissionId } = useParams();
  const [permissionData, setPermissionData] = useState(null);
  useEffect(() => {
    getPermissionData(permissionId);
  }, []);
  const getPermissionData = async (permissionId) => {
    try {
      const res = await api.get("/permission/" + permissionId);
      setPermissionData(res.data);
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
            <Link to="/permission">Quyền</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>Chỉnh sửa</Breadcrumb.Item>
        </Breadcrumb>
      </div>
      {permissionData ? (
        <Form permissionData={permissionData} permissionId={permissionId} />
      ) : (
        <div className="w-full h-60 flex justify-center items-center">
          <Spin />
        </div>
      )}
    </div>
  );
};

export default PermissionEdit;
