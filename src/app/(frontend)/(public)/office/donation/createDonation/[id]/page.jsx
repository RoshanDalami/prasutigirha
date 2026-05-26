'use client';
import CreateDonation from "../page";
import { useParams } from "next/navigation";
import { useDonationById } from "src/hooks/useOffice";
import Loader from "src/components/Loader";

const EditDonationPage = () => {
    const { id } = useParams();
    const { data: apiData = {}, isLoading } = useDonationById(id);

    if (isLoading) return <Loader />;
    return <CreateDonation clickedDataId={apiData} />;
}

export default EditDonationPage;
