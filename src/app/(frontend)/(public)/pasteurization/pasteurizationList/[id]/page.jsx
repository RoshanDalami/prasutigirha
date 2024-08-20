"use client";
import React, {useEffect, useRef, useState} from "react";
import {useParams} from "next/navigation";
import {urls} from "src/services/apiHelpers";
import axios from "axios";
import {updateBottleStatus} from 'src/services/apiService/bottle/bottleServices'
import QRCode from "react-qr-code";
import CircularProgress from "@mui/material/CircularProgress";
import {useReactToPrint} from "react-to-print";
import Modal from 'src/components/Modal'
export default function BottleDetails() {
    const {id} = useParams();
    const [pooling, setPooling] = useState({});
    const [poolingDone, setPoolingDone] = useState(false);
    useEffect(() => {
        async function fetchData() {
            const {data} = await axios.get(`${urls.getPoolingById}/${id}`);
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
                const {data, status} = await axios.get(`${urls.getBottle}/${id}`);
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
                const {data, status} = await axios.get(`${urls.getGestational}`);
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
                const {data, status} = await axios.get(`${urls.getBottle}/${id}`);
                if (data?.status === 200) {
                    setBottles(data?.data);
                }
            }
        } catch (error) {
        }
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

    function combineVolumes(array) {
        // Create a map to hold combined items
        const combinedMap = new Map();

        array?.forEach(item => {
            const key = item.donorId;
            if (combinedMap.has(key)) {
                // If the item exists, sum the volumes
                combinedMap.get(key).volumeOfMilkPooled += item.volumeOfMilkPooled;
            } else {
                // If it doesn't exist, add the item to the map
                combinedMap.set(key, {...item});
            }
        });

        // Convert the map values back to an array
        return Array.from(combinedMap.values());
    }

    const donorDetail = combineVolumes(pooling?.donorDetailsForPooling)

const [openModel,setOpenModel] = useState(false);
    const [discardId,setDiscardId] = useState('');
    const [currentStatus,setCurrentStatus] = useState(false);

const discardModelHandler = (id,status)=>{
    setOpenModel(true);
    setDiscardId(id);
    setCurrentStatus(status);
}
const handleDiscard = async() => {
try{
    const response = await updateBottleStatus(discardId);
    if(response?.status === 200){
        setOpenModel(false);
        const {data, status} = await axios.get(`${urls.getBottle}/${id}`);
        if (data?.status === 200) {
            setBottles(data?.data);
        }
    }
}catch(error){
    console.log(error);
}
}

    return (
        <div>
            {
                openModel ? <Modal>
                    <div className="bg-white rounded-md px-10 py-6">
                        <div className={'flex items-center justify-center my-4'}>
                            <h1 className={'text-xl font-bold'}>Are you sure ?</h1>
                        </div>
                        <div className="flex justify-end gap-6 text-white">
                            <button className={'bg-gray-300 rounded-md px-6 py-2 hover:bg-gray-400'} type={"button"} onClick={()=>setOpenModel(false)} >Cancel</button>
                            <button className={'bg-red-600 rounded-md px-6 py-2 hover:bg-red-700'} type={"button"} onClick={()=> handleDiscard()} >{ currentStatus ? "Discard" : "Reactive" }</button>
                        </div>
                    </div>
                </Modal> : <></>
            }
            {poolingDone ? (
                <>
                    <div className="border-2 mx-3 rounded-md my-5 shadow-md p-3 border-black relative">
                        <div
                            className="text-xl font-semibold bg-indigo-700 rounded-md w-fit px-4 py-1 text-white absolute -top-4">
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
                                    Number of Donor : {donorDetail?.length}
                                </p>
                                <p>Total Volume: {pooling?.collectedVolume}</p>
                                <p>Expire Date: {pooling?.expireDate}</p>
                            </div>
                            <div className=" border border-black/30 rounded-md  p-4 relative">
                                <div
                                    className="text-xl font-semibold bg-indigo-700 rounded-md w-fit px-4 py-1 text-white absolute -top-4">
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
                        <div
                            className="text-xl font-semibold bg-indigo-700  rounded-md w-fit px-4 py-1 text-white absolute -top-4">
                            Bottle Details
                        </div>
                        <div className={"flex items-center justify-around px-8 mt-5 "}>
                      {/*discard section*/}

                            <div className={'flex flex-col gap-3'}>
                                {bottles?.bottleList?.map((bottle, index) => {
                                    return (
                                        <div key={index} className={` ${bottle?.remainingVoluem == 0 ? 'bg-red-300':''} ${bottle?.isActive === false ? 'bg-red-600 text-white ' : ''}  flex items-center gap-3  bg-gray-200 px-3 py-2  rounded-md`}>
                                            <div className={''}>
                                                <p>
                                                    Batch Id:
                                                    <span>{bottle?.name}</span>
                                                </p>
                                                <p>
                                                    Volume:
                                                    <span>{bottle?.volume}ml</span>
                                                </p>
                                                <p>
                                                    Pasteurization Date:{" "}
                                                    <span>{bottle?.poolingDate}</span>
                                                </p>
                                                <p>
                                                    Expire Date: <span>{bottle?.expireDate}</span>
                                                </p>

                                            </div>
                                            <div>
                                                <button
                                                    onClick={() => discardModelHandler(bottle?._id,bottle?.isActive)}
                                                    className={'bg-indigo-600 text-white px-3 py-2 rounded-md '} type={'button'} > { bottle?.isActive ? "Discard" : "Reactive "}
                                                </button>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                          {/*print section */}
                            <div>

                                <div className="flex flex-col items-center justify-center" ref={componentRef}>
                                    {bottles?.bottleList?.filter(item=>item.isActive === true)?.map((item, index) => {
                                        return (
                                            <>
                                                <div key={index} className="text-[8px] p-1 mt-2"
                                                     style={{width: "189px", height: "85px"}}
                                                >
                                                    <div className="flex justify-between items-center ">
                                                        <div className="">
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

                                                        <div className="mx-1 my-2 h-16 w-16">
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
                                                            <div className="flex items-center justify-center">
                                                                <span className="text-[14px]">PMWH</span>
                                                            </div>
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
                                        <button
                                            className="bg-indigo-600 hover:bg-indigo-700 px-3 py-1.5 rounded-md font-bold text-white"
                                            onClick={handlePrint}>
                                            Print
                                        </button>
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                </>
            ) : (
                <>
                    <div className="min-h-screen flex items-center  justify-center">
                        <CircularProgress size={100}/>
                    </div>
                </>
            )}
        </div>
    );
}
