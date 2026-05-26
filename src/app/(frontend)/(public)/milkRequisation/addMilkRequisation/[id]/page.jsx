'use client'
import AddMilkReq from "../page";
import { useParams } from "next/navigation";
import { useRequisitionById } from "src/hooks/useMilkRequisition";

export default function AddMilkReqId() {
  const { id } = useParams();
  const { data: apiData = {} } = useRequisitionById(id);

  return <AddMilkReq clickedIdData={apiData} />;
}
