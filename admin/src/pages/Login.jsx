import React, { useEffect, useState } from "react";
import { Input, Button, message } from "antd";
import api from "../service/apiService";
import { useNavigate } from "react-router-dom";
import storage from "../service/storageService";
import bgImg from "../assets/images/bg.jpg"

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "admin",
    password: "123456",
  });

  const [err, setErr] = useState({
    username: "",
    password: "",
  });

  useEffect(() => {
    const authData = storage.getAuth();
    if (authData) {
      setTimeout(() => {
        navigate("/dashboard");
      }, 500);
    }
  }, []);

  const handleSubmit = async () => {
    if (!formData.username || !formData.password) {
      let error = {
        username: !formData.username ? "Username là bắt buộc!" : "",
        password: !formData.password ? "Password là bắt buộc!" : "",
      };
      setErr(error);
      return;
    }

    setErr({
      username: "",
      password: "",
    });

    try {
      const res = await api.post("/auth/login", formData);
      const { accessToken } = res.data;
      storage.setAuth({ accessToken });
      navigate("/dashboard");
      message.success("Đăng nhập thành công!");
    } catch (error) {
      message.error(error.message);
      console.log(error.message);
    }
  };

  return (
    <section className="flex flex-col md:flex-row h-screen items-center">
      <div className="bg-blue-600 hidden lg:block w-full md:w-1/2 h-screen border-0">
        <img
          src={bgImg}
          alt=""
          className="w-full h-full object-cover border-0"
        />
      </div>
      <div
        className="bg-white mx-auto w-10/12 sm:w-8/12 md:w-6/12 lg:w-1/3 h-screen px-6 lg:px-16 xl:px-12
          flex items-center justify-center"
      >
        <div className="w-full h-100">
          <h1 className="text-xl md:text-2xl font-bold leading-tight mt-12 text-center">
            Đăng nhập tài khoản của bạn
          </h1>
          <form className="mt-6">
            <div>
              <label className="block text-gray-700" htmlFor="username">
                Username<span className="text-red-6">*</span>
              </label>
              <Input
                id="username"
                value={formData.username}
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    username: e.target.value,
                  });
                }}
              />
              <p className="text-red-6">{err.username}</p>
            </div>
            <div className="mt-4">
              <label className="block text-gray-700" htmlFor="password">
                Password<span className="text-red-6">*</span>
              </label>
              <Input.Password
                id="password"
                value={formData.password}
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    password: e.target.value,
                  });
                }}
              />
              <p className="text-red-6">{err.password}</p>
            </div>
            <div className="text-center mt-4">
              <Button
                type="primary"
                className="bg-blue-6 w-40"
                htmlType="submit"
                onClick={(e) => {
                  e.preventDefault();
                  handleSubmit();
                }}
              >
                Đăng nhập
              </Button>
            </div>
          </form>
          <hr className="my-6 border-gray-300 w-full" />
          <p className="text-sm text-gray-500 mt-12 text-center">
            © 2022 Your Company - All Rights Reserved.
          </p>
        </div>
      </div>
    </section>
  );
}
