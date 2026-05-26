"use client";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import TableBorder from "src/components/TableDesign";
import TablePagination from "@mui/material/TablePagination";
import { CSVLink } from "react-csv";
import Switch from "@mui/material/Switch";
const label = { inputProps: { "aria-label": "Switch demo" } };
import Loader from "src/components/Loader";
import { useBabyList, useInactiveBabyList, useUpdateBabyStatus } from "src/hooks/useBaby";
import { useGestational } from "src/hooks/useDropdown";

export default function BabyDetail() {
    const router = useRouter();
    const [showActive, setShowActive] = useState(true);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const { data: activeResult = {}, isLoading: activeLoading } = useBabyList(page + 1, rowsPerPage);
    const { data: inactiveResult = {}, isLoading: inactiveLoading } = useInactiveBabyList(page + 1, rowsPerPage);
    const { data: gestationalAgeList = [] } = useGestational();
    const { mutateAsync: toggleStatus } = useUpdateBabyStatus();

    const activeBabyList = activeResult.data ?? [];
    const inactiveBabyList = inactiveResult.data ?? [];
    const babyDetails = showActive ? activeBabyList : inactiveBabyList;
    const totalCount = showActive ? (activeResult.totalCount ?? 0) : (inactiveResult.totalCount ?? 0);
    const isLoading = showActive ? activeLoading : inactiveLoading;

    const handleTabSwitch = (active) => { setShowActive(active); setPage(0); };

    const handleDetail = useCallback(
        (id) => {
            router.push(`/milkRequisation/babyDetails/${id}`);
        },
        [router]
    );

    const excelData = babyDetails?.map((item) => ({
        Baby_Name: item.babyName,
        Date_of_Birth: item.dateOfBaby,
        Gestational_Age: gestationalAgeList?.map((items) => {
            if (item.gestationalAge === items.gestationalId) {
                return items.gestationalName;
            }
        }),
        IP_Number: item.ipNumber,
        Baby_Weight: item.babyWeight,
        Diagnosis: `${item.diagnosis?.[0] ?? ""}`,
        Indication: item.indications?.[0],
        Baby_Status: item.babyStatus,
        Total_Milk_Consumed: item.milkConsumed
    }));

    if (isLoading) return <Loader />;

    return (
        <div className="pt-10 px-10">
            <TableBorder title={"Baby Details Report"} title2={
                <div className={'flex gap-4'}>
                    <button className="bg-indigo-600 rounded-md shadow-md px-3 py-2 text-white">
                        <CSVLink data={excelData} filename="Recipient.csv">
                            Export to Excel
                        </CSVLink>
                    </button>
                    <button
                        onClick={() => handleTabSwitch(true)}
                        className={`px-6 text-white py-2 rounded-md ${showActive ? "bg-green-500" : "bg-indigo-600"}`}
                    >
                        Active Baby
                    </button>
                    <button
                        onClick={() => handleTabSwitch(false)}
                        className={`px-6 py-2 text-white rounded-md ${!showActive ? "bg-green-500" : "bg-indigo-600"}`}
                    >
                        Inactive Baby
                    </button>
                </div>
            }>
                <div>
                    <table className="w-full">
                        <thead>
                        <tr className="bg-[#004a89] text-white text-lg text-center">
                            <td className="py-3">S.No</td>
                            <td className="py-3">Baby Name</td>
                            <td className="py-3">Date of Birth</td>
                            <td className="py-3">Weight</td>
                            <td className="py-3">Indication</td>
                            <td className="py-3">Baby Status</td>
                            <td className="py-3">Milk Consumed</td>
                            <td className="py-3">Action</td>
                            <td className="py-3">Update</td>
                        </tr>
                        </thead>
                        <tbody>
                        {babyDetails?.map((items, index) => (
                            <tr key={index} className="border border-x-gray text-center">
                                <td className="py-3">{page * rowsPerPage + index + 1}</td>
                                <td className="py-3">{items?.babyName}</td>
                                <td className="py-3">{items?.dateOfBaby}</td>
                                <td className="py-3">{items?.babyWeight}</td>
                                <td className="py-3">{items?.indications}</td>
                                <td className="py-3">{items?.babyStatus}</td>
                                <td className="py-3">{items?.milkConsumed}</td>
                                <td className="py-3">
                                    <div className="flex justify-evenly text-xl">
                                        <h1
                                            className="cursor-pointer bg-indigo-600 font-semibold rounded-md text-white px-2 py-1.5"
                                            onClick={() => handleDetail(items._id)}
                                        >
                                            Details
                                        </h1>
                                    </div>
                                </td>
                                <td className="py-3">
                                    <Switch
                                        {...label}
                                        onChange={() => toggleStatus(items._id)}
                                        checked={items?.status}
                                    />
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                    <TablePagination
                        component="div"
                        count={totalCount}
                        page={page}
                        rowsPerPage={rowsPerPage}
                        onPageChange={(_, newPage) => setPage(newPage)}
                        onRowsPerPageChange={(e) => { setRowsPerPage(parseInt(e.target.value)); setPage(0); }}
                        rowsPerPageOptions={[10, 25, 50]}
                    />
                </div>
            </TableBorder>
        </div>
    );
}
