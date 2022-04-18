import { useEffect, useState } from "react";

import { SaveOutlined, CloseCircleOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { message, Input, Checkbox, Button, Select } from "antd";
import api from "../../service/apiService";
import { useFormik } from "formik";
import * as Yup from "yup";

const initialVal = {
  fullName: "",
  username: "",
  permissonGroupid: null,
  phoneNumber: "",
  enable: 1,
  isAdmin: 0,
};

export default function Form(props) {
  const { userId = null, userData = null, isDetail = 0 } = props;
  const [permissionGroup, setPermissionGroup] = useState([]);

  useEffect(() => {
    getPermissionGroup();
  }, []);

  const getPermissionGroup = async () => {
    try {
      const res = await api.get("/permission-group/all");
      setPermissionGroup(res.data || []);
    } catch (error) {
      message.error("Khởi tạo dữ liệu không thành công!");
    }
  };

  const formik = useFormik({
    initialValues: userData ? userData : initialVal,
    validationSchema: Yup.object({
      fullName: Yup.string().required("Họ và tên không được để trống!"),
      username: Yup.string().required("Mô tả không được để trống!"),
    }),
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit(values) {
      handleSubmitAddUser(values);
    },
  });

  const {
    handleSubmit,
    errors,
    values,
    setFieldValue,
    getFieldProps,
    resetForm,
  } = formik;

  const handleSubmitAddUser = async (value) => {
    try {
      if (userData) {
        await api.put("/user/" + userId, value);
        message.success("Cập nhật thành công!");
      } else {
        await api.post("/user", value);
        message.success("Thêm mới thành công!");
        resetForm();
      }
    } catch (errors) {
      message.error("Thêm mới thất bại!");
    }
  };

  return (
    <form autoComplete="off" onSubmit={handleSubmit}>
      <div className=" h-full fadein">
        <div className="rounded-md overflow-hidden shadow-md p-3 pb-6 border-t-2 border-blue-6 bg-blue-1">
          <span className="font-medium">Thông tin user</span>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-3">
            <div>
              <label htmlFor="fullName">
                Họ và tên<span className="text-red-6">*</span>
              </label>
              <Input
                disabled={isDetail}
                placeholder="Họ và tên"
                id="fullName"
                {...getFieldProps("fullName")}
              />
              <p className="text-red-6">{errors.fullName}</p>
            </div>
            <div>
              <label htmlFor="phoneNumber">Số điện thoại</label>
              <Input
                disabled={isDetail}
                placeholder="Số điện thoại"
                id="phoneNumber"
                {...getFieldProps("phoneNumber")}
              />
              <p className="text-red-6">{errors.phoneNumber}</p>
            </div>
            <div>
              <label htmlFor="username">
                Username<span className="text-red-6">*</span>
              </label>
              <Input
                disabled={isDetail}
                placeholder="Username"
                id="username"
                {...getFieldProps("username")}
              />
              <p className="text-red-6">{errors.userName}</p>
            </div>
            <div>
              <label htmlFor="permissionGroup">
                Nhóm quyền
              </label>
              <Select
                value={values.permissionGroupId || null}
                className="w-full"
                id="permissionGroup"
                onChange={(value) => {
                  setFieldValue("permissionGroupId", value);
                }}
                placeholder="Nhóm quyền"
                disabled={isDetail}
              >
                {permissionGroup.map((el) => {
                  return (
                    <Select.Option
                      value={el.permissionGroupId}
                      key={el.permissionGroupId}
                    >
                      {el.permissionGroupName}
                    </Select.Option>
                  );
                })}
              </Select>
              <p className="text-red-6">{errors.permissionGroupId}</p>
            </div>
            <div className="md:col-span-2 mt-2">
              <Checkbox
                checked={values.isAdmin}
                onChange={(e) => setFieldValue("isAdmin", e.target.checked)}
                disabled={isDetail}
              >
                Là tài khoản admin
              </Checkbox>
              <Checkbox
                checked={values.enable}
                onChange={(e) => setFieldValue("enable", e.target.checked)}
                disabled={isDetail}
              >
                Kích hoạt
              </Checkbox>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-5 flex justify-center sm:justify-end items-center">
        {isDetail ? null : (
          <Button
            htmlType="submit"
            icon={<SaveOutlined />}
            type="primary"
            className="flex items-center bg-blue-6 mr-2"
          >
            Lưu
          </Button>
        )}

        <Link to="/user">
          <Button
            icon={<CloseCircleOutlined />}
            type="primary"
            className="flex items-center bg-gray-8 focus:bg-gray-7 active:bg-gray-7 hover:bg-gray-7 border-0"
          >
            Đóng
          </Button>
        </Link>
      </div>
    </form>
  );
}
