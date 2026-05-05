'use client';
import {useEffect, useState} from 'react'
import {GetDonationById} from "../../../../../../../services/apiService/officeService/office";
import CreateDonation from "../page";
import {useParams} from "next/navigation";
import Loader from "../../../../../../../components/Loader";

const EditDonationPage = () => {
    const [apiData, setApiData] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const {id} = useParams();

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true)
            const response = await GetDonationById(id);

            if (response.status === 200) {
                setApiData(response?.data);
                setIsLoading(false)
            }
        }
        fetchData();
    }, [id])
    const content = <div>
        <CreateDonation clickedDataId={apiData}/>
    </div>
    return (
        <>
            {isLoading ? <Loader/> : content}
        </>
    )


}
y
export default EditDonationPage;
