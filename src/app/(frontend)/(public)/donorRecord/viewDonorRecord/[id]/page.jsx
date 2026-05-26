"use client";
import { useParams } from "next/navigation";
import { useRef } from "react";
import TableBorder from "src/components/TableDesign";
import { usePDF } from "react-to-pdf";
import DetailSkeleton from "src/components/DetailSkeleton";
import { useDonorMilkVolume } from "src/hooks/useDonor";
import { useGestational } from "src/hooks/useDropdown";

export default function Details() {
  const { id } = useParams();
  const targetRef = useRef();
  const { toPDF } = usePDF({ filename: "page.pdf" });

  const { data: donorDetails, isLoading } = useDonorMilkVolume(id);
  const { data: gestationalAgeList = [] } = useGestational();

  const exportToExcel = () => {
    const exportData = [];
    exportData.push({
      "Donor Reg No": donorDetails.donorRegNo,
      "Donor Name": donorDetails.donorName,
      "Donor Age": donorDetails.donorAge,
      "State ID": donorDetails.address.stateId,
      "Contact No": donorDetails.contactNo,
      "Mode of Delivery": donorDetails.modeOfDelivery,
      Time: "", Quantity: "", Remaining: "", Temperature: "", "Stored By": "", Date: "",
    });
    donorDetails.donotedMilkList.forEach((item) => {
      exportData.push({
        "Donor Reg No": "", "Donor Name": "", "Donor Age": "", "State ID": "",
        "Contact No": "", "Mode of Delivery": "",
        Time: item.time, Quantity: item.quantity, Remaining: item.remaining,
        Temperature: item.temp, "Stored By": item.storedBy, Date: item.date,
      });
    });
    const csvContent =
      "data:text/csv;charset=utf-8," +
      Object.keys(exportData[0]).join(",") + "\n" +
      exportData.map((obj) => Object.values(obj).join(",")).join("\n");
    const link = document.createElement("a");
    link.setAttribute("href", encodeURI(csvContent));
    link.setAttribute("download", `${donorDetails.donorName} Details.csv`);
    document.body.appendChild(link);
    link.click();
  };

  if (isLoading) return <DetailSkeleton gridCols={4} infoRows={8} tableCols={5} tableRows={8} />;

  return (
    <div className="px-10 pt-10" ref={targetRef}>
      <div className="text-lg grid grid-cols-4 gap-5">
        <p className="text-lg">Donor Name : <span className="font-bold">{donorDetails?.donorName}</span></p>
        <p className="text-lg">Reg No : <span className="font-bold">{donorDetails?.donorRegNo}</span></p>
        <p className="text-lg">Donor Age : <span className="font-bold">{donorDetails?.donorAge}</span></p>
        <p>Address : <span className="font-bold">{donorDetails?.address?.stateId}</span></p>
        <p>
          Gestational Age :{" "}
          <span className="font-bold">
            {gestationalAgeList?.map((age, index) => {
              if (age.gestationalId === donorDetails?.gestationalAge) {
                return <p key={index}>{age.gestationalName}</p>;
              }
            })}
          </span>
        </p>
        <p>Hospital Registration Number : <span className="font-bold">{donorDetails?.hosRegNo}</span></p>
        <p>Mode of Delivery : <span className="font-bold">{donorDetails?.modeOfDelivery}</span></p>
        {donorDetails?.remarks && (
          <p>Remarks : <span className="font-bold">{donorDetails?.remarks}</span></p>
        )}
        {donorDetails?.discardDate && (
          <p>Discard Date : <span className="font-bold">{donorDetails?.discardDate}</span></p>
        )}
      </div>
      <TableBorder
        title={"Donor Details"}
        title2={
          <div className="flex gap-4">
            <button onClick={() => toPDF()} className="bg-indigo-600 rounded-md shadow-md px-3 py-2 text-white">
              Download PDF
            </button>
            <button onClick={exportToExcel} className="bg-indigo-600 rounded-md shadow-md px-3 py-2 text-white">
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
              {donorDetails?.donotedMilkList?.map((items, index) => (
                <tr
                  key={index}
                  className={`border border-x-gray text-center ${items.isDiscarded ? "bg-red-300" : ""}`}
                >
                  <td className="py-3">{index + 1}</td>
                  <td className="py-3">{items?.storedBy}</td>
                  <td className="py-3">{items?.quantity}</td>
                  <td className="py-3">{items?.time}</td>
                  <td className="py-3">{items?.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </TableBorder>
    </div>
  );
}
