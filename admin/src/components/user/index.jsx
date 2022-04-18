import React, { useState, useEffect } from "react";
import { Button, Spin, message, Breadcrumb, Modal, Input } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import Search from "./Search";
import Table from "./Table";
import { Link } from "react-router-dom";
import api from "../../service/apiService";
import ModalChangePass from "./ModalChangePass";

const User = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [userList, setUserList] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [query, setQuery] = useState({
    pageSize: 10,
    pageIndex: 1,
    keyword: "",
    enable: 1,
  });

  const [modal, setModal] = useState({
    isOpen: false,
    userId: null,
  });

  useEffect(() => {
    getListUser(query);
  }, []);

  const getListUser = async (query) => {
    setIsLoading(true);
    try {
      const res = await api.get("/user", query);
      const { data = {} } = res;
      const { items = [], totalItems = 0 } = data;
      setUserList(items);
      setTotalItems(totalItems);
    } catch (error) {
      message.error("Khởi tạo dữ liệu thất bại!");
    } finally {
      setQuery(query);
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
          <Breadcrumb.Item>User</Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <div className=" h-full fadein">
        <div className="bg-white mt-0 shadow-md rounded-md overflow-hidden">
          <Search query={query} setQuery={setQuery} getListUser={getListUser} />
        </div>
        <div className="mt-4 mb-1">
          <Link to="/user/add" className="inline-block">
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
            setModal={setModal}
            getListUser={getListUser}
            loading={isLoading ? <Spin size="large" /> : false}
            dataSource={userList}
            query={query}
            etQuery={setQuery}
            totalItems={totalItems}
          />
        </div>
      </div>
      {modal.isOpen ? (
        <ModalChangePass modal={modal} setModal={setModal} />
      ) : null}
    </div>
  );
};

export default User;
