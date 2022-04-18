import { useEffect } from "react";
import { SaveOutlined, CloseCircleOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { message, Input, Tabs, Button } from "antd";
import api from "../../service/apiService";
import { useFormik } from "formik";
import * as Yup from "yup";
import UploadSingleImage from "../common/upload-single-image/UploadSingleImage";
import "./style.scss";

const { TabPane } = Tabs;
const initialVal = {
  storeName: "",
  address: "",
  taxCode: "",
  email: "",
  phoneNumber: "",
  maps: "",
  openTime: "",
  logoUrl: "",
  imageUrl: "",
  shortDescription: ""
};
export default function Form(props) {
  const { data } = props;

  const formik = useFormik({
    initialValues: Object.keys(data).length ? data : initialVal,
    validationSchema: Yup.object({
      // storeName: Yup.string().required("Tên cửa hàng không được để trống"),
    }),
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit(values) {
      handleSubmitUpdateStore(values);
    },
  });

  useEffect(() => {
    if (Object.keys(data).length) {
      setValues(data);
    }
  }, [data]);

  const handleSubmitUpdateStore = async (values) => {
    try {
      await api.put("/store", values);
      message.success("Cập nhật thành công!");
    } catch (errors) {
      console.log(errors.message);
      message.error("Cập nhật thất bại!");
    }
  };

  const { values, getFieldProps, setValues } =
    formik;

  return (
    <form autoComplete="off" onSubmit={formik.handleSubmit}>
      <div className="h-full fadein grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="rounded-md overflow-hidden shadow-md p-3 pb-6 lg:col-span-2 border-t-2 border-blue-6 bg-blue-1">
          <span className="font-medium">Thông tin của hàng</span>
          <Tabs defaultActiveKey="2">
            <TabPane tab={<span>Tiếng Việt</span>} key="1">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
                <div>
                  <label htmlFor="storeName">Tên cửa hàng</label>
                  <Input
                    placeholder="Tên cửa hàng"
                    id="storeName"
                    {...getFieldProps("storeName")}
                  />
                </div>
                <div>
                  <label htmlFor="phoneNumber">Số điện thoại</label>
                  <Input
                    placeholder="Số điện thoại"
                    id="phoneNumber"
                    {...getFieldProps("phoneNumber")}
                  />
                </div>
                <div>
                  <label htmlFor="email">Email</label>
                  <Input
                    placeholder="Email"
                    id="email"
                    {...getFieldProps("email")}
                  />
                </div>
                <div>
                  <label htmlFor="taxCode">Mã số thuế</label>
                  <Input
                    placeholder="Mã số thuế"
                    id="taxCode"
                    {...getFieldProps("taxCode")}
                  />
                </div>
                <div className="col-span-2">
                  <label htmlFor="address">Địa chỉ</label>
                  <Input
                    placeholder="Địa chỉ"
                    id="address"
                    {...getFieldProps("address")}
                  />
                </div>
                <div className="col-span-2">
                  <label htmlFor="maps">Google maps</label>
                  <Input
                    placeholder="Google maps"
                    id="maps"
                    {...getFieldProps("maps")}
                  />
                </div>
                <div className="col-span-2">
                  <label htmlFor="maps">Mô tả ngắn</label>
                  <Input.TextArea
                    placeholder="Mô tả ngắn"
                    id="shortDescription"
                    {...getFieldProps("shortDescription")}
                  />
                </div>
              </div>
            </TabPane>
            {/* <TabPane tab={<span>Tiếng Anh</span>} key="2">
                Tiếng Anh
              </TabPane> */}
          </Tabs>
        </div>
        <div className="rounded-md overflow-hidden shadow-md bg-blue-1 p-3 pb-6 border-t-2 border-blue-6">
          <span className="font-medium">Hình ảnh</span>
          <div className="m-5 store_logo_box">
            <p className="text-center">Logo</p>
            <UploadSingleImage
              onChange={(value) => {
                formik.setFieldValue("logoUrl", value);
              }}
              beforeUpload={(message) => {
                formik.setFieldValue("logoUrl", "");
                formik.setFieldError("logoUrl", message);
              }}
              maxSize={1}
              imageUrl={values.logoUrl}
            />
            <p className="text-red-6 text-center">{formik.errors.logoUrl}</p>
          </div>
          <div className="m-5">
            <p className="text-center">Ảnh cửa hàng</p>
            <UploadSingleImage
              onChange={(value) => {
                formik.setFieldValue("imageUrl", value);
              }}
              beforeUpload={(message) => {
                formik.setFieldValue("imageUrl", "");
                formik.setFieldError("imageUrl", message);
              }}
              maxSize={1}
              imageUrl={formik.values.imageUrl}
            />
            <p className="text-red-6 text-center">{formik.errors.imageUrl}</p>
          </div>
        </div>
      </div>
      <div className="mt-5 flex justify-center sm:justify-end items-center">
        <Button
          htmlType="submit"
          icon={<SaveOutlined />}
          type="primary"
          className="flex items-center bg-blue-6 mr-2"
        >
          Lưu
        </Button>
        <Link to="/dashboard">
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
