"use client";
import React, {useEffect, useState} from "react";
import TableBorder from "src/components/TableDesign";
import Link from "next/link";
import Button from "src/components/button";
import {DeleteDonation, GetDonation} from "../../../../../services/apiService/officeService/office";
import Loader from "src/components/Loader";
import {useRouter} from 'next/navigation'

function DonationIndex() {
    const router = useRouter();
    const [apiData, setApiData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true)
            const response = await GetDonation();
            if (response.status === 200) {
                setApiData((response?.data))
                setIsLoading(false);
            }
        }
        fetchData();
    }, [])
    const handleEdit = (id) => {
        router.push(`/office/donation/createDonation/${id}`)
    }
    const handleDelete = async (id) => {
        const hello = await DeleteDonation(id);
        if (hello?.status === 200) {
        setIsLoading(true)
            const response = await GetDonation();
            if (response.status === 200) {
                setApiData(response?.data)
                setIsLoading(false);
            }
        }
    }
    const table =
        <div className="mx-5">

            <TableBorder title={"Donation Place"} title2={
                <div className="flex flex-col   ">
                    <div className=" flex justify-end">
                        <Link href={"/office/donation/createDonation"}>
                            <Button>+Add </Button>
                        </Link>
                    </div>
                </div>
            }>
                <table className={'w-full'}>
                    <tr className="bg-[#004a89] text-white text-lg text-center">
                        <th className=" border border-black px-3 py-1">S.N</th>
                        <th className=" border border-black px-3 py-1">Name</th>
                        <th className=" border border-black px-3 py-1">Action</th>
                    </tr>
                    {
                        apiData?.map((item, index) => {
                            return (
                                <tr key={index}>
                                    <td className="border border-black px-3 py-2">{index + 1}</td>
                                    <td className="border border-black px-3 py-2">{item.name}</td>
                                    <td className="border border-black px-3 py-2">
                                        <div className={'flex gap-3'}>
                                            <button className={'bg-green-600 px-4 py-2 rounded-md text-white'}
                                                    onClick={() => handleEdit(item._id)}>
                                                Edit
                                            </button>
                                            <button className={'bg-red-600 px-4 py-2 rounded-md text-white'}
                                                    onClick={() => handleDelete(item._id)}>
                                                Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </table>
            </TableBorder>
        </div>
    return <>
        {isLoading ? <Loader/> : table}
    </>
}

export default DonationIndex;
