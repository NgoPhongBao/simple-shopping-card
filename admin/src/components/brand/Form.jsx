import { SaveOutlined, CloseCircleOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { message, Input, Checkbox, Tabs, Button, Select } from "antd";
import api from "../../service/apiService";
import { useFormik } from "formik";
import * as Yup from "yup";

const { TabPane } = Tabs;
const initialVal = {
  brandName: "",
};

export default function Form(props) {
  const { data, id, isDetail } = props;

  const formik = useFormik({
    initialValues: data ? data : initialVal,
    validationSchema: Yup.object({
      brandName: Yup.string().required(
        "Tên thương hiệu là bắt buộc!"
      ),
    }),
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit(values) {
      handleAddOrUpdate(values);
    },
  });

  const handleAddOrUpdate = async (value) => {
    try {
      if (data) {
        await api.put("/brand/" + id, value);
        message.success("Cập nhật thành công!");
      } else {
        await api.post("/brand", value);
        message.success("Thêm mới thành công!");
        resetForm();
      }
    } catch (errors) {
      message.error("Thêm mới thất bại!");
    }
  };

  const {
    values,
    setFieldValue,
    errors,
    getFieldProps,
    handleSubmit,
    resetForm
  } = formik;

  return (
    <form
      autoComplete="off"
      onSubmit={handleSubmit}
      className="lg:w-8/12 mx-auto"
    >
      <div className="h-full fadein ">
        <div className="rounded-md overflow-hidden shadow-md p-3 pb-6 lg:col-span-2 row-span-2 border-t-2 border-blue-6 bg-blue-1">
          <span className="font-medium">Mô tả thương hiệu</span>
          <Tabs defaultActiveKey="2">
            <TabPane tab={<span>Tiếng Việt</span>} key="1">
              <div>
                <div>
                  <label htmlFor="brandName">
                    Tên thương hiệu<span className="text-red-6">*</span>
                  </label>
                  <Input
                    disabled={isDetail}
                    placeholder="Tên thương hiệu"
                    id="brand"
                    {...getFieldProps("brandName")}
                  />
                  <p className="text-red-6">{errors.brandName}</p>
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

        <Link to="/brand">
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
