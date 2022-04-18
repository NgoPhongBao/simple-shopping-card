import React, { useState, useEffect } from "react";
import { Button, Spin, message, Breadcrumb } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import Search from "./Search";
import Table from "./Table";
import { Link } from "react-router-dom";
import api from "../../service/apiService";

const List = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [list, setList] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [query, setQuery] = useState({
    pageSize: 10,
    pageIndex: 1,
    keyword: "",
    status: null,
  });

  useEffect(() => {
    getList(query);
  }, []);

  const getList = async (query) => {
    setIsLoading(true);
    try {
      const res = await api.get("/cusorder", {...query, keyword: query.keyword.trim()});
      const { data = {} } = res;
      const { items = [], totalItems = 0 } = data;
      setList(items);
      setTotalItems(totalItems);
    } catch (error) {
      message.error("Khởi tạo dữ liệu thất bại!");
    } finally {
      setQuery(query)
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
          <Breadcrumb.Item>Danh sách đơn hàng</Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <div className=" h-full fadein">
        <div className="bg-white mt-0 shadow-md rounded-md overflow-hidden mb-6">
          <Search query={query} setQuery={setQuery} getList={getList} />
        </div>
        <div className="rounded-md overflow-hidden shadow-md bg-white">
          <Table
            getList={getList}
            loading={isLoading ? <Spin size="large" /> : false}
            dataSource={list}
            query={query}
            setQuery={setQuery}
            totalItems={totalItems}
          />
        </div>
      </div>
    </div>
  );
};

export default List;
