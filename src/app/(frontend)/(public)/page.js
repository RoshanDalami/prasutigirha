"use client";
import React from "react";
import DashboardCard from "src/components/card";
import Loader from "src/components/Loader";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
} from "chart.js";
import { Bar, Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

import {
  useAllRecords,
  useDonorNumberMonthly,
  useMilkCollectionMonthly,
  useMilkRequisitionMonthly,
} from "src/hooks/useDashboard";

export const baroptions = {
  responsive: true,
  plugins: {
    legend: { position: "bottom" },
    title: {
      display: true,
      text: "Overview",
      font: { size: 18, weight: "bold" },
    },
  },
};

export const lineoptions = {
  responsive: true,
  plugins: {
    legend: { position: "bottom" },
    title: {
      display: true,
      text: "Number of Registration",
      font: { size: 18, weight: "bold" },
    },
  },
};

const labels = [
  "Baisakh", "Jestha", "Ashad", "Shrawn", "Bhadra", "Ashoj",
  "Kartik", "Mangshir", "Paush", "Magh", "Falgun", "Chaitra",
];

export default function Dashboard() {
  const { data: allRecords = [], isLoading } = useAllRecords();
  const { data: donorNumber = [] } = useDonorNumberMonthly();
  const { data: milkCollectionMonthWise = [] } = useMilkCollectionMonthly();
  const { data: milkRequsitionMonthWise = [] } = useMilkRequisitionMonthly();

  const bardata = {
    labels,
    datasets: [
      { label: "Milk Collected", data: milkCollectionMonthWise, backgroundColor: "#004a89" },
      { label: "Milk Requsition", data: milkRequsitionMonthWise, backgroundColor: "red" },
    ],
  };

  const linedata = {
    labels,
    datasets: [
      { label: "Registration", data: donorNumber, borderColor: "#004a89", backgroundColor: "#004a89" },
    ],
  };

  if (isLoading) return <Loader />;

  return (
    <div className="my-10 mx-10">
      <div className="grid md:grid-cols-4 items-center justify-center gap-5">
        {allRecords?.map((items) => (
          <div
            key={items.id}
            className="shadow-md hover:scale-105 transform transition-transform ease-in-out duration-300 shadow-[#004a89] drop-shadow-xl"
          >
            <DashboardCard
              title={items.title}
              number={items.recordAmount}
              imageSrc={items.imageName}
              unit={items.units}
            />
          </div>
        ))}
      </div>
      <div className="grid md:grid-cols-2 grid-cols-1 my-10 gap-10">
        <div className="w-[40vw]">
          <Bar data={bardata} options={baroptions} />
        </div>
        <div className="w-[40vw]">
          <Line options={lineoptions} data={linedata} />
        </div>
      </div>
    </div>
  );
}
