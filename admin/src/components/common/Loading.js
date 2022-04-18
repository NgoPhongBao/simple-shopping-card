import React from "react";
import { Space, Spin } from "antd";

export default function Loading() {
  return (
    <Space
      size="middle"
      className="fixed top-0 left-0 w-full h-full z-20 flex justify-center bg-[rgba(0,0,0,0.4)]"
    >
      <Spin size="large" />
      <Spin size="large" />
      <Spin size="large" />
    </Space>
  );
}
