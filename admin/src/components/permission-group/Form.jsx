import { useEffect, useState } from "react";
import { SaveOutlined, CloseCircleOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { message, Input, Checkbox, Button } from "antd";
import api from "../../service/apiService";
import { useFormik } from "formik";
import * as Yup from "yup";
import permissionType from "./permissionTypeConst";

const initialVal = {
  permissionGroupName: "",
  permissions: []
};

export default function Form(props) {
  const {
    permissionGroupId = null,
    permissionData = null,
    isDetail = 0,
  } = props;
  const [permissionList, setPermissionList] = useState([]);

  useEffect(() => {
    getListPermission();
  }, []);

  const getListPermission = async () => {
    try {
      const res = await api.get("/permission/all");
      if (res.data && res.data.length) {
        let _permissionList = [...permissionType];
        _permissionList.forEach((el) => {
          el.permissions = [];
          const per = res.data.filter((item) => el.key === item.permissionType);
          if (per && per.length) {
            el.permissions = el.permissions.concat(per);
          }
        });

        _permissionList = _permissionList.filter((el) => el.permissions.length > 0)

        setPermissionList(_permissionList);
      }
    } catch (error) {
      console.log(error);
      
      message.error("Khởi tạo dữ liệu không thành công!");
    }
  };

  const formik = useFormik({
    initialValues: permissionData ? permissionData : initialVal,
    validationSchema: Yup.object({
      permissionGroupName: Yup.string().required("Tên quyền là bắt buộc!"),
    }),
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit(values) {
      handleSubmitAddPermissionGroup(values);
    },
  });

  const {
    handleSubmit,
    errors,
    values,
    setFieldValue,
    setFieldError,
    getFieldProps,
    resetForm,
  } = formik;

  const handleSubmitAddPermissionGroup = async (value) => {
    try {
      if (permissionData) {
        await api.put("/permission-group/" + permissionGroupId, value);
        message.success("Cập nhật thành công!");
      } else {
        await api.post("/permission-group", value);
        message.success("Thêm mới thành công!");
        resetForm();
      }
    } catch (errors) {
      message.error("Thêm mới thất bại!");
    }
  };

  return (
    <form autoComplete="off" onSubmit={handleSubmit}>
      <div className="fadein">
        <div className="rounded-md overflow-hidden shadow-md p-3 pb-6 border-t-2 border-blue-6 bg-blue-1">
          <span className="font-medium">Thông tin nhóm quyền</span>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-3 mb-5">
            <div>
              <label htmlFor="permissionGroupName">
                Tên nhóm quyền<span className="text-red-6">*</span>
              </label>
              <Input
              className="mt-1"
                disabled={isDetail}
                placeholder="Tên quyền"
                id="permissionGroupName"
                {...getFieldProps("permissionGroupName")}
              />
              <p className="text-red-6">{errors.permissionGroupName}</p>
            </div>
          </div>
          <span className="font-medium">Chọn quyền</span>
          <div>
            {permissionList.map((el) => {
              return (
                <div key={el.key} className="mt-2">
                  <p className="underline font-medium">{el.name}</p>
                  <div className="mt-1 ml-5">
                    {el.permissions.map((item) => {
                      const perFound = values.permissions.find((e) => e === item.permissionId)
                      return (
                        <Checkbox
                          key={item.permissionId}
                          checked={perFound ? true: false}
                          onChange={(e) => {
                            const _permissions = [...values.permissions];
                            if(e.target.checked){
                              _permissions.push(item.permissionId)
                            }else{
                              const indexFound = _permissions.indexOf(item.permissionId)
                              if(indexFound >= 0) {
                                _permissions.splice(indexFound, 1)
                              }
                            }
                            setFieldValue("permissions", _permissions)
                          }
                          }
                          disabled={isDetail}
                        >
                          {item.permissionName}
                        </Checkbox>
                      );
                    })}
                  </div>
                </div>
              );
            })}
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

        <Link to="/permission-group">
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
