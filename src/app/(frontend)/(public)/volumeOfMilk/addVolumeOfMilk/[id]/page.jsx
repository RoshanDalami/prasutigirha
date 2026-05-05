"use client";
import { useEffect, useState } from "react";
import AddVolume from "../page";
import { urls } from "src/services/apiHelpers";
import { useParams } from "next/navigation";
import axios from "axios";
const AddVolumeId = () => {
  const [milkVolume, setMilkVolume] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    async function fetchData() {
      const { data, status } = await axios.get(`${urls.getVolumeOfMilk}/${id}`);
      if (status === 200) {
        setMilkVolume(data);
      }
    }
    fetchData();
  }, [id]);
  console.log(milkVolume, "response");
  return <AddVolume clickedData={milkVolume} />;
};
export default AddVolumeId;
