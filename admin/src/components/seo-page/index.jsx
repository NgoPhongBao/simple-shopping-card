import React from "react";
import Form from "./Form";
import api from "../../service/apiService";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { message, Breadcrumb, Tabs } from "antd";

const { TabPane } = Tabs;
const SeoPage = () => {
  const [data, setData] = useState({});
  const [activeKey, setActiveKey] = useState("default");

  useEffect(() => {
    getData();
  }, [activeKey]);

  const getData = async () => {
    try {
      const res = await api.get("/seo-page", { page: activeKey });
      setData(res.data);
    } catch (error) {
      console.log(error);
      message.error("Khởi tạo dữ liệu thất bại!");
    }
  };

  return (
    <div className="m-4">
      <div className="my-4">
        <Breadcrumb>
          <Breadcrumb.Item>
            <Link to="/">Dashboard</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            SEO trang{" "}
            {activeKey === "product-category"
              ? "danh mục sản phẩm"
              : activeKey === "news"
              ? "tin tức"
              : activeKey === "about"
              ? "giới thiệu"
              : activeKey === "contact"
              ? "liên hệ"
              : activeKey === "default"
              ? "mặc định"
              : ""}
          </Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <div className="h-full fadein">
        <div className="rounded-md overflow-hidden shadow-md bg-blue-1 p-3 pb-6 border-t-2 border-blue-6">
          <Tabs activeKey={activeKey} onChange={(key) => setActiveKey(key)}>
            <TabPane tab={<span>Mặc định</span>} key="default">
              <Form page={activeKey} data={data} />
            </TabPane>
            <TabPane
              tab={<span>Danh mục sản phẩm</span>}
              key="product-category"
            >
              <Form page={activeKey} data={data} />
            </TabPane>
            <TabPane tab={<span>Tin tức</span>} key="news">
              <Form page={activeKey} data={data} />
            </TabPane>
            <TabPane tab={<span>Giới thiệu</span>} key="about">
              <Form page={activeKey} data={data} />
            </TabPane>
            <TabPane tab={<span>Liên hệ</span>} key="contact">
              <Form page={activeKey} data={data} />
            </TabPane>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default SeoPage;
