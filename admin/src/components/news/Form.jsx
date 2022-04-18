import { SaveOutlined, CloseCircleOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { message, Input, Checkbox, Tabs, Button } from "antd";
import api from "../../service/apiService";
import { useFormik } from "formik";
import * as Yup from "yup";
import UploadSingleImage from "../common/upload-single-image/UploadSingleImage";
import { Editor } from "@tinymce/tinymce-react";
import { readImageAsBase64 } from "../../utils/func";
import { changeToSlug } from "../../utils/func";

const { TabPane } = Tabs;
const initialVal = {
  newsTitle: "",
  newsDescription: "",
  isHot: 0,
  orderIndex: 0,
  content: "",
  enable: 1,
  url: "",
  title: "",
  keywords: "",
  description: "",
  imageUrl: "",
};
export default function Form(props) {
  const formik = useFormik({
    initialValues: props.newsData ? props.newsData : initialVal,
    validationSchema: Yup.object({
      newsTitle: Yup.string().required("Tiêu đề không được để trống "),
      newsDescription: Yup.string().required("Mô tả không được để trống"),
      content: Yup.string().required("Nội dung không được để trống"),
      imageUrl: Yup.string().required("Hình ảnh là bắt buộc"),
      url: Yup.string().required("URL là bắt buộc!"),
    }),
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit(values) {
      handleSubmitAddNews(values);
    },
  });
  const handleSubmitAddNews = async (value) => {
    try {
      if (props.newsData) {
        await api.put("/news/" + props.newsId, value);
        message.success("Cập nhật thành công!");
      } else {
        await api.post("/news", value);
        message.success("Thêm mới thành công!");
        formik.resetForm();
      }
    } catch (errors) {
      message.error(errors.message);
    }
  };

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

  const handleChangeName = (e) => {
    formik.setFieldValue("newsTitle", e.target.value);
    if (!props.newsData) {
      formik.setFieldValue("url", changeToSlug(e.target.value));
    }
  };

  return (
    <form autoComplete="off" onSubmit={formik.handleSubmit}>
      <div className=" h-full fadein grid grid-rows-2 grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="rounded-md overflow-hidden shadow-md p-3 pb-6 lg:col-span-2 row-span-2 border-t-2 border-blue-6 bg-blue-1">
          <span className="font-medium">Mô tả bài viết</span>
          <Tabs defaultActiveKey="2">
            <TabPane tab={<span>Tiếng Việt</span>} key="1">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
                <div>
                  <label htmlFor="title">
                    Tiêu đề<span className="text-red-6">*</span>
                  </label>
                  <Input
                    disabled={props.isDetail}
                    placeholder="Tiêu đề"
                    id="title"
                    value={formik.values.newsTitle}
                    onChange={handleChangeName}
                  />
                  <p className="text-red-6">{formik.errors.newsTitle}</p>
                </div>
                <div>
                  <label htmlFor="description">
                    Mô tả ngắn<span className="text-red-6">*</span>
                  </label>
                  <Input.TextArea
                    disabled={props.isDetail}
                    placeholder="Mô tả ngắn"
                    id="description"
                    value={formik.values.newsDescription}
                    onChange={(event) => {
                      formik.setFieldValue(
                        "newsDescription",
                        event.target.value
                      );
                    }}
                  />
                  <p className="text-red-6">{formik.errors.newsDescription}</p>
                </div>
                <div className="lg:col-span-2">
                  <label htmlFor="content">
                    Nội dung<span className="text-red-6">*</span>
                  </label>
                  <Editor
                    apiKey={"4l0v88s9tb22jxc1ina8zg7puwaa00q9uiq7wsu3melv2z65"}
                    value={formik.values.content}
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
                      formik.setFieldValue("content", newValue);
                    }}
                    disabled={props.isDetail}
                  />
                  <p className="text-red-6">{formik.errors.content}</p>
                </div>
                <div className="mt-2">
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
        <div className="rounded-md overflow-hidden shadow-md bg-blue-1 p-3 pb-6 border-t-2 border-blue-6">
          <span className="font-medium">
            Hình ảnh<span className="text-red-6">*</span>
          </span>
          <div className="m-5">
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
            <p className="text-red-6 text-center">{formik.errors.imageUrl}</p>
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
                    disabled={props.isDetail}
                    value={formik.values.url}
                    onChange={(event) => {
                      formik.setFieldValue("url", event.target.value);
                    }}
                  />
                  <p className="text-red-6">{formik.errors.url}</p>
                </div>
                <div>
                  <label htmlFor="title">Title</label>
                  <Input
                    id="title"
                    placeholder="Title"
                    disabled={props.isDetail}
                    value={formik.values.title}
                    onChange={(event) => {
                      formik.setFieldValue("title", event.target.value);
                    }}
                  />
                </div>
                <div>
                  <label htmlFor="keywords">Keywords</label>
                  <Input
                    id="keywords"
                    placeholder="Keywords"
                    disabled={props.isDetail}
                    value={formik.values.keywords}
                    onChange={(event) => {
                      formik.setFieldValue("keywords", event.target.value);
                    }}
                  />
                </div>
                <div>
                  <label htmlFor="description">Description</label>
                  <Input
                    id="description"
                    placeholder="Description"
                    disabled={props.isDetail}
                    value={formik.values.description}
                    onChange={(event) => {
                      formik.setFieldValue("description", event.target.value);
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

        <Link to="/news">
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
