import { useEffect } from "react";
import { SaveOutlined, CloseCircleOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { message, Input, Tabs, Button } from "antd";
import api from "../../service/apiService";
import { useFormik } from "formik";
import * as Yup from "yup";
import UploadSingleImage from "../common/upload-single-image/UploadSingleImage";
import { Editor } from "@tinymce/tinymce-react";
import { readImageAsBase64 } from "../../utils/func";

const { TabPane } = Tabs;
const initialVal = {
  title: "",
  content: "",
  imageUrl: ""
};
export default function Form(props) {
  const { data } = props;

  const formik = useFormik({
    initialValues: Object.keys(data).length ? data : initialVal,
    validationSchema: Yup.object({
      title: Yup.string().required("Tiêu đề là bắt buộc."),
      content: Yup.string().required("Nội dung là bắt buộc."),
      imageUrl: Yup.string().required("Hình ảnh là bắt buộc."),
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
      await api.put("/about", values);
      message.success("Cập nhật thành công!");
    } catch (errors) {
      console.log(errors.message);
      message.error("Cập nhật thất bại!");
    }
  };

  const {
    values,
    getFieldProps,
    errors,
    setFieldValue,
    setFieldError,
    setValues,
    handleSubmit,
  } = formik;

  const handleUploadImage = async (blobInfo, success, failure) => {
    readImageAsBase64(blobInfo.blob(), async (base64) => {
      try {
        const imageRes = await api.post("/upload-image", { base64 });
        success(imageRes.data);
      } catch (error) {
        failure(error);
      }
    });
  };

  return (
    <form autoComplete="off" onSubmit={handleSubmit}>
      <div className="h-full fadein grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="rounded-md overflow-hidden shadow-md p-3 pb-6 lg:col-span-2 border-t-2 border-blue-6 bg-blue-1">
          <span className="font-medium">Thông tin trang giới thiệu</span>
          <Tabs defaultActiveKey="2">
            <TabPane tab={<span>Tiếng Việt</span>} key="1">
              <div className="grid grid-cols-1 gap-2">
                <div>
                  <label htmlFor="title">
                    Tiêu đề<span className="text-red-6">*</span>
                  </label>
                  <Input
                    placeholder="Tiêu đề"
                    id="title"
                    {...getFieldProps("title")}
                  />
                  <p className="text-red-6">{errors.title}</p>
                </div>
                <div>
                  <label htmlFor="content">
                    Nội dung<span className="text-red-6">*</span>
                  </label>
                  <Editor
                    apiKey={"4l0v88s9tb22jxc1ina8zg7puwaa00q9uiq7wsu3melv2z65"}
                    value={values.content}
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
                      menubar:
                        "file edit view insert format tools table tc help",
                      toolbar1:
                        "preview | undo redo | fullscreen | formatselect | bold italic forecolor backcolor underline strikethrough | fontselect fontsizeselect | alignleft aligncenter alignright alignjustify ",
                      toolbar2:
                        "bullist numlist outdent indent lineheight| removeformat | help | image | toc",
                      file_picker_types: "image",
                      relative_urls: false,
                      remove_script_host: false,
                      convert_urls: true,
                      entity_encoding: "raw",
                      images_dataimg_filter: function (img) {
                        return img.hasAttribute("internal-blob");
                      },
                      images_upload_handler: handleUploadImage,
                    }}
                    onEditorChange={(newValue) => {
                      setFieldValue("content", newValue);
                    }}
                    disabled={props.isDetail}
                  />
                  <p className="text-red-6">{errors.content}</p>
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
            Hình ảnh<span className="text-red-6 font-medium">*</span>
          </span>
          <div className="m-5">
            <UploadSingleImage
              onChange={(value) => {
                setFieldValue("imageUrl", value);
              }}
              beforeUpload={(message) => {
                setFieldValue("imageUrl", "");
                setFieldError("imageUrl", message);
              }}
              maxSize={1}
              imageUrl={values.imageUrl}
            />
            <p className="text-red-6 text-center">{errors.imageUrl}</p>
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
