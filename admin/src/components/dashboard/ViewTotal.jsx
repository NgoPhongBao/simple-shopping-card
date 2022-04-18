import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import api from "../../service/apiService";
import { message } from "antd";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip);

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Lượt truy cập",
    },
  },
  scales: {
    y: {
        // max: 500,
        min: 0,
        ticks: {
            stepSize: 1
        }
    }
}
};

const labels = [
  "Tháng 1",
  "Tháng 2",
  "Tháng 3",
  "Tháng 4",
  "Tháng 5",
  "Tháng 6",
  "Tháng 7",
  "Tháng 8",
  "Tháng 9",
  "Tháng 10",
  "Tháng 11",
  "Tháng 12",
];


export default function ViewTotal() {
  const [views, setViews] = useState([]);
  useEffect(() => {getViews()}, []);

  const getViews = async () => {
    try {
      const res = await api.get("/view");
      const _views = (Array.from({length: 12}, (v, i) => i + 1)).map((el, index) => {
        const view =  (res.data || []).find((item) => item.viewMonth*1 === index + 1);
        if(view){
          return view.viewNumber
        }
        return 0
      })

      setViews(_views);
    } catch (error) {
      message.error("Khởi tạo dữ liệu không thành công!");
    }
  };

  const data = {
    labels,
    datasets: [
      {
        data: views,
        backgroundColor: "#40a9ff",
      },
    ],
  }

  return <Bar options={options} data={data} />;
}
