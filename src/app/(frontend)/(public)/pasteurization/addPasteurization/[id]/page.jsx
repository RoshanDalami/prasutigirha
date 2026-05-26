"use client";
import AddPasteurization from "../page";
import { useParams } from "next/navigation";
import { usePasteurizationById } from "src/hooks/usePasteurization";
import Loader from "src/components/Loader";

export default function AddPasteurizationId() {
  const { id } = useParams();
  const { data: apiData, isLoading } = usePasteurizationById(id);
  if (isLoading) return <Loader />;
  return <AddPasteurization clickedIdData={apiData} />;
}
