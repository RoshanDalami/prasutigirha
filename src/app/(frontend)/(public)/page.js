"use client";
import React, { useEffect, useState } from "react";
import DashboardCard from "src/components/card";
import { useRecoilValue } from "recoil";
import { userAtomState } from "src/recoil/user/userAtom";
import { store } from "src/redux/store";
import Cookies from "js-cookie";
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
      label: "Milk Collected",
      data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
      backgroundColor: "#004a89",
    },
    {
      label: "Milk Requsition",
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
import {
  getMilkCollected,
  getMilkRequsitited,
  getNumberOfDonor,
  getTotalBaby,
  getMonthWiseMilkCollection,getMonthWiseMilkRequsition
} from 'src/services/apiService/dashboard/dashboardService'
export default function Dashboard() {
  const [baby,setBaby] = useState(0);
  useEffect(()=>{
    async function fetchData(){
      const {data,status} = await getTotalBaby();
      if(status === 200){
        setBaby(data)
      }
    }
    fetchData()
  },[])

  const [milkCollected,setMilkCollected] = useState(0);
  useEffect(()=>{
    async function fetchData(){
      const {data,status}= await getMilkCollected();
      if(status === 200){
        setMilkCollected(data)
      }
    }
    fetchData()
  },[])

  const [milkRequsition,setMilkRequsition] = useState(0);
  useEffect(()=>{
    async function fetchData(){
      const {data,status}= await getMilkRequsitited();
      if(status === 200){
        setMilkRequsition(data)
      }
    }
    fetchData()
  },[])

  const [donor,setDonor] = useState(0);
  useEffect(()=>{
    async function fetchData(){
      const {data,status}= await getNumberOfDonor();
      if(status === 200){
        setDonor(data)
      }
    }
    fetchData()
  },[])


  const dashboarddata = [
    {
      id: 1,
      title: "Donor Records",
      recordAmount: donor,
      imageName: "/assets/images/mother.png",
    },
    {
      id: 2,
      title: "Recipient Records",
      recordAmount: baby,
      imageName: "/assets/images/newborn.png",
    },
    {
      id: 3,
      title: "Milk Requsition",
      recordAmount: milkRequsition,
      imageName: "/assets/images/record.png",
    },
    {
      id: 4,
      title: "Milk Collection",
      recordAmount: milkCollected,
      imageName: "/assets/images/feeding-bottle.png",
    },
  ];
  const token = useRecoilValue(userAtomState)
  console.log(store.getState(),'response')
  const [milkCollectionMonthWise,setMilkCollectionMonthWise] = useState([])
  useEffect(()=>{
    async function fetchData(){
      const {status , data} = await getMonthWiseMilkCollection();
      if(status === 200){
        setMilkCollectionMonthWise(data)
      }
    }
    fetchData()
  },[])
  const [milkRequsitionMonthWise,setMilkRequsitionMonthWise] = useState([])
  useEffect(()=>{
    async function fetchData(){
      const {status , data} = await getMonthWiseMilkRequsition();
      if(status === 200){
        setMilkRequsitionMonthWise(data)
      }
    }
    fetchData()
  },[])
   const bardata = {
    labels,
    datasets: [
      {
        label: "Milk Collected",
        data: milkCollectionMonthWise,
        backgroundColor: "#004a89",
      },
      {
        label: "Milk Requsition",
        data: milkRequsitionMonthWise,
        backgroundColor: "red",
      },
    ],
  };
   const linedata = {
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
