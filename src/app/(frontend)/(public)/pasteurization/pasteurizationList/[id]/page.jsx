"use client";
import React, { useEffect, useState, useRef } from "react";
import { useParams } from "next/navigation";
import { urls } from "src/services/apiHelpers";
import axios from "axios";
import QRCode from "react-qr-code";
import CircularProgress from "@mui/material/CircularProgress";
import { useReactToPrint } from "react-to-print";
export default function BottleDetails() {
  const { id } = useParams();
  const [pooling, setPooling] = useState({});
  const [poolingDone, setPoolingDone] = useState(false);
  useEffect(() => {
    async function fetchData() {
      const {  data } = await axios.get(`${urls.getPoolingById}/${id}`);
      if (data?.status === 200) {
        setPooling(data?.data);
        setPoolingDone(true);
      }
    }
    fetchData();
  }, [id]);

  const [bottles, setBottles] = useState({});
  const [bottle, setBottle] = useState(false);
  useEffect(() => {
    if (poolingDone) {
      async function fetchData() {
        const { data, status } = await axios.get(`${urls.getBottle}/${id}`);
        if (data?.status === 200) {
          setBottles(data?.data);
          setBottle(true);
        }
      }
      fetchData();
    }
  }, [id, poolingDone]);
  //donor list

  const [gestational, setGestational] = useState([]);
  useEffect(() => {
    if (bottle) {
      async function fetchData() {
        const { data, status } = await axios.get(`${urls.getGestational}`);
        if (data?.status === 200) {
          setGestational(data?.data);
        }
      }
      fetchData();
    }
  }, [bottle]);

  const onSubmit = async () => {
    const data = {
      poolingId: pooling._id,
      poolingCondition: pooling.poolingCondition,
      expireDate: pooling.expireDate,
      totalVolume: pooling.collectedVolume,
      poolingDate: pooling.date,
    };
    try {
      const response = await axios.post(`${urls.createBottle}`, data);
      if (response?.data?.status === 200) {
        const { data, status } = await axios.get(`${urls.getBottle}/${id}`);
        if (data?.status === 200) {
          setBottles(data?.data);
        }
      }
    } catch (error) {}
  };

  // const test = getDonor.filter((item, index) => {
  //   return pooling?.donorDetailsForPooling?.some(
  //     (donor) => item.donorId === donor.donorId
  //   );
  // });
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  const donorDetail = pooling?.donorDetailsForPooling

  for(let i = 0 ; i<donorDetail?.length;i++){
    if(donorDetail[i]?.donorName == donorDetail[i+1]?.donorName){
       let milkVolume =   donorDetail[i]?.volumeOfMilkPooled + donorDetail[i+1]?.volumeOfMilkPooled;
       donorDetail[i].volumeOfMilkPooled = milkVolume;
       donorDetail.splice(i + 1, 1)
    }else{
      console.log(false)
    }
  }



  return (
    <div>
      {poolingDone ? (
        <>
          <div className="border-2 mx-3 rounded-md my-5 shadow-md p-3 border-black relative">
            <div className="text-xl font-semibold bg-indigo-700 rounded-md w-fit px-4 py-1 text-white absolute -top-4">
              Pasteurization Details
            </div>
            <div className="my-4  grid grid-cols-2 font-bold">
              <div className=" grid grid-cols-2 gap-3">
                <p> Batch Name: {pooling?.batchName}</p>
                <div>
                  {pooling?.poolingCondition === 4 ? (
                    <p>Pooling Condition: {"Colostrum"}</p>
                  ) : (
                    gestational?.map((age, index) => {
                      if (age?.gestationalId === pooling?.poolingCondition) {
                        return (
                          <p key={index}>
                            Pooling Condition: {age?.gestationalName}
                          </p>
                        );
                      }
                    })
                  )}
                </div>
                <p>
                  Number of Donor : {pooling?.donorDetailsForPooling?.length}
                </p>
                <p>Total Volume: {pooling?.collectedVolume}</p>
                <p>Expire Date: {pooling?.expireDate}</p>
              </div>
              <div className=" border border-black/30 rounded-md  p-4 relative">
                <div className="text-xl font-semibold bg-indigo-700 rounded-md w-fit px-4 py-1 text-white absolute -top-4">
                  Donor List
                </div>
                <div className="mt-4">
                  {donorDetail.map((item, index) => {
                    return (
                      <div key={index} className="flex items-center gap-4">
                        <p> {index + 1}. </p>
                        <p> {
                          
                        item.donorName
                        } </p>
                        <p>{item.volumeOfMilkPooled} ml</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
          <div className="border-2 mx-3 rounded-md my-5 shadow-md p-3 border-black relative">
            {bottles ? (
              <></>
            ) : (
              <div className="my-4">
                <button
                  className="bg-indigo-600 rounded-md px-3 py-1 font-semibold text-white"
                  onClick={() => onSubmit()}
                >
                  Generate Bottles
                </button>
              </div>
            )}
            <div className="text-xl font-semibold bg-indigo-700 rounded-md w-fit px-4 py-1 text-white absolute -top-4">
              Bottle Details
            </div>
            <div className=" grid grid-cols-1" ref={componentRef}>
              {bottles?.bottleList?.map((item, index) => {
                return (
                  <>
                    <div key={index} className="text-sm h-[377px] w-[566px] ">
                      <div className="flex justify-center">
                        <div>
                          {item?.poolingCondition === 4 ? (
                            <p>PDHM: {"Colostrum"}</p>
                          ) : (
                            gestational?.map((age, index) => {
                              if (
                                age?.gestationalId === item?.poolingCondition
                              ) {
                                return (
                                  <p key={index}>
                                    PDHM: {age?.gestationalName}
                                  </p>
                                );
                              }
                            })
                          )}
                          <p>
                            Batch Id: <span>{item?.name}</span>
                          </p>
                          <p>
                            Volume: <span>{item?.volume}ml</span>
                          </p>
                          <p>
                            Pasteurization Date:{" "}
                            <span>{item?.poolingDate}</span>
                          </p>
                          <p>
                            Expire Date: <span>{item?.expireDate}</span>
                          </p>
                        </div>

                        <div className="h-20 w-20 ">
                          <QRCode
                            size={256}
                            style={{
                              height: "auto",
                              maxWidth: "100%",
                              width: "100%",
                            }}
                            value={JSON.stringify(item)}
                            viewBox={`0 0 256 256`}
                          />
                          {/* <div className="w-10 ">
               <Barcode value={JSON.stringify(item)}   />
                </div> */}
                        </div>
                      </div>
                    </div>
                  </>
                );
              })}
            </div>
            {
              bottle && 
            <div className="flex justify-center items-center mt-8">
              <button className="bg-indigo-600 hover:bg-indigo-700 px-3 py-1.5 rounded-md font-bold text-white" onClick={handlePrint}>
                Print
              </button>
            </div>
            }
          </div>
        </>
      ) : (
        <>
          <div className="min-h-screen flex items-center  justify-center">
            <CircularProgress size={100} />
          </div>
        </>
      )}
    </div>
  );
}
