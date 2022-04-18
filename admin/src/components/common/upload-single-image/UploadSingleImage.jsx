import { Upload } from "antd";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { useState, useEffect } from "react";
import "./style.scss";

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
}



const UploadSingleImage = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    setImageUrl(props.imageUrl);
  }, [props]);

  const handleChange = (info) => {
    if (info.file.status === "removed") {
      setImageUrl("");
      props.onChange("");
    } else if (info.file.status === "uploading") {
      getBase64(info.file.originFileObj, (imageUrl) => {
        setImageUrl(imageUrl);
        setIsLoading(false);
        props.onChange(imageUrl);
      });
    }
  };

  function beforeUpload(file) {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      props.beforeUpload("Định dạng hình ảnh không hợp lệ.")
      return false
    }
    const isValidSize = file.size / 1024 / 1024 <= props.maxSize;
    if (!isValidSize) {
      props.beforeUpload("Dung lượng hình ảnh không được lớn hơn "  + props.maxSize + "MB")
      return false
    }
    return isJpgOrPng && isValidSize;
  }

  const uploadButton = (
    <div>
      {isLoading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );
  return (
    <Upload
      {...props}
      name="imageUrl"
      listType="picture-card"
      fileList={
        imageUrl
          ? [
              {
                uid: "-xxx",
                status: "done",
                url: imageUrl,
              },
            ]
          : []
      }
      className="single-image-uploader"
      showUploadList={{ showRemoveIcon: true, showPreviewIcon: false }}
      beforeUpload={beforeUpload}
      onChange={handleChange}
      customRequest={({ file, onSuccess }) => {
        setTimeout(() => {
          onSuccess("ok");
        }, 0);
      }}
    >
      {imageUrl ? null : uploadButton}
    </Upload>
  );
};

export default UploadSingleImage;
