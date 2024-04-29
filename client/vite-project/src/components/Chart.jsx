import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import dayjs from "dayjs";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      display: "false",
    },
  },
};

export const ChartComponent = ({ array }) => {
  const labels = array.map((i) => dayjs(i.ts).format("DD/MM/YYYY"));

  const data = {
    labels,
    datasets: [
      {
        label: "Данные",
        data: array.map((i) => parseInt(i.mem_usage)),
        borderColor: "#1D2533",
        backgroundColor: "#4075ff",
      },
    ],
  };

  return <Line options={options} data={data} />;
};
