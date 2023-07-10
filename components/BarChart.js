import React, { useState, useEffect } from "react";
import { getSession } from "next-auth/react";
import axios from "axios";
import moment from "moment";
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

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const BarChart = () => {
  const [nilai, setNilai] = useState([]);

  async function fetchData() {
    const session = await getSession();
    const res = await axios.get("/api/others/chart", {
      params: { role: session.user.role, id: session.user.id },
    });

    setNilai(res.data.data);
  }

  var datachart = {
    labels: nilai.map((v) => v.bulan),
    datasets: [
      {
        label: "Jumlah pendapatan",
        data: nilai.map((v) => v.total),
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "#64748b",
      },
    ],
  };

  var options = {
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Pendapatan Per Bulan",
      },
    },
    maintainAspectRatio: false,
    responsive: true,
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div className="w-full md:col-span-2 relative lg:h-[70vh] h-[50vh] m-auto p-4 border rounded-lg bg-white">
        <Bar data={datachart} options={options} />
      </div>
    </>
  );
};

export default BarChart;
