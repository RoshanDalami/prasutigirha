'use client'
import React, {useState, useEffect} from 'react';
import {GetAllReport,GetReportDateWise} from "../../../../../services/apiService/report/reportServices";
import {NepaliDatePicker} from "nepali-datepicker-reactjs";
import "nepali-datepicker-reactjs/dist/index.css";
import BikramSambat, {ADToBS, BSToAD} from "bikram-sambat-js";
import Loader from "src/components/Loader";
import toast from "react-hot-toast";

const aa = new BikramSambat(new Date()).toBS();

function ReportPage(props) {
    const [reportData, setReportData] = useState({});
    const [startingDate, setStartingDate] = useState('');
    const [endingDate, setEndingDate] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isSearchLoading, setIsSearchLoading] = useState(false)
    const [isReseting,setIsReseting] = useState(false)
    useEffect(() => {
        setIsLoading(true);
        const fetchData = async () => {
            try {
                const response = await GetAllReport();
                if (response.status === 200) {
                    setReportData(response.data);
                    setIsLoading(false);
                }
            } catch (error) {
                setIsLoading(false);
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        }
        fetchData();
    }, [])

    const handleSearch = async () => {
        setIsSearchLoading(true);
        try{
            const data = {
                startingDate: BSToAD(startingDate),
                endingDate: BSToAD(endingDate)
            }
            const response = await GetReportDateWise(data);
            console.log(response,'data')
            if(response.status === 200){
                setReportData(response.data);
                setIsSearchLoading(false);
                toast.success(response?.message)
            }
        }catch(error){
                toast.error(error.message)
            setIsSearchLoading(false);
        }finally {
            setIsSearchLoading(false);
        }
    }

    const handleReset = async () =>{
                setIsReseting(true);
        try {
            const response = await GetAllReport();
            if (response.status === 200) {
                setReportData(response.data);
                setIsReseting(false);
            }
        } catch (error) {
            setIsReseting(false);
                toast.error(error.message)
        } finally {
            setIsReseting(false);
        }
    }


    if (isLoading) return <Loader/>

    return (<div className={'px-10 py-5'}>

        <div className={'flex items-center gap-5'}>
            <div className={'flex  gap-3 items-center'}>

                <div className={'flex flex-col gap-2'}>
                    <label htmlFor="">Starting Date</label>
                    <NepaliDatePicker
                        inputClassName="form-control  focus:outline-none"
                        value={startingDate}
                        onChange={(e) => setStartingDate(e)}

                        options={{calenderLocale: "en", valueLocale: "en"}}
                        className="inputStyle"
                    />
                </div>
                <div className={'flex flex-col gap-2'}>
                    <label htmlFor=""> Ending Date</label>
                    <NepaliDatePicker
                        inputClassName="form-control  focus:outline-none"
                        value={endingDate}
                        onChange={(e) => setEndingDate(e)}

                        options={{calenderLocale: "en", valueLocale: "en"}}
                        className="inputStyle"
                    />
                </div>
            </div>
            <div className={' flex items-center gap-3 mt-8'}>

                <button disabled={isSearchLoading}  className={'bg-blue-600 px-4 py-2 rounded-lg text-white' +
                    ' disabled:bg-gray-300 disabled:cursor-not-allowed'} onClick={()=>handleSearch()}>{isSearchLoading ? "searching ..." :'Search'}</button>
                <button className={'bg-red-600 px-4 py-2 rounded-lg text-white disabled:bg-gray-300' +
                    ' disabled:cursor-not-allowed'} onClick={()=>handleReset()} disabled={isReseting}>{isReseting ? "resetting ..." :'Reset'}</button>
            </div>
        </div>
        <div>
            <table className={'w-full mt-5'}>
                <thead>
                <th className={'tableBorder'}>Description</th>
                <th className={'tableBorder'}>Count / ML</th>
                </thead>
                <tbody>
                <tr>
                    <td className={'tableBorder'}>
                        Mother Willing to Donate
                    </td>
                    <td className={'tableBorder'}>
                        {reportData?.totalMother}
                    </td>
                </tr>
                <tr>
                    <td className="tableBorder">Total Eligible Donor</td>
                    <td className="tableBorder">{reportData?.eligibleMother}</td>
                </tr>
                <tr>
                    <td className="tableBorder"> Disqualified Donor</td>
                    <td className="tableBorder">{reportData?.disQualifiedMother}</td>
                </tr>

                <tr>
                    <td className="tableBorder text-center font-bold" colSpan={2}>Donor According to Donation House</td>
                </tr>
                 { reportData?.donationHouse?.length > 0 ? reportData?.donationHouse?.map((item, index) => {
                    return (<tr key={index} className={'w-full'}>
                        <td className={'tableBorder'}>{item._id}</td>
                        <td className={'tableBorder'}>{item.count}</td>
                    </tr>)
                }) :  <tr>
                     <td className={'tableBorder text-center text-gray-500'} colSpan={2}>No Data Found !!!</td>
                 </tr>}
                <tr>
                    <td className="tableBorder text-center font-bold" colSpan={2}>Donor Age Wise</td>
                </tr>
                <tr>
                    <td className="tableBorder">Donor Under Twenty Years</td>
                    <td className="tableBorder">{reportData?.donorUnderTwenty}</td>
                </tr>
                <tr>
                    <td className="tableBorder">Donor Between Twenty and Thirty Five Years</td>
                    <td className="tableBorder">{reportData?.donorBetweenTwentyAndThirtyYears}</td>
                </tr>
                <tr>
                    <td className="tableBorder">Donor Above Thirty Five Years</td>
                    <td className="tableBorder">{reportData?.donorAboveThirtyFiveYears}</td>
                </tr>
                <tr>
                    <td className="tableBorder text-center font-bold" colSpan={2}>Milk Collection</td>
                </tr>
                <tr>
                    <td className="tableBorder">Total Milk Collected</td>
                    <td className="tableBorder">{reportData?.totalMilkCollected} {" "} ml</td>
                </tr>
                <tr>
                    <td className="tableBorder">Pre Term Milk Collected</td>
                    <td className="tableBorder">{reportData?.milkCollectedAccordingToGestationalAge?.Preterm}{" "} ml</td>
                </tr>
                <tr>
                    <td className="tableBorder">Term Milk Collected</td>
                    <td className="tableBorder">{reportData?.milkCollectedAccordingToGestationalAge?.Term}{" "} ml</td>
                </tr>
                <tr>
                    <td className="tableBorder">Milk Collected From {'<'}20 years</td>
                    <td className="tableBorder">{reportData?.milkCollectedUnderTwentyYears}{" "} ml</td>
                </tr>
                <tr>
                    <td className="tableBorder">Milk Collected From {">="} 20 and {"<"} 35 years</td>
                    <td className="tableBorder">{reportData?.milkCollectedBetweenTwentyAndThirtyYears} {" "} ml</td>
                </tr>
                <tr>
                    <td className="tableBorder">Milk Collected From {">"} 35 years</td>
                    <td className="tableBorder">{reportData?.milkCollectedAboveThirytFive}{" "} ml</td>
                </tr>
                <tr>
                    <td className="tableBorder text-center font-bold" colSpan={2}>
                        Donor Child Admitted Wise
                    </td>
                </tr>
                {reportData?.donorChildAccordingToAdmitted?.length > 0 ? reportData?.donorChildAccordingToAdmitted?.map((item, index) => {
                    return (<tr key={index}>
                        <td className="tableBorder">{item._id}</td>
                        <td className="tableBorder">{item.count}</td>
                    </tr>)
                }): <tr>
                    <td className={'tableBorder text-center text-gray-500'} colSpan={2}>No Data Found !!!</td>
                </tr>}

                <tr>
                    <td className="tableBorder text-center font-bold " colSpan={2}>Donor Child Condition Wise</td>
                </tr>
                { reportData?.donorChildAccordingToStatus?.length > 0 ?  reportData?.donorChildAccordingToStatus?.map((item, index) => {
                    return (<tr key={index}>
                        <td className="tableBorder">{item._id}</td>
                        <td className="tableBorder">{item.totalDonors}</td>
                    </tr>)
                }) :  <tr>
                    <td className={'tableBorder text-center text-gray-500'} colSpan={2}>No Data Found !!!</td>
                </tr>}
                <tr>
                    <td className="tableBorder text-center font-bold" colSpan={2}>Donor Child Feeding Status Wise</td>
                </tr>
                { reportData?.donorChildAccordingToFeedingStatus?.length > 0 ? reportData?.donorChildAccordingToFeedingStatus?.map((item, index) => {
                    return (<tr key={index}>
                        <td className="tableBorder">{item._id}</td>
                        <td className="tableBorder">{item.count}</td>
                    </tr>)
                }) :  <tr>
                    <td className={'tableBorder text-center text-gray-500'} colSpan={2}>No Data Found !!!</td>
                </tr>}
                <tr>
                    <td className="tableBorder text-center font-bold" colSpan={2}>Disqualified Donor Reason wise</td>
                </tr>
                <tr>
                    <td className="tableBorder"> Due to HIV Positive</td>
                    <td className="tableBorder">{reportData?.disQualifiedHIV}</td>
                </tr>
                <tr>
                    <td className="tableBorder"> Due to HBSAG Positive</td>
                    <td className="tableBorder">{reportData?.disQualifiedHBSAG}</td>
                </tr>
                <tr>
                    <td className="tableBorder"> Due to VDRL Positive</td>
                    <td className="tableBorder">{reportData?.disQualifiedVDRL}</td>
                </tr>

                <tr>
                    <td className="tableBorder text-center font-bold" colSpan={2}>Pasteurization</td>
                </tr>
                <tr>
                    <td className="tableBorder">Total Milk Pasteurized</td>
                    <td className="tableBorder">{reportData?.totalMilkPasturized} {" "}ml</td>
                </tr>
                <tr>
                    <td className="tableBorder">Total Pre term Milk Pasteurized</td>
                    <td className="tableBorder">{reportData?.totalPreTermPasturized} {" "}ml</td>
                </tr>
                <tr>
                    <td className="tableBorder">Total Term Milk Pasteurized</td>
                    <td className="tableBorder">{reportData?.totalTermPasturized} {" "}ml</td>
                </tr>
                <tr>
                    <td className="tableBorder">Total Colostrum Milk Pasteurized</td>
                    <td className="tableBorder">{reportData?.totalColstormPasturized} {" "}ml</td>
                </tr>
                <tr>
                    <td className="tableBorder text-center font-bold" colSpan={2}>Culture Result</td>
                </tr>
                <tr>
                    <td className="tableBorder">Positive Culture</td>
                    <td className="tableBorder">{reportData?.culturePositiveMilk} {" "}ml
                        , {reportData?.culturePositiveMilkPercentage}{" "}{"%"}</td>
                </tr>
                <tr>
                    <td className="tableBorder">Negative Culture</td>
                    <td className="tableBorder">{reportData?.cultureNegativeMilk} {" "}ml
                        , {reportData?.cultureNegativeMilkPercentage}{" "}{"%"}</td>
                </tr>
                <tr>
                    <td className="tableBorder text-center font-bold" colSpan={2}>Milk Requsition</td>
                </tr>
                <tr>
                    <td className="tableBorder">Total Milk Dispense</td>
                    <td className="tableBorder">{reportData?.totalMilkDespense}{" "}ml</td>
                </tr>
                <tr>
                    <td className="tableBorder">Total Pre term milk dispense</td>
                    <td className="tableBorder">{reportData?.sumTotalPreTermRequisitedMilk}{" "}ml</td>
                </tr>
                <tr>
                    <td className="tableBorder">Total Term milk dispense</td>
                    <td className="tableBorder">{reportData?.sumTotalTermRequisitedMilk}{" "}ml</td>
                </tr>
                <tr>
                    <td className="tableBorder">Total Colostrum milk dispense</td>
                    <td className="tableBorder">{reportData?.sumTotalColstormRequisitedMilk}{" "}ml</td>
                </tr>
                <tr>
                    <td className="tableBorder text-center font-bold" colSpan={2}>Milk Dispense According to Baby Status</td>
                </tr>
                {reportData?.totalMilkByStatus?.length > 0 ? reportData?.totalMilkByStatus?.map((item, index) => {
                    return (<tr key={index}>
                        <td className="tableBorder">{item.babyStatus}</td>
                        <td className="tableBorder">{item.totalRequisitedMilk}{" "}ml</td>
                    </tr>)
                }) : <tr>
                    <td className={'tableBorder text-center text-gray-500'} colSpan={2}>No Data Found !!!</td>
                </tr> }
                <tr>
                    <td className="tableBorder text-center font-bold" colSpan={2}> Recipient Diagnosis  Wise</td>
                </tr>
                {reportData?.diagnosisCounts?.length > 0 ? reportData?.diagnosisCounts?.map((item, index) => {
                    return (<tr key={index}>
                        <td className="tableBorder">{item.diagnosis}</td>
                        <td className="tableBorder">{item.count}{" "}</td>
                    </tr>)
                }) :  <tr>
                    <td className={'tableBorder text-center text-gray-500'} colSpan={2}>No Data Found !!!</td>
                </tr>}
                <tr>
                    <td className="tableBorder text-center font-bold" colSpan={2}> Recipient Indication Wise</td>
                </tr>
                { reportData?.indicationCounts?.length > 0 ?  reportData?.indicationCounts?.map((item, index) => {
                    return (<tr key={index}>
                        <td className="tableBorder">{item.indications}</td>
                        <td className="tableBorder">{item.count}{" "}</td>
                    </tr>)
                }) :  <tr>
                    <td className={'tableBorder text-center text-gray-500'} colSpan={2}>No Data Found !!!</td>
                </tr>}

                </tbody>
            </table>
        </div>
    </div>);
}

export default ReportPage;