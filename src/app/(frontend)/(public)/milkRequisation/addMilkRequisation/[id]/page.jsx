'use client'
import AddMilkReq from "../page";
import { urls } from "src/services/apiHelpers";
import axios from 'axios';
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
export default function AddMilkReqId() {
  const {id} = useParams();
  const [apiData,setApiData] = useState({})
  useEffect(()=>{
    async function fetchData(){
      const {data,status} = await axios.get(`${urls.getRequistion}/${id}`);
      if(status === 200){
        setApiData(data)
      }
    }
    fetchData()
  },[id])

  return (
    <>
      {" "}
      <AddMilkReq clickedIdData={apiData}  />{" "}
    </>
  );
}
