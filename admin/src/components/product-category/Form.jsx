import { SaveOutlined, CloseCircleOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { message, Input, Checkbox, Tabs, Button } from "antd";
import api from "../../service/apiService";
import { useFormik } from "formik";
import * as Yup from "yup";
import { changeToSlug } from "../../utils/func";

const { TabPane } = Tabs;
const initialVal = {
  productCategoryName: "",
  enable: 1,
  url: "",
  title: "",
  keywords: "",
  description: "",
  isTopCategory: 0,
};

export default function Form(props) {
  const { data, id, isDetail } = props;

  const formik = useFormik({
    initialValues: data ? data : initialVal,
    validationSchema: Yup.object({
      productCategoryName: Yup.string().required(
        "Tên danh mục sản phẩm là bắt buộc!"
      ),
      url: Yup.string().required("URL là bắt buộc!"),
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
        await api.put("/product-category/" + id, value);
        message.success("Cập nhật thành công!");
      } else {
        await api.post("/product-category", value);
        message.success("Thêm mới thành công!");
        resetForm();
      }
    } catch (errors) {
      message.error(errors.message);
    }
  };

  const {
    values,
    setFieldValue,
    errors,
    getFieldProps,
    handleSubmit,
    resetForm,
  } = formik;

  const handleChangeName = (e) => {
    setFieldValue("productCategoryName", e.target.value);
    if (!data) {
      setFieldValue("url", changeToSlug(e.target.value));
    }
  };

  return (
    <form autoComplete="off" onSubmit={handleSubmit}>
      <div className="h-full fadein grid md:grid-cols-2 gap-3">
        <div className="rounded-md overflow-hidden shadow-md p-3 pb-6 border-t-2 border-blue-6 bg-blue-1">
          <span className="font-medium">Mô tả danh mục sản phẩm</span>
          <Tabs defaultActiveKey="2">
            <TabPane tab={<span>Tiếng Việt</span>} key="1">
              <div>
                <div>
                  <label htmlFor="productCategoryName">
                    Tên danh mục sản phẩm<span className="text-red-6">*</span>
                  </label>
                  <Input
                    disabled={isDetail}
                    placeholder="Tên danh mục sản phẩm"
                    id="productCategory"
                    value={values.productCategoryName}
                    onChange={handleChangeName}
                  />
                  <p className="text-red-6">{errors.productCategoryName}</p>
                </div>
                <div className="mt-2 lg:col-span-2">
                  <Checkbox
                    checked={values.isTopCategory}
                    onChange={(e) =>
                      setFieldValue("isTopCategory", e.target.checked)
                    }
                    disabled={isDetail}
                  >
                    Danh mục hàng đầu
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
            </TabPane>
            {/* <TabPane tab={<span>Tiếng Anh</span>} key="2">
                Tiếng Anh
              </TabPane> */}
          </Tabs>
        </div>
        <div className="rounded-md overflow-hidden shadow-md bg-blue-1 p-3 pb-6 border-t-2 border-blue-6">
          <span className="font-medium">SEO</span>
          <Tabs defaultActiveKey="2">
            <TabPane tab={<span>Tiếng Việt</span>} key="1">
              <div className="grid grid-cols-1 gap-2">
                <div>
                  <label htmlFor="url">URL</label>
                  <span className="text-red-6">*</span>
                  <Input
                    id="url"
                    placeholder="URL"
                    disabled={isDetail}
                    {...getFieldProps("url")}
                  />
                  <p className="text-red-6">{errors.url}</p>
                </div>
                <div>
                  <label htmlFor="title">Title</label>
                  <Input
                    id="title"
                    placeholder="Title"
                    disabled={isDetail}
                    {...getFieldProps("title")}
                  />
                </div>
                <div>
                  <label htmlFor="keywords">Keywords</label>
                  <Input
                    id="keywords"
                    placeholder="Keywords"
                    disabled={isDetail}
                    {...getFieldProps("keywords")}
                  />
                </div>
                <div>
                  <label htmlFor="description">Description</label>
                  <Input
                    id="description"
                    placeholder="Description"
                    disabled={isDetail}
                    {...getFieldProps("description")}
                  />
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

        <Link to="/product-category">
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
