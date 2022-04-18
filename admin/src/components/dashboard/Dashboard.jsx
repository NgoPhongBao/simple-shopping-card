import React, { useEffect, useState } from "react";
import {
  DollarOutlined,
  EyeOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import ViewTotal from "./ViewTotal";
import AnimatedNum from "./AnimatedNum";
import api from "../../service/apiService";
import { message } from "antd";

export default function Dashboard() {
  const [statistic, setStatistic] = useState({
    numberOrder: 0,
    numberTurnover: 0,
  });

  useEffect(() => {
    getStatistic();
  }, []);

  const getStatistic = async () => {
    try {
      const res = await api.get("/others/statistic");
      setStatistic(res.data);
    } catch (error) {
      message.error("Khởi tạo dữ liệu không thành công!");
    }
  };

  return (
    <div className="m-4">
      <p className="font-bold text-2xl text-center mt-10">Thống kê</p>
      <div className="grid md:grid-cols-3 gap-4 my-10">
        <div className="border-t-2 border-yellow-6 rounded-md h-20 bg-yellow-1 p-2 flex items-center">
          <div className="bg-yellow-6 w-16 h-full rounded-xl flex items-center justify-center mr-2">
            <ShoppingCartOutlined className="text-white text-3xl flex items-center justify-center" />
          </div>
          <div>
            <p>Tổng đơn hàng</p>
            <p className="font-bold">
              {statistic.numberOrder ? (
                <AnimatedNum number={statistic.numberOrder} />
              ) : (
                0
              )}
            </p>
          </div>
        </div>
        <div className="border-t-2 border-blue-6 rounded-md h-20 bg-blue-1 p-2 flex items-center">
          <div className="bg-blue-6 w-16 h-full rounded-xl flex items-center justify-center mr-2">
            <DollarOutlined className="text-white text-3xl flex items-center justify-center" />
          </div>
          <div>
            <p>Tổng doanh thu</p>
            <p className="font-bold flex">
              {statistic.numberTurnover ? (
                <AnimatedNum
                  number={statistic.numberTurnover}
                  isMoney
                  duration={700}
                />
              ) : (
                0
              )}

              <span className="pl-1">đ</span>
            </p>
          </div>
        </div>
        <div className="border-t-2 border-volcano-6 rounded-md h-20 bg-volcano-1 p-2 flex items-center">
          <div className="bg-volcano-6 w-16 h-full rounded-xl flex items-center justify-center mr-2">
            <EyeOutlined className="text-white text-3xl flex items-center justify-center" />
          </div>
          <div>
            <p>Tổng lượt truy cập</p>
            <p className="font-bold">
              {statistic.numberView ? (
                <AnimatedNum number={statistic.numberView} />
              ) : (
                0
              )}
            </p>
          </div>
        </div>
      </div>
      <div className="w-1/2">
        <ViewTotal />
      </div>
    </div>
  );
}
