import { useState, useEffect } from "react";
import { message, Input, Tabs, Button } from "antd";
import { SaveOutlined, CloseCircleOutlined } from "@ant-design/icons";
import api from "../../service/apiService";
import { Link } from "react-router-dom";

const { TabPane } = Tabs;

export default function Form(props) {
  const { data = {}, page = "" } = props;
  const [formData, setFormData] = useState({
    title: "",
    keywords: "",
    description: "",
  });

  useEffect(() => {
    if (Object.keys(data).length) {
      setFormData(data);
    } else {
      setFormData({
        title: "",
        keywords: "",
        description: "",
      });
    }
  }, [data]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put("/seo-page", { ...formData, page });
      message.success("Cập nhật thành công!");
    } catch (error) {
      console.log(error);
      message.error("Cập nhật thất bại!");
    }
  };

  return (
    <form autoComplete="off">
      <div className="h-full fadein">
        <Tabs defaultActiveKey="2">
          <TabPane tab={<span>Tiếng Việt</span>} key="1">
            <div className="grid grid-cols-2 gap-2">
              {/* <div>
                  <label htmlFor="url">URL</label>
                  <Input id="url" placeholder="URL" />
                </div> */}
              <div>
                <label htmlFor="title">Title</label>
                <Input
                  id="title"
                  placeholder="Title"
                  value={formData.title}
                  onChange={(e) => {
                    setFormData({
                      ...formData,
                      title: e.target.value,
                    });
                  }}
                />
              </div>
              <div>
                <label htmlFor="keywords">Keywords</label>
                <Input
                  id="keywords"
                  placeholder="Keywords"
                  value={formData.keywords}
                  onChange={(e) => {
                    setFormData({
                      ...formData,
                      keywords: e.target.value,
                    });
                  }}
                />
              </div>
              <div>
                <label htmlFor="description">Description</label>
                <Input
                  id="description"
                  placeholder="Description"
                  value={formData.description}
                  onChange={(e) => {
                    setFormData({
                      ...formData,
                      description: e.target.value,
                    });
                  }}
                />
              </div>
            </div>
          </TabPane>
          {/* <TabPane tab={<span>Tiếng Anh</span>} key="2">
                Tiếng Anh
              </TabPane> */}
        </Tabs>
        <div className="mt-5 flex justify-center sm:justify-end items-center">
          <Button
            htmlType="submit"
            icon={<SaveOutlined />}
            type="primary"
            className="flex items-center bg-blue-6 mr-2"
            onClick={handleSubmit}
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
      </div>
    </form>
  );
}
