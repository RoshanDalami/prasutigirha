import React from 'react';

data={}

function ExportToExcel() {
    const exportToExcel = () => {
        // Prepare data for export
        const exportData = [];
        
        // Push donor information as the first row
        exportData.push({
            "Donor Reg No": data.donorRegNo,
            "Donor Name": data.donorName,
            "Donor Age": data.donorAge,
            "State ID": data.address.stateId,
            "Contact No": data.contactNo,
            "Mode of Delivery": data.modeOfDelivery,
            "Time": "", // Empty cell for array data
            "Quantity": "", // Empty cell for array data
            "Remaining": "", // Empty cell for array data
            "Temperature": "", // Empty cell for array data
            "Stored By": "", // Empty cell for array data
            "Date": "" // Empty cell for array data
        });

        // Push array data as separate rows
        data.donotedMilkList.forEach(item => {
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
        link.setAttribute("download", "output.csv");
        document.body.appendChild(link); // Required for FF

        // Simulate click to trigger download
        link.click();
    };

    return (
        <div>
            <button onClick={exportToExcel}>Export to Excel</button>
        </div>
    );
}

export default ExportToExcel;