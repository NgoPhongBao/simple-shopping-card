import { SaveOutlined, CloseCircleOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { message, Input, Select, Button } from "antd";
import api from "../../service/apiService";
import { useFormik } from "formik";
import * as Yup from "yup";
import permissionType from "./permissionTypeConst";

const initialVal = {
  permissionName: "",
  permissionKey: "",
  permissionType: "",
};

export default function Form(props) {
  const { permissionId = null, permissionData = null, isDetail = 0 } = props;

  const formik = useFormik({
    initialValues: permissionData ? permissionData : initialVal,
    validationSchema: Yup.object({
      permissionName: Yup.string().required("Tên quyền là bắt buộc!"),
      permissionKey: Yup.string().required("Key quyền là bắt buộc!"),
      permissionType: Yup.string().required("Loại quyền là bắt buộc!"),
    }),
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit(values) {
      handleSubmitAddPermission(values);
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

  const handleSubmitAddPermission = async (value) => {
    try {
      if (permissionData) {
        await api.put("/permission/" + permissionId, value);
        message.success("Cập nhật thành công!");
      } else {
        await api.post("/permission", value);
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
          <span className="font-medium">Thông tin permission</span>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-3">
            <div>
              <label htmlFor="permissionName">
                Tên quyền<span className="text-red-6">*</span>
              </label>
              <Input
                disabled={isDetail}
                placeholder="Tên quyền"
                id="permissionName"
                {...getFieldProps("permissionName")}
              />
              <p className="text-red-6">{errors.permissionName}</p>
            </div>
            <div>
              <label htmlFor="permissionKey">
                Key quyền<span className="text-red-6">*</span>
              </label>
              <Input
                disabled={isDetail}
                placeholder="Key quyền"
                id="permissionKey"
                {...getFieldProps("permissionKey")}
              />
              <p className="text-red-6">{errors.permissionKey}</p>
            </div>
            <div>
              <label htmlFor="permissionType">
                Loại quyền<span className="text-red-6">*</span>
              </label>
              <Select
                value={values.permissionType || null}
                className="w-full"
                id="permissionType"
                onChange={(value) => {
                  setFieldValue("permissionType", value);
                }}
                placeholder="Loại quyền"
                disabled={isDetail}
              >
                {permissionType.map((el) => {
                  return (
                    <Select.Option value={el.key} key={el.key}>
                      {el.name}
                    </Select.Option>
                  );
                })}
              </Select>
              <p className="text-red-6">{errors.permissionType}</p>
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

        <Link to="/permission">
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
