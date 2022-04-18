import React, { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Layout } from "antd";
import NavBar from "./NavBar";
import Header from "./Header";
import storage from "../service/storageService";
import api from "../service/apiService";
import ModalChangePass from "./ModalChangePass";

const { Content } = Layout;

const DefaultLayout = (props) => {
  const [collapsed, setCollapsed] = useState(false);
  const [isAuth, setIsAuth] = useState(false);
  const [profile, setProfile] = useState({});
  const [store, setStore] = useState({});
  const [isShowMoal, setIsShowModal] = useState(false);

  const navigate = useNavigate();

  const onCollapse = (collapsed) => {
    setCollapsed(collapsed);
  };

  useEffect(() => {
    const authData = storage.getAuth();
    if (authData) {
      setIsAuth(true);
      getProfile();
      getStore()
    } else {
      navigate("/login");
    }
  }, []);

  const getProfile = async () => {
    const res = await api.get("/user/profile");
    setProfile(res.data);
  };

  const getStore = async () => {
    const res = await api.get("/store");
    setStore(res.data);
  };

  return (
    <>
      {isShowMoal ? (
        <ModalChangePass userId={profile.userId} setIsShowModal={setIsShowModal} />
      ) : null}
      <Layout style={{ minHeight: "100vh" }} id="portal">
        <NavBar collapsed={collapsed} onCollapse={onCollapse} logoUrl={store.logoUrl || ""}/>
        <Layout>
          <Header
            collapsed={collapsed}
            setCollapsed={setCollapsed}
            profile={profile}
            setIsShowModal={setIsShowModal} 
          />
          <Content
            style={{ marginLeft: collapsed ? "80px" : "200px" }}
            className="transition-all mt-16"
          >
            {isAuth ? <Outlet /> : null}
          </Content>
        </Layout>
      </Layout>
    </>
  );
};

export default DefaultLayout;
