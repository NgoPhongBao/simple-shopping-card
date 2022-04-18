import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Layout, Menu } from "antd";
import {
  TeamOutlined,
  WalletOutlined,
  SettingOutlined,
  PictureOutlined,
  AliwangwangOutlined,
  SwitcherOutlined,
  GoogleOutlined,
  ReadOutlined,
  DashboardOutlined,
  ShoppingOutlined,
  ShopOutlined,
} from "@ant-design/icons";
import { useLocation } from "react-router-dom";

const { Sider } = Layout;
const { SubMenu, Item } = Menu;

const NavBar = (props) => {
  const [path] = useState(useLocation().pathname.split("/")[1]);

  const { collapsed, onCollapse, logoUrl } = props;

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={onCollapse}
      className="fixed top-0 left-0 z-20 h-full"
    >
      <div className="h-10 w-8/12 mx-auto my-10 text-2xl text-white flex justify-center items-center">
        <Link to="/dashboard">
          <img src={logoUrl} className="w-full" />
        </Link>
      </div>
      <Menu
        theme="dark"
        defaultSelectedKeys={[path]}
        defaultOpenKeys={[path]}
        mode="inline"
        style={{ height: "calc(100% - 80px)" }}
        className="overflow-y-auto"
      >
        <Item
          key="dashboard"
          icon={<DashboardOutlined />}
          className="font-bold"
        >
          <Link to="/dashboard">Dashboard</Link>
        </Item>
        <SubMenu
          key="product-management"
          icon={<WalletOutlined />}
          title="Quản lý sản phẩm"
        >
          <Item key="product">
            <Link to="/product">Sản phẩm</Link>
          </Item>
          <Item key="product-category">
            <Link to="/product-category">Danh mục sản phẩm</Link>
          </Item>
          <Item key="brand">
            <Link to="/brand">Thương hiệu</Link>
          </Item>
          <Item key="attribute">
            <Link to="/attribute">Thuộc tính</Link>
          </Item>
        </SubMenu>
        <Item key="news" icon={<ReadOutlined />}>
          <Link to="/news">Bài viết</Link>
        </Item>
        <Item key="banner" icon={<PictureOutlined />}>
          <Link to="/banner">Banner</Link>
        </Item>
        <Item key="cusorder" icon={<ShoppingOutlined />}>
          <Link to="/cusorder">Đơn hàng</Link>
        </Item>
        <SubMenu
          key="static-page"
          icon={<SwitcherOutlined />}
          title="Nội dung trang tĩnh"
        >
          <Item key="about">
            <Link to="/about">Giới thiệu</Link>
          </Item>
        </SubMenu>
        <Item key="support" icon={<AliwangwangOutlined />}>
          <Link to="/support">Danh sách liên hệ</Link>
        </Item>
        <Item key="store" icon={<ShopOutlined />}>
          <Link to="/store">Thông tin cửa hàng</Link>
        </Item>
        <Item key="seo-page" icon={<GoogleOutlined />}>
          <Link to="/seo-page">Quản lý SEO page</Link>
        </Item>
        <SubMenu
          key="user-management"
          icon={<TeamOutlined />}
          title="Quản lý user"
        >
          <Item key="user">
            <Link to="/user">Danh sách user</Link>
          </Item>
          <Item key="permission-group">
            <Link to="/permission-group">Nhóm quyền</Link>
          </Item>
          <Item key="permission">
            <Link to="/permission">Quyền</Link>
          </Item>
        </SubMenu>
        {/* <Item key="site-config" icon={<SettingOutlined />}>
          <Link to="/site-config">Thiết lập khác</Link>
        </Item> */}
      </Menu>
    </Sider>
  );
};

export default NavBar;
