import { useState, useEffect } from "react";
import {
  SaveOutlined,
  CloseCircleOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import {
  message,
  Input,
  Checkbox,
  Tabs,
  Button,
  Select,
  Space,
  Spin,
} from "antd";
import api from "../../service/apiService";
import { useFormik } from "formik";
import * as Yup from "yup";
import UploadListImage from "../common/upload-list-image/UploadListImage";
import { Editor } from "@tinymce/tinymce-react";
import { changeToSlug } from "../../utils/func";
import Loading from "../common/Loading";

const { TabPane } = Tabs;
const initialVal = {
  productName: "",
  productDescription: "",
  brandId: null,
  productCategoryId: null,
  shortDescription: "",
  price: 0,
  images: [],
  enable: 1,
  isNew: 0,
  isTopSale: 0,
  url: "",
  title: "",
  keywords: "",
  description: "",
  attributes: [],
};
export default function Form(props) {
  const { isDetail, data, id } = props;
  const [productCategoryOptions, setProductCategoryOptions] = useState([]);
  const [brandOptions, setBrandOptions] = useState([]);
  const [attributeOptions, setAttributeOptions] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    initData();
  }, []);

  const initData = async () => {
    try {
      const _brands = await api.get("/brand/all");
      setBrandOptions(_brands.data || []);
      const _productCategories = await api.get("/product-category/all");
      setProductCategoryOptions(_productCategories.data || []);
      const attributeRes = await api.get("/attribute/all");
      setAttributeOptions(attributeRes.data || []);
    } catch (error) {
      message.error("Khởi tạo dữ liệu không thành công!");
    }
  };

  const formik = useFormik({
    initialValues: data ? data : initialVal,
    validationSchema: Yup.object({
      productName: Yup.string().required("Tên sản phẩm là bắt buộc!"),
      productDescription: Yup.string().required("Mô tả sản phẩm là bắt buộc!"),
      url: Yup.string().required("URL là bắt buộc!"),
      price: Yup.number().required("Giá là bắt buộc!"),
      productCategoryId: Yup.number()
        .required("Danh mục sản phẩm là bắt buộc!")
        .typeError("Danh mục sản phẩm là bắt buộc!"),
      images: Yup.array()
        .required("Hình ảnh là bắt buộc!")
        .min(1, "Hình ảnh là bắt buộc!"),
    }),
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit(values) {
      handleAddOrUpdate(values);
    },
  });

  const {
    values,
    errors,
    handleSubmit,
    setFieldValue,
    setFieldError,
    resetForm,
  } = formik;

  const handleAddOrUpdate = async (value) => {
    try {
      setLoading(true);
      if (data) {
        await api.put("/product/" + id, value);
        message.success("Cập nhật thành công!");
      } else {
        await api.post("/product", value);
        message.success("Thêm mới thành công!");
        resetForm();
      }
    } catch (errors) {
      message.error(errors.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChangeName = (e) => {
    setFieldValue("productName", e.target.value);
    if (!data) {
      setFieldValue("url", changeToSlug(e.target.value));
    }
  };

  return (
    <>
      {loading ? <Loading /> : null}
      <form autoComplete="off" onSubmit={handleSubmit}>
        <div className=" h-full fadein grid grid-rows-2 grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="rounded-md overflow-hidden shadow-md p-3 pb-6 lg:col-span-2 row-span-2 border-t-2 border-blue-6 bg-blue-1">
            <span className="font-medium">Mô tả sản phẩm</span>
            <Tabs defaultActiveKey="2">
              <TabPane tab={<span>Tiếng Việt</span>} key="1">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
                  <div>
                    <label htmlFor="title">
                      Tên sản phẩm<span className="text-red-6">*</span>
                    </label>
                    <Input
                      disabled={isDetail}
                      placeholder="Tên sản phẩm"
                      id="title"
                      value={values.productName}
                      onChange={handleChangeName}
                    />
                    <p className="text-red-6">{errors.productName}</p>
                  </div>
                  <div>
                    <label htmlFor="price">
                      Giá<span className="text-red-6">*</span>
                    </label>
                    <Input
                      type="number"
                      disabled={isDetail}
                      placeholder="Giá"
                      id="price"
                      value={values.price}
                      onChange={(event) => {
                        setFieldValue("price", event.target.value);
                      }}
                      min={0}
                    />
                    <p className="text-red-6">{errors.price}</p>
                  </div>
                  <div>
                    <label htmlFor="productCategoryId">
                      Danh mục sản phẩm<span className="text-red-6">*</span>
                    </label>
                    <Select
                      value={values.productCategoryId}
                      className="w-full"
                      id="productCategoryId"
                      onChange={(value) => {
                        setFieldValue("productCategoryId", value);
                      }}
                      placeholder="Danh mục sản phẩm"
                      allowClear
                      disabled={isDetail}
                    >
                      {productCategoryOptions.map((el) => (
                        <Select.Option
                          value={el.productCategoryId}
                          key={el.productCategoryId}
                        >
                          {el.productCategoryName}
                        </Select.Option>
                      ))}
                    </Select>
                    <p className="text-red-6">{errors.productCategoryId}</p>
                  </div>
                  <div>
                    <label htmlFor="brandId">Thương hiệu</label>
                    <Select
                      value={values.brandId}
                      className="w-full"
                      id="brandId"
                      onChange={(value) => {
                        setFieldValue("brandId", value);
                      }}
                      placeholder="Thương hiệu"
                      allowClear
                      disabled={isDetail}
                    >
                      {brandOptions.map((el) => (
                        <Select.Option value={el.brandId} key={el.brandId}>
                          {el.brandName}
                        </Select.Option>
                      ))}
                    </Select>
                  </div>
                  <div className="lg:col-span-2">
                    <label htmlFor="attributes">Thuộc tính</label>
                    <div className="mb-2">
                      <Select
                        className="w-[200px]"
                        id="brandId"
                        placeholder="Chọn thuộc tính"
                        allowClear
                        disabled={isDetail}
                        value={null}
                        onChange={(value) => {
                          const _attributes = [...values.attributes];
                          if (value) {
                            _attributes.push({
                              attributeId: value,
                              name: attributeOptions.find(
                                (el) => el.attributeId * 1 === value * 1
                              ).name,
                              attValue: "",
                            });
                            setFieldValue("attributes", _attributes);
                          }
                        }}
                      >
                        {attributeOptions.filter((item) => {
                          const elFound = values.attributes.find((element) => item.attributeId*1 === element.attributeId*1)
                          if(elFound) return false;
                          return true
                        }).map((el) => (
                          <Select.Option
                            value={el.attributeId}
                            key={el.attributeId}
                          >
                            {el.name}
                          </Select.Option>
                        ))}
                      </Select>
                    </div>
                    <table className="w-full border border-gray-6">
                      <tr className="text-center">
                        <td className="w-20 border border-gray-6">STT</td>
                        <td className="w-60 border border-gray-6">
                          Thuộc tính
                        </td>
                        <td className="border border-gray-6">Giá trị</td>
                        <td className="w-20 border border-gray-6">Xóa</td>
                      </tr>
                      {values.attributes.length ? values.attributes.map((el, index) => {
                        return (
                          <tr key={el.attributeId}>
                            <td className="w-10 border border-gray-6 text-center">
                              {index + 1}
                            </td>
                            <td className="w-60 border border-gray-6 p-2">
                              {el.name}
                            </td>
                            <td className="border border-gray-6 p-2">
                              {/* {el.attValue} */}
                              <Input
                                disabled={isDetail}
                                placeholder="Giá trị"
                                id="shortDescription"
                                value={el.attValue}
                                onChange={(event) => {
                                  const _attributes = [...values.attributes];
                                  _attributes[index].attValue = event.target.value;
                                  setFieldValue("attributes", _attributes);
                                }}
                                rows={2}
                              />
                            </td>
                            <td className="text-center border border-gray-6">
                              <span>
                                <DeleteOutlined className="text-red-6 cursor-pointer" onClick={() => {
                                  const _attributes = [...values.attributes];
                                  _attributes.splice(index, 1)
                                  setFieldValue("attributes", _attributes);
                                }}/>
                              </span>
                            </td>
                          </tr>
                        );
                      }) : <tr>
                          <td className="text-center" colSpan={10}>
                            Chưa có thuộc tính.
                          </td>
                        </tr>}
                    </table>
                    <p className="text-red-6">{errors.attributes}</p>
                  </div>
                  <div className="lg:col-span-2">
                    <label htmlFor="shortDescription">Mô tả ngắn</label>
                    <Input.TextArea
                      disabled={isDetail}
                      placeholder="Mô tả ngắn"
                      id="shortDescription"
                      value={values.shortDescription}
                      onChange={(event) => {
                        setFieldValue("shortDescription", event.target.value);
                      }}
                    />
                    <p className="text-red-6">{errors.shortDescription}</p>
                  </div>
                  <div className="lg:col-span-2">
                    <label htmlFor="content">
                      Mô tả sản phẩm<span className="text-red-6">*</span>
                    </label>
                    <Editor
                      apiKey={
                        "4l0v88s9tb22jxc1ina8zg7puwaa00q9uiq7wsu3melv2z65"
                      }
                      value={values.productDescription}
                      init={{
                        height: "500px",
                        branding: false,
                        plugins: [
                          "advlist autolink fullscreen lists link image charmap print preview anchor",
                          "searchreplace visualblocks code fullscreen ",
                          "insertdatetime media table paste code help wordcount",
                          "image imagetools ",
                          "toc",
                        ],
                        menubar: "file edit view format tools table tc help",
                        toolbar1:
                          "preview | undo redo | fullscreen | formatselect | bold italic forecolor backcolor underline strikethrough | fontselect fontsizeselect | alignleft aligncenter alignright alignjustify ",
                        toolbar2:
                          "bullist numlist outdent indent lineheight| removeformat | help | toc",
                        file_picker_types: "image",
                        relative_urls: false,
                        remove_script_host: false,
                        convert_urls: true,
                        entity_encoding: "raw",
                      }}
                      onEditorChange={(newValue) => {
                        setFieldValue("productDescription", newValue);
                      }}
                      disabled={isDetail}
                    />
                    <p className="text-red-6">{errors.productDescription}</p>
                  </div>
                  <div className="mt-2 lg:col-span-2">
                    <Checkbox
                      checked={values.isNew}
                      onChange={(e) => setFieldValue("isNew", e.target.checked)}
                      disabled={isDetail}
                    >
                      Sản phẩm mới
                    </Checkbox>
                    <Checkbox
                      checked={values.isTopSale}
                      onChange={(e) =>
                        setFieldValue("isTopSale", e.target.checked)
                      }
                      disabled={isDetail}
                    >
                      Sản phẩm bán chạy
                    </Checkbox>
                    <Checkbox
                      checked={values.enable}
                      onChange={(e) =>
                        setFieldValue("enable", e.target.checked)
                      }
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
            <span className="font-medium">
              Hình ảnh<span className="text-red-6">*</span>
            </span>
            <div className="my-3">
              <UploadListImage
                onChange={(value) => {
                  setFieldValue("images", value);
                }}
                beforeUpload={(message) => {
                  setFieldError("images", message);
                }}
                maxSize={1}
                maxItem={6}
                fileList={values.images}
                disabled={isDetail}
              />
              <p className="text-red-6">{errors.images}</p>
            </div>
          </div>
          <div className="rounded-md overflow-hidden shadow-md bg-blue-1 p-3 pb-6 border-t-2 border-blue-6">
            <span className="font-medium">SEO</span>
            <Tabs defaultActiveKey="2">
              <TabPane tab={<span>Tiếng Việt</span>} key="1">
                <div className="grid grid-cols-1 gap-2">
                  <div>
                    <label htmlFor="url">
                      URL<span className="text-red-6">*</span>
                    </label>
                    <Input
                      id="url"
                      placeholder="URL"
                      disabled={isDetail}
                      value={values.url}
                      onChange={(event) => {
                        setFieldValue("url", event.target.value);
                      }}
                    />
                    <p className="text-red-6">{errors.url}</p>
                  </div>
                  <div>
                    <label htmlFor="title">Title</label>
                    <Input
                      id="title"
                      placeholder="Title"
                      disabled={isDetail}
                      value={values.title}
                      onChange={(event) => {
                        setFieldValue("title", event.target.value);
                      }}
                    />
                  </div>
                  <div>
                    <label htmlFor="keywords">Keywords</label>
                    <Input
                      id="keywords"
                      placeholder="Keywords"
                      disabled={isDetail}
                      value={values.keywords}
                      onChange={(event) => {
                        setFieldValue("keywords", event.target.value);
                      }}
                    />
                  </div>
                  <div>
                    <label htmlFor="description">Description</label>
                    <Input
                      id="description"
                      placeholder="Description"
                      disabled={isDetail}
                      value={values.description}
                      onChange={(event) => {
                        setFieldValue("description", event.target.value);
                      }}
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

          <Link to="/product">
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
    </>
  );
}
