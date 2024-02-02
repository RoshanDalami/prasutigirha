"use client";
import React from "react";
import DashboardCard from "src/components/card";
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
import { faker } from "@faker-js/faker";
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

export const baroptions = {
  responsive: true,
  plugins: {
    legend: {
      position: "bottom",
    },
    title: {
      display: true,
      text: "Overview",
      font: {
        size: 18,
        weight: "bold",
      },
    },
  },
};
export const lineoptions = {
  responsive: true,
  plugins: {
    legend: {
      position: "bottom",
    },
    title: {
      display: true,
      text: "Number of Registration",
      font: {
        size: 18,
        weight: "bold",
      },
    },
  },
};
const labels = ["January", "February", "March", "April", "May", "June"];
export const bardata = {
  labels,
  datasets: [
    {
      label: "Donor",
      data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
      backgroundColor: "#004a89",
    },
    {
      label: "Baby",
      data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
      backgroundColor: "red",
    },
  ],
};
export const linedata = {
  labels,
  datasets: [
    {
      label: "Registration",
      data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
      borderColor: "#004a89",
      backgroundColor: "#004a89",
    },
  ],
};
export default function Dashboard() {
  const dashboarddata = [
    {
      id: 1,
      title: "Donor Records",
      recordAmount: "6k",
      imageName: "/assets/images/mother.png",
    },
    {
      id: 2,
      title: "Recipient Records",
      recordAmount: "1k",
      imageName: "/assets/images/newborn.png",
    },
    {
      id: 3,
      title: "Registration Records",
      recordAmount: "10k",
      imageName: "/assets/images/record.png",
    },
    {
      id: 4,
      title: "Milk Collection",
      recordAmount: "500",
      imageName: "/assets/images/feeding-bottle.png",
    },
  ];
  
  return (
    <div className="my-10 mx-10">
      <div className="flex items-center justify-center gap-5  ">
        {dashboarddata?.map((items) => {
          return (
            <div
              key={items.id}
              className="shadow-md  hover:scale-105 transform transition-transform ease-in-out duration-300 shadow-[#004a89] drop-shadow-xl"
            >
              <DashboardCard
                title={items.title}
                number={items.recordAmount}
                imageSrc={items.imageName}
              />
            </div>
          );
        })}
      </div>
      <div className="grid md:grid-cols-2 grid-cols-1 my-10 gap-10  ">
        <div className="w-[40vw] ">
          <Bar data={bardata} options={baroptions} />
        </div>
        <div className="w-[40vw]">
          <Line options={lineoptions} data={linedata} />
        </div>
      </div>
    </div>
  );
}
