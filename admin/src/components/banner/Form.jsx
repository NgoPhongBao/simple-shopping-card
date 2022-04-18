import { SaveOutlined, CloseCircleOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { message, Input, Checkbox, Tabs, Button, Select } from "antd";
import api from "../../service/apiService";
import { useFormik } from "formik";
import * as Yup from "yup";
import UploadSingleImage from "../common/upload-single-image/UploadSingleImage";
import bannerType from "./bannerTypeConst";

const { TabPane } = Tabs;
const initialVal = {
  bannerType: "",
  imageUrl: "",
  link: "",
  enable: 1,
};

export default function Form(props) {
  const formik = useFormik({
    initialValues: props.bannerData ? props.bannerData : initialVal,
    validationSchema: Yup.object({
      bannerType: Yup.string().required("Loại không được để trống "),
      imageUrl: Yup.string().required("Hình ảnh là bắt buộc"),
    }),
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit(values) {
      handleSubmitAddBanner(values);
    },
  });
  const handleSubmitAddBanner = async (value) => {
    try {
      if (props.bannerData) {
        await api.put("/banner/" + props.bannerId, value);
        message.success("Cập nhật thành công!");
      } else {
        await api.post("/banner", value);
        message.success("Thêm mới thành công!");
        formik.resetForm();
      }
    } catch (errors) {
      message.error("Thêm mới thất bại!");
    }
  };

  return (
    <form autoComplete="off" onSubmit={formik.handleSubmit} className="lg:w-8/12 mx-auto">
      <div className="h-full fadein ">
        <div className="rounded-md overflow-hidden shadow-md p-3 pb-6 lg:col-span-2 row-span-2 border-t-2 border-blue-6 bg-blue-1">
          <span className="font-medium">Mô tả banner</span>
          <Tabs defaultActiveKey="2">
            <TabPane tab={<span>Tiếng Việt</span>} key="1">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
                <div>
                  <label htmlFor="bannerType">
                    Loại banner<span className="text-red-6">*</span>
                  </label>
                  <Select
                    value={formik.values.bannerType || null}
                    className="w-full"
                    id="bannerType"
                    onChange={(value) => {
                      formik.setFieldValue("bannerType", value);
                    }}
                    placeholder="Loại banner"
                    disabled={props.isDetail}
                  >
                    {bannerType.map((el) => {
                      return (
                        <Select.Option value={el.key} key={el.key}>
                          {el.name}
                        </Select.Option>
                      );
                    })}
                  </Select>
                  <p className="text-red-6">{formik.errors.bannerType}</p>
                </div>
                <div>
                  <label htmlFor="link">
                    Link
                  </label>
                  <Input
                    disabled={props.isDetail}
                    placeholder="Link"
                    id="link"
                    value={formik.values.link}
                    onChange={(event) => {
                      formik.setFieldValue("link", event.target.value);
                    }}
                  />
                  <p className="text-red-6">{formik.errors.link}</p>
                </div>
                <div className="col-span-2">
                  <label htmlFor="link">
                    Hình ảnh<span className="text-red-6">*</span>
                  </label>
                  <div className="m-5 mb-0 banner_upload">
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
                      disabled={props.isDetail}
                    />
                    <p className="text-red-6">{formik.errors.imageUrl}</p>
                  </div>
                </div>
                <div className="mt-2 lg:col-span-2">
                  <Checkbox
                    checked={formik.values.enable}
                    onChange={(e) =>
                      formik.setFieldValue("enable", e.target.checked)
                    }
                    disabled={props.isDetail}
                  >
                    Kích hoạt
                  </Checkbox>
                </div>
              </div>
            </TabPane>
            {/* <TabPane tab={<span>Tiếng Anh</span>} key="2">
                Tiếng Anh
              </TabPane> */}
          </Tabs>
        </div>
      </div>
      <div className="mt-5 flex justify-center sm:justify-end items-center">
        {props.isDetail ? null : (
          <Button
            htmlType="submit"
            icon={<SaveOutlined />}
            type="primary"
            className="flex items-center bg-blue-6 mr-2"
          >
            Lưu
          </Button>
        )}

        <Link to="/banner">
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
