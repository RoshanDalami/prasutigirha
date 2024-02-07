"use client";
import { useEffect, useState } from "react";
import CreateAddDonor from "../page.jsx";
import { urls } from "src/services/apiHelpers.js";
import axios from "axios";
import { useParams } from "next/navigation.js";
const CreateDonorRecordId = () => {
  const { id } = useParams();
  const [donorData, setDonorData] = useState([]);
  
  useEffect(() => {
    async function fetchData() {
      const { data, status } = await axios.get(`${urls.getDonor}/${id}`);
      if (status === 200) {
        setDonorData(data);
      }
    }
    fetchData();
  }, []);
  return (
    <>
      <CreateAddDonor clickedIdData={donorData} />
    </>
  );
};
export default CreateDonorRecordId;
