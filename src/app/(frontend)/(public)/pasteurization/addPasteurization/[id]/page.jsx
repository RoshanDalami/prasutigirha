"use client";
import AddPasteurization from "../page";
import axios from "axios";
import { urls } from "src/services/apiHelpers";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { getPooling } from "src/services/apiService/pasteurization/pasteurization";
export default function AddPasteurizationId() {
  const { id } = useParams();
  const [apiData, setApiData] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const { data, status } = await getPooling(id);
      if (status === 200) {
        setApiData(data);
      }
    }
    fetchData();
  }, [id]);
  return <AddPasteurization clickedIdData={apiData} />;
}
