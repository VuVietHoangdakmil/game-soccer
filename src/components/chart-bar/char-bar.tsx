import { useMemo } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useStateApp } from "../providers/state-app";

// Đăng ký các thành phần cần thiết của Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "top" as const, // Vị trí legend
    },
    title: {
      display: false,
    },
  },
};
const BarChart = () => {
  const {
    actionRound: {
      roundDataCustomer: { skillAllRound },
    },
  } = useStateApp();

  // Dữ liệu cho Bar Chart

  const dataMemo = useMemo(() => {
    const labels: string[] = [];
    const data: number[] = [];

    for (let nameSkill in skillAllRound) {
      const count = skillAllRound[nameSkill].count;
      labels.push(nameSkill);
      data.push(count);
    }
    return {
      ...data,
      labels,
      datasets: [
        {
          label: "Số lần sử dụng kỹ thuật",
          data,
          backgroundColor: "rgb(59 130 246)", // Màu nền cột
          barThickness: 50,
        },
      ],
    };
  }, [JSON.stringify(skillAllRound)]);
  // Cấu hình tùy chọn

  return (
    <div>
      <h2 className="text-blue-600 text-2xl font-medium text-center">
        Thống kê số lần kỹ thuật được dùng trong trận
      </h2>
      <div className="h-[70vh]">
        <Bar data={dataMemo} options={options} />
      </div>
    </div>
  );
};

export default BarChart;
