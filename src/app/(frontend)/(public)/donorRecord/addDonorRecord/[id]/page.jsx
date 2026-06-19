"use client";
import { useEffect, useState } from "react";
import CreateAddDonor from "../page.jsx";
import { apiClient, urls } from "src/services/apiHelpers.js";
import { useParams } from "next/navigation.js";
const CreateDonorRecordId = () => {
  const { id } = useParams();
  const [donorData, setDonorData] = useState([]);
  
  useEffect(() => {
    async function fetchData() {
      const { data, status } = await apiClient.get(`${urls.getDonor}/${id}`);
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
