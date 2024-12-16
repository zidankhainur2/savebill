import React from "react";
import { BarChart, PieChart, LineChart } from "lucide-react";
import Navbar from "./Navbar";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

// Registrasi komponen Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

// Data pemakaian listrik per kapita di Indonesia
const barChartData = {
  labels: [
    "2009",
    "2010",
    "2011",
    "2012",
    "2013",
    "2014",
    "2015",
    "2016",
    "2017",
    "2018",
    "2019",
    "2020",
    "2021",
    "2022",
    "2023",
  ],
  datasets: [
    {
      label: "Pemakaian Listrik per Kapita (MWh)",
      data: [
        0.65, 0.7, 0.74, 0.79, 0.84, 0.88, 0.91, 0.95, 1.02, 1.06, 1.08, 1.09,
        1.1, 1.2, 1.28,
      ],
      backgroundColor: "rgba(255, 205, 86, 0.7)",
      borderColor: "rgba(255, 205, 86, 1)",
      borderWidth: 1,
    },
  ],
};

const barChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      labels: {
        color: "#FFD700", // Warna kuning untuk label legend
      },
    },
  },
  scales: {
    x: {
      ticks: {
        color: "#FFD700", // Warna kuning untuk label sumbu X
      },
    },
    y: {
      ticks: {
        color: "#FFD700", // Warna kuning untuk label sumbu Y
      },
    },
  },
};

export default function EnergyVisualizationPage() {
  return (
    <div className="bg-gradient-to-br from-black to-gray-900 min-h-screen text-yellow-400">
      <Navbar />
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-12">
          Visualisasi Data Pemakaian Listrik
        </h1>
        {/* Example Chart */}
        <div className="bg-gray-800 rounded-lg p-8 mt-16 shadow-lg">
          <h2 className="text-3xl font-semibold mb-6 text-yellow-500 text-center">
            Grafik Pemakaian Listrik per Kapita di Indonesia
          </h2>
          <div className="h-96">
            <Bar data={barChartData} options={barChartOptions} />
          </div>
        </div>
      </div>
    </div>
  );
}
