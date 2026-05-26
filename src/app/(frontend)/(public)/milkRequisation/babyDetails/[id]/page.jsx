"use client";
import { useParams } from "next/navigation";
import TableBorder from "src/components/TableDesign";
import DetailSkeleton from "src/components/DetailSkeleton";
import { useBabyById } from "src/hooks/useBaby";

function combineQuantities(array) {
  const combinedMap = new Map();
  array?.forEach((item) => {
    const key = `${item.batchNumber}-${item.bottleName}`;
    if (combinedMap.has(key)) {
      combinedMap.get(key).quantity += item.quantity;
    } else {
      combinedMap.set(key, { ...item });
    }
  });
  return Array.from(combinedMap.values());
}

export default function BabyDetailsById() {
  const { id } = useParams();
  const { data: babyDetails, isLoading } = useBabyById(id);

  const exportToExcel = () => {
    const exportData = [];
    exportData.push({
      "Baby Name": babyDetails.babyName,
      "Date of Birth": babyDetails.dateOfBaby,
      "Gestational Age": babyDetails?.gestationalAge,
      "Baby Weight": babyDetails?.babyWeight,
      "Batch No": "", "Quantity": "", "Bottle Name": "", "Feeding Date": "",
    });
    babyDetails?.milkComsumedDetail?.forEach((item) => {
      exportData.push({
        "Baby Name": "", "Date of Birth": "", "Gestational Age": "", "Baby Weight": "",
        "Batch No": item?.batchNumber?.split("/")[1] + " " + "(" + (`${item?.batchNumber?.split("/")[2]}`) + ")",
        "Quantity": item?.quantity,
        "Bottle Name": item?.bottleName?.split("/")[1],
        "Feeding Date": item?.feedingDate,
      });
    });
    const csvContent =
      "data:text/csv;charset=utf-8," +
      Object.keys(exportData[0]).join(",") + "\n" +
      exportData.map((obj) => Object.values(obj).join(",")).join("\n");
    const link = document.createElement("a");
    link.setAttribute("href", encodeURI(csvContent));
    link.setAttribute("download", `${babyDetails.babyName} Details.csv`);
    document.body.appendChild(link);
    link.click();
  };

  if (isLoading) return <DetailSkeleton gridCols={4} infoRows={4} tableCols={4} tableRows={8} />;

  const newArray = combineQuantities(babyDetails?.milkComsumedDetail);

  return (
    <div className="px-10 pt-10">
      <div className="flex justify-between text-lg leading-9">
        <p>Baby Name : <span className="font-bold">{babyDetails?.babyName}</span></p>
        <p>Date of Birth : <span className="font-bold">{babyDetails?.dateOfBaby}</span></p>
        <p>Gestational Age : <span className="font-bold">{babyDetails?.gestationalAge}</span></p>
        <p>IP Number : <span className="font-bold">{babyDetails?.ipNumber}</span></p>
        <p>Baby Weight : <span className="font-bold">{babyDetails?.babyWeight}</span></p>
      </div>
      <TableBorder
        title={"Donor Details"}
        title2={
          <button onClick={exportToExcel} className="bg-indigo-600 rounded-md shadow-md px-3 py-2 text-white">
            Export to Excel
          </button>
        }
      >
        <div>
          <table className="w-full">
            <thead>
              <tr className="bg-[#004a89] text-white text-lg text-center">
                <td className="py-3">S.No</td>
                <td className="py-3">Batch No.</td>
                <td className="py-3">Quantity</td>
                <td className="py-3">Bottle Name</td>
                <td className="py-3">Feeding Date</td>
              </tr>
            </thead>
            <tbody>
              {newArray?.map((items, index) => (
                <tr key={index} className="border border-x-gray text-center">
                  <td className="py-3">{index + 1}</td>
                  <td className="py-3">{items?.batchNumber?.split("/")[1]} {`(${items?.batchNumber?.split("/")[2]})`}</td>
                  <td className="py-3">{items?.quantity}</td>
                  <td className="py-3">{items?.bottleName?.split("/")[1]}</td>
                  <td className="py-3">{items?.feedingDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </TableBorder>
    </div>
  );
}
