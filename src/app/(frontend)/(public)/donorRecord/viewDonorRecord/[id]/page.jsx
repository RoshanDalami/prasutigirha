"use client";
import axios from "axios";
import { useParams } from "next/navigation";
import { useEffect, useState , useRef } from "react";
import TableBorder from "src/components/TableDesign";
import { urls } from "src/services/apiHelpers";
import { getMilkByDonorId } from "src/services/apiService/milkVolume/milkVolume";
import {usePDF} from 'react-to-pdf'
import LoadingSpinner from "src/components/Loading";
export default function Details() {
  const [donorDetails, setDonorDetails] = useState({});
  const [loading,setLoading] = useState(true)
  const { id } = useParams();
  const { toPDF, targetRef } = usePDF({filename: 'page.pdf'});
  useEffect(() => {

    async function fetchData() {
      const { status, data } = await getMilkByDonorId(id);

      if (status === 200) {
        setDonorDetails(data);
        setLoading(false)
      }
    }
    fetchData();
  }, [id]);
  // const excelData = [{
  //   donorName:donorDetails?.donorName,
  //   RegNo:donorDetails?.donorRegNo,
  //   Donor_Age:donorDetails?.donorAge,
  //   Donor_State:donorDetails?.address?.stateId,
    
  // },{
  //   ...donorDetails?.donotedMilkList
  // }]
  const exportToExcel = () => {
    // Prepare data for export
    const exportData = [];
    
    // Push donor information as the first row
    exportData.push({
        "Donor Reg No": donorDetails.donorRegNo,
        "Donor Name": donorDetails.donorName,
        "Donor Age": donorDetails.donorAge,
        "State ID": donorDetails.address.stateId,
        "Contact No": donorDetails.contactNo,
        "Mode of Delivery": donorDetails.modeOfDelivery,
        "Time": "", // Empty cell for array data
        "Quantity": "", // Empty cell for array data
        "Remaining": "", // Empty cell for array data
        "Temperature": "", // Empty cell for array data
        "Stored By": "", // Empty cell for array data
        "Date": "" // Empty cell for array data
    });

    // Push array data as separate rows
    donorDetails.donotedMilkList.forEach(item => {
        exportData.push({
            "Donor Reg No": "",
            "Donor Name": "",
            "Donor Age": "",
            "State ID": "",
            "Contact No": "",
            "Mode of Delivery": "",
            "Time": item.time,
            "Quantity": item.quantity,
            "Remaining": item.remaining,
            "Temperature": item.temp,
            "Stored By": item.storedBy,
            "Date": item.date
        });
    });

    // Convert data to CSV format
    const csvContent = "data:text/csv;charset=utf-8," 
        + Object.keys(exportData[0]).join(',') + '\n'
        + exportData.map(obj => Object.values(obj).join(',')).join('\n');

    // Create a download link
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `${donorDetails.donorName} Details.csv`);
    document.body.appendChild(link); // Required for FF

    // Simulate click to trigger download
    link.click();
};

const [gestationalAgeList, setGestationalAgeList] = useState([]);
useEffect(() => {
  const fetchData = async () => {
    const { data, status } = await axios.get(`${urls.getGestational}`);
    if (status === 200) {
      setGestationalAgeList(data?.data);
    }
  };
  fetchData();
}, []);
const gestationalOptions = gestationalAgeList?.map((item, index) => {
  return (
    <option key={index} value={item.gestationalId}>
      {item.gestationalName}
    </option>
  );
});
console.log(donorDetails,'response')
const local = <div className=" px-10 pt-10 " ref={targetRef}>
<div className="text-lg grid grid-cols-4 gap-5">
  <p className="  text-lg ">
    Donor Name :{" "}
    <span className="font-bold">{donorDetails?.donorName}</span>
  </p>
  <p className=" text-lg">
    Reg No : {" "}<span className="font-bold">{donorDetails?.donorRegNo}{" "}</span>
  </p>
  <p className=" text-lg">
    Donor Age :{" "}
    <span className="font-bold">{donorDetails?.donorAge}</span>
  </p>
  <p>
    Address :{" "}
    <span className="font-bold">{donorDetails?.address?.stateId}</span>
  </p>
  <p>
    Gestational Age : {" "}
    <span className="font-bold">{gestationalAgeList?.map((age, index) => {
                          if (age.gestationalId === donorDetails.gestationalAge) {
                            
                            return (
                              <p className="" key={index}>
                                {age.gestationalName}
                              </p>
                            );
                          }
                        })}</span>
  </p>
  <p>
  Hospital Registration Numbe : {" "}
    <span className="font-bold">{donorDetails?.hosRegNo}</span>
  </p>
  <p>
    Mode of Delivery :{" "}
    <span className="font-bold">{donorDetails?.modeOfDelivery}</span>
  </p>
</div>
<TableBorder
  title={"Donor Details"}
  title2={
    <div className="flex gap-4">

    <button onClick={()=>toPDF()} className="bg-indigo-600 rounded-md shadow-md px-3 py-2 text-white">
      Download PDF
    </button>
    <button onClick={()=>exportToExcel()} className="bg-indigo-600 rounded-md shadow-md px-3 py-2 text-white">
      Export to Excel
    </button>
    </div>
  }
>
  <div>
    <table className="w-full">
      <thead>
        <tr className="bg-[#004a89] text-white text-lg text-center">
          <td className="py-3">S.No</td>
          <td className="py-3">Stored By</td>
          <td className="py-3">Quantity</td>

          <td className="py-3">Time</td>
          <td className="py-3">Date</td>
        </tr>
      </thead>
      <tbody>
        {donorDetails?.donotedMilkList?.map((items, index) => {
          return (
            <tr key={index} className="border border-x-gray text-center">
              <td className="py-3">{index + 1}</td>
              <td className="py-3">{items?.storedBy}</td>
              <td className="py-3">{items?.quantity}</td>

              <td className="py-3">{items?.time}</td>
              <td className="py-3">{items?.date}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  </div>
</TableBorder>
</div>
console.log('CSV file exported successfully!',donorDetails);
  return (
    <>
    {
      loading ? <LoadingSpinner/> : local
    }
    
    </>
  );
}
