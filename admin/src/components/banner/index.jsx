import React, { useState, useEffect } from "react";
import { Button, Spin, message, Breadcrumb } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import Search from "./Search";
import Table from "./Table";
import { Link } from "react-router-dom";
import api from "../../service/apiService";

const Banner = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [bannerList, setBannerList] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [query, setQuery] = useState({
    pageSize: 10,
    pageIndex: 1,
    bannerType: "",
    enable: 1,
  });

  useEffect(() => {
    getListBanner(query);
  }, []);

  const getListBanner = async (query) => {
    setIsLoading(true);
    try {
      const res = await api.get("/banner", query);
      const { data = {} } = res;
      const { items = [], totalItems = 0 } = data;
      setBannerList(items);
      setTotalItems(totalItems);
    } catch (error) {
      message.error("Khởi tạo dữ liệu thất bại!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="m-4">
      <div className="my-4">
        <Breadcrumb>
          <Breadcrumb.Item>
            <Link to="/">Dashboard</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>Banner</Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <div className=" h-full fadein">
        <div className="bg-white mt-0 shadow-md rounded-md overflow-hidden">
          <Search query={query} setQuery={setQuery} getListBanner={getListBanner} />
        </div>
        <div className="mt-4 mb-1">
          <Link to="/banner/add" className="inline-block">
            <Button
              type="primary"
              className="bg-green-5 hover:bg-green-4 focus:bg-green-4 border-0 rounded-xs flex items-center"
              size="normal"
              icon={<PlusOutlined />}
            >
              Thêm mới
            </Button>
          </Link>
        </div>
        <div className="rounded-md overflow-hidden shadow-md bg-white">
          <Table
            getListBanner={getListBanner}
            loading={isLoading ? <Spin size="large" /> : false}
            dataSource={bannerList}
            query={query}
            setQuery={setQuery}
            totalItems={totalItems}
          />
        </div>
      </div>
    </div>
  );
};

export default Banner;
