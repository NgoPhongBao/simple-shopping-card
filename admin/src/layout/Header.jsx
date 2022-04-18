import React from "react";
import { Layout, Menu, Dropdown } from "antd";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  DownOutlined,
  UserOutlined,
} from "@ant-design/icons";
import storage from "../service/storageService";
import { useNavigate } from "react-router-dom";

const { Header: HeaderAntd } = Layout;

const Header = (props) => {
  const { collapsed, setCollapsed, profile, setIsShowModal } = props;
  const navigate = useNavigate();

  const logout = () => {
    storage.deleteAuth();
    navigate("/login");
  };

  const Option = () => {
    return (
      <Menu>
        <Menu.Item key="change-password" onClick={() => setIsShowModal(true)}>
          Thay đổi mật khẩu
        </Menu.Item>
        <Menu.Item key="logout" onClick={logout}>
          Đăng xuất
        </Menu.Item>
      </Menu>
    );
  };

  return (
    <HeaderAntd className="fixed top-0 right-0 w-full p-0 z-10">
      <div className="bg-darkblue-6 w-full">
        <div
          className="transition-all flex justify-between"
          style={{ marginLeft: collapsed ? "85px" : "205px" }}
        >
          <span onClick={() => setCollapsed(!collapsed)}>
            {collapsed ? (
              <MenuUnfoldOutlined
                className="cursor-pointer text-2xl"
                style={{ color: "#fff" }}
              />
            ) : (
              <MenuFoldOutlined
                className="cursor-pointer text-2xl"
                style={{ color: "#fff" }}
              />
            )}
          </span>
          <Dropdown overlay={<Option />} className="w-30 mr-4">
            <p className="cursor-pointer text-white flex items-center">
              <UserOutlined />{" "}
              <span className="pl-1 pr-4">{profile.fullName} </span>{" "}
              <DownOutlined />
            </p>
          </Dropdown>
        </div>
      </div>
    </HeaderAntd>
  );
};

export default Header;
