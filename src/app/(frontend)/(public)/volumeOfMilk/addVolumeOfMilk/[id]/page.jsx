"use client";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { urls } from "src/services/apiHelpers";
import AddVolume from "../page";
import DetailSkeleton from "src/components/DetailSkeleton";

const AddVolumeId = () => {
  const { id } = useParams();
  const { data: milkVolume, isLoading } = useQuery({
    queryKey: ["milkVolume", "edit", id],
    queryFn: async () => {
      const { data } = await axios.get(`${urls.getVolumeOfMilk}/${id}`);
      return data;
    },
    enabled: !!id,
  });

  if (isLoading) return <DetailSkeleton gridCols={3} infoRows={6} tableCols={3} tableRows={6} />;
  return <AddVolume clickedData={milkVolume} />;
};
export default AddVolumeId;
