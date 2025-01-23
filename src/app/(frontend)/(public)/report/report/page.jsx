'use client'
import React, {useState, useEffect, useRef} from 'react';
import {GetAllReport, GetReportDateWise} from "../../../../../services/apiService/report/reportServices";
import {NepaliDatePicker} from "nepali-datepicker-reactjs";
import "nepali-datepicker-reactjs/dist/index.css";
import BikramSambat, {BSToAD} from "bikram-sambat-js";
import Loader from "src/components/Loader";
import toast from "react-hot-toast";
import {
    Document,
    Packer,
    Paragraph,
    TextRun,
    Table,
    TableRow,
    TableCell,
    AlignmentType,
    WidthType,
    PageBreak
} from 'docx';
import {saveAs} from 'file-saver';
import {usePDF} from "react-to-pdf";

const aa = new BikramSambat(new Date()).toBS();

function ReportPage(props) {
    const [reportData, setReportData] = useState({});
    const [startingDate, setStartingDate] = useState('');
    const [endingDate, setEndingDate] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isSearchLoading, setIsSearchLoading] = useState(false)
    const [isReseting, setIsReseting] = useState(false)
    const {toPDF, targetRef} = usePDF({filename: 'report.pdf'});
    const pdfRef = useRef()
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
        try {
            const data = {
                startingDate: BSToAD(startingDate), endingDate: BSToAD(endingDate)
            }
            const response = await GetReportDateWise(data);
            console.log(response, 'data')
            if (response.status === 200) {
                setReportData(response.data);
                setIsSearchLoading(false);
                toast.success(response?.message)
            }
        } catch (error) {
            toast.error(error.message)
            setIsSearchLoading(false);
        } finally {
            setIsSearchLoading(false);
        }
    }

    const handleReset = async () => {
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


    const generateNewDocument = async () => {
        // Ensure reportData exists
        if (!reportData) {
            console.error('Report data is missing.');
            return;
        }

        // Create a new Document
        const doc = new Document({
            sections: [{
                children: [// Title of the report with larger font size
                    new Paragraph({
                        children: [new TextRun({
                            text: "Amrit Kosh Report", bold: true, size: 32, // Larger font size for the title
                            underline: true, // Underline for emphasis
                        }),], alignment: AlignmentType.CENTER, // Center-align the title
                        spacing: {after: 400}, // Space below the title
                    }),

                    // Total Mother data with bold label
                    new Paragraph({
                        children: [new TextRun({
                            text: `Total Mother: ${reportData?.totalMother || 'N/A'}`, bold: true,
                        }),], spacing: {after: 300},

                    }),


                    // Eligible Donor data with bold label
                    new Paragraph({
                        children: [new TextRun({
                            text: `Eligible Donor: ${reportData?.eligibleMother || 'N/A'}`, bold: true,
                        }),], spacing: {after: 300},
                    }),

                    // Disqualified Donor data with bold label
                    new Paragraph({
                        children: [new TextRun({
                            text: `Disqualified Donor: ${reportData?.disQualifiedMother || 'N/A'}`, bold: true,
                        }),], spacing: {after: 300},
                    }),

                    // Donor According to Donation House section with a table
                    new Paragraph({
                        children: [new TextRun({
                            text: "Donor According to Donation House", bold: true, size: 24,
                        }),], spacing: {after: 300},
                    }),

                    new Paragraph(""),

                    new Table({
                        rows: [// Header row with bold text
                            new TableRow({
                                children: [new TableCell({
                                    children: [new Paragraph('Donation House')],
                                    width: {size: 50, type: WidthType.PERCENTAGE},
                                }), new TableCell({
                                    children: [new Paragraph('Donor Count')],
                                    width: {size: 50, type: WidthType.PERCENTAGE},
                                }),], tableHeader: true, // Header row
                            }), // Data rows
                            ...(reportData?.donationHouse?.length > 0 ? reportData.donationHouse.map((item) => new TableRow({
                                children: [new TableCell({
                                    children: [new Paragraph(item._id || 'N/A')],
                                }), new TableCell({
                                    children: [new Paragraph(`${item.count} `)],
                                }),],
                            })) : [new TableRow({
                                children: [new TableCell({
                                    children: [new Paragraph('No data available')],
                                }), new TableCell({
                                    children: [new Paragraph('N/A')],
                                }),],
                            }),]),], borders: {top: {size: 2}, bottom: {size: 2}, left: {size: 1}, right: {size: 1}}, // Table border
                        width: {size: 100, type: WidthType.PERCENTAGE},
                    }),

                    // Donor Age Wise section with a table
                    new Paragraph({
                        children: [new TextRun({
                            text: "Donor Age Wise", bold: true, size: 24,
                        }),], spacing: {after: 300},
                    }),

                    new Table({
                        rows: [new TableRow({
                            children: [new TableCell({
                                children: [new Paragraph('Age Group')], width: {size: 50, type: WidthType.PERCENTAGE},
                            }), new TableCell({
                                children: [new Paragraph('Count')], width: {size: 50, type: WidthType.PERCENTAGE},
                            }),], tableHeader: true,
                        }), new TableRow({
                            children: [new TableCell({
                                children: [new Paragraph('Under 20 years')],
                            }), new TableCell({
                                children: [new Paragraph(`${reportData?.donorUnderTwenty || '0'} `)],
                            }),],
                        }), new TableRow({
                            children: [new TableCell({
                                children: [new Paragraph('Between 20 to 35 years')],
                            }), new TableCell({
                                children: [new Paragraph(`${reportData?.donorBetweenTwentyAndThirtyYears || '0'} `)],
                            }),],
                        }), new TableRow({
                            children: [new TableCell({
                                children: [new Paragraph('Above 35 years')],
                            }), new TableCell({
                                children: [new Paragraph(`${reportData?.donorAboveThirtyFiveYears || '0'} `)],
                            }),],
                        }),],
                        borders: {top: {size: 2}, bottom: {size: 2}, left: {size: 1}, right: {size: 1}},
                        width: {size: 100, type: WidthType.PERCENTAGE},
                    }),

                    // Volume of Milk Collected section with a table
                    new Paragraph({
                        children: [new TextRun({
                            text: "Volume of Milk Collected", bold: true, size: 24,
                        }),], spacing: {after: 300},
                    }),

                    new Table({
                        rows: [new TableRow({
                            children: [new TableCell({
                                children: [new Paragraph('Milk Type')],
                            }), new TableCell({
                                children: [new Paragraph('Amount (ml)')],
                            }),], tableHeader: true,
                        }), new TableRow({
                            children: [new TableCell({
                                children: [new Paragraph('Total Milk Collected')],
                            }), new TableCell({
                                children: [new Paragraph(`${reportData?.totalMilkCollected || '0'} ml`)],
                            }),],
                        }), new TableRow({
                            children: [new TableCell({
                                children: [new Paragraph('Preterm Milk Collected')],
                            }), new TableCell({
                                children: [new Paragraph(`${reportData?.milkCollectedAccordingToGestationalAge?.Preterm || '0'} ml`)],
                            }),],
                        }), new TableRow({
                            children: [new TableCell({
                                children: [new Paragraph('Term Milk Collected')],
                            }), new TableCell({
                                children: [new Paragraph(`${reportData?.milkCollectedAccordingToGestationalAge?.Term || '0'} ml`)],
                            }),],
                        }), new TableRow({
                            children: [new TableCell({
                                children: [new Paragraph("Milk Collected From < 20 years")]
                            }), new TableCell({
                                children: [new Paragraph(`${reportData?.milkCollectedUnderTwentyYears || '0'} ml `)]
                            })]
                        }), new TableRow({
                            children: [new TableCell({
                                children: [new Paragraph("Milk Collected From >= 20 and < 35 years")]
                            }), new TableCell({
                                children: [new Paragraph(`${reportData?.milkCollectedBetweenTwentyAndThirtyYears || '0'} ml `)]
                            })]
                        }), new TableRow({
                            children: [new TableCell({
                                children: [new Paragraph("Milk Collected From > 35 years")]
                            }), new TableCell({
                                children: [new Paragraph(`${reportData?.milkCollectedAboveThirytFive || '0'} ml `)]
                            })]
                        }),

                        ],
                        borders: {top: {size: 2}, bottom: {size: 2}, left: {size: 1}, right: {size: 1}},
                        width: {size: 100, type: WidthType.PERCENTAGE},
                    }),

                    new Paragraph({
                        children: [new TextRun({
                            text: "Donor Child Admitted Wise", bold: true, size: 24,
                        })]
                    }),

                    new Table({
                        rows: [new TableRow({
                            children: [new TableCell({
                                children: [new Paragraph("Admitted Child")],
                                width: {size: 50, type: WidthType.PERCENTAGE}
                            }), new TableCell({
                                children: [new Paragraph("Count")], width: {size: 50, type: WidthType.PERCENTAGE}
                            })], tableHeader: true
                        }), ...(reportData?.donorChildAccordingToAdmitted?.length > 0 ? reportData?.donorChildAccordingToAdmitted?.map((item) => new TableRow({
                            children: [new TableCell({
                                children: [new Paragraph(item._id)]
                            }), new TableCell({
                                children: [new Paragraph(`${item.count}`)]
                            })]
                        })) : [new TableRow({
                            children: [new TableCell({
                                children: [new Paragraph('No data available')],
                            }), new TableCell({
                                children: [new Paragraph('N/A')],
                            }),],
                        }),])

                        ], borders: {top: {size: 2}, bottom: {size: 2}, left: {size: 1}, right: {size: 1}}, // Table border
                        width: {size: 100, type: WidthType.PERCENTAGE},

                    }), new Paragraph({
                        children: [new TextRun({
                            text: "Donor Child Condition  Wise", bold: true, size: 24,
                        })]
                    }),

                    new Table({
                        rows: [new TableRow({
                            children: [new TableCell({
                                children: [new Paragraph("Child Condition")],
                                width: {size: 50, type: WidthType.PERCENTAGE}
                            }), new TableCell({
                                children: [new Paragraph("Count")], width: {size: 50, type: WidthType.PERCENTAGE}
                            })], tableHeader: true
                        }), ...(reportData?.donorChildAccordingToStatus?.length > 0 ? reportData?.donorChildAccordingToStatus?.map((item) => new TableRow({
                            children: [new TableCell({
                                children: [new Paragraph(item._id)]
                            }), new TableCell({
                                children: [new Paragraph(`${item.totalDonors}`)]
                            })]
                        })) : [new TableRow({
                            children: [new TableCell({
                                children: [new Paragraph('No data available')],
                            }), new TableCell({
                                children: [new Paragraph('N/A')],
                            }),],
                        }),])

                        ], borders: {top: {size: 2}, bottom: {size: 2}, left: {size: 1}, right: {size: 1}}, // Table border
                        width: {size: 100, type: WidthType.PERCENTAGE},

                    }), new Paragraph({
                        children: [new TextRun({
                            text: "Donor Child Feeding Status  Wise", bold: true, size: 24,
                        })]
                    }),

                    new Table({
                        rows: [new TableRow({
                            children: [new TableCell({
                                children: [new Paragraph("Child Feeding Status")],
                                width: {size: 50, type: WidthType.PERCENTAGE}
                            }), new TableCell({
                                children: [new Paragraph("Count")], width: {size: 50, type: WidthType.PERCENTAGE}
                            })], tableHeader: true
                        }), ...(reportData?.donorChildAccordingToFeedingStatus?.length > 0 ? reportData?.donorChildAccordingToFeedingStatus?.map((item) => new TableRow({
                            children: [new TableCell({
                                children: [new Paragraph(item._id)]
                            }), new TableCell({
                                children: [new Paragraph(`${item.count}`)]
                            })]
                        })) : [new TableRow({
                            children: [new TableCell({
                                children: [new Paragraph('No data available')],
                            }), new TableCell({
                                children: [new Paragraph('N/A')],
                            }),],
                        }),])

                        ], borders: {top: {size: 2}, bottom: {size: 2}, left: {size: 1}, right: {size: 1}}, // Table border
                        width: {size: 100, type: WidthType.PERCENTAGE},

                    }),

                    new Paragraph({
                        children: [new TextRun({
                            text: "Disqualified Donor Serology Reason Wise", bold: true, size: 24,
                        })]
                    }),


                    new Table({
                        rows: [new TableRow({
                            children: [new TableCell({
                                children: [new Paragraph('Reason')],
                            }), new TableCell({
                                children: [new Paragraph('Count')],
                            }),], tableHeader: true,
                        }), new TableRow({
                            children: [new TableCell({
                                children: [new Paragraph('HIV Positive')],
                            }), new TableCell({
                                children: [new Paragraph(`${reportData?.disQualifiedHIV || '0'}`)],
                            }),],
                        }), new TableRow({
                            children: [new TableCell({
                                children: [new Paragraph('HBSAG Positive')],
                            }), new TableCell({
                                children: [new Paragraph(`${reportData?.disQualifiedHBSAG || '0'}`)],
                            }),],
                        }), new TableRow({
                            children: [new TableCell({
                                children: [new Paragraph('Term Milk Collected')],
                            }), new TableCell({
                                children: [new Paragraph(`${reportData?.disQualifiedVDRL || '0'}`)],
                            }),],
                        }),],
                        borders: {top: {size: 2}, bottom: {size: 2}, left: {size: 1}, right: {size: 1}},
                        width: {size: 100, type: WidthType.PERCENTAGE},
                    }),


                    new Paragraph({
                        children: [new TextRun({
                            text: "Pasteurization Summary", bold: true, size: 24,
                        })]
                    }),


                    new Table({
                        rows: [new TableRow({
                            children: [new TableCell({
                                children: [new Paragraph('Description')],
                            }), new TableCell({
                                children: [new Paragraph('ML')],
                            }),], tableHeader: true,
                        }), new TableRow({
                            children: [new TableCell({
                                children: [new Paragraph('Total Milk Pasteurized')],
                            }), new TableCell({
                                children: [new Paragraph(`${reportData?.totalMilkPasturized || '0'} ml`)],
                            }),],
                        }), new TableRow({
                            children: [new TableCell({
                                children: [new Paragraph('Total Pre term Pasteurized')],
                            }), new TableCell({
                                children: [new Paragraph(`${reportData?.totalPreTermPasturized || '0'} ml`)],
                            }),],
                        }), new TableRow({
                            children: [new TableCell({
                                children: [new Paragraph('Total Term Pasteurized')],
                            }), new TableCell({
                                children: [new Paragraph(`${reportData?.totalTermPasturized || '0'} ml`)],
                            }),],
                        }), new TableRow({
                            children: [new TableCell({
                                children: [new Paragraph('Total Colostrum Pasteurized')],
                            }), new TableCell({
                                children: [new Paragraph(`${reportData?.totalColstormPasturized || '0'} ml`)],
                            }),],
                        }),],
                        borders: {top: {size: 2}, bottom: {size: 2}, left: {size: 1}, right: {size: 1}},
                        width: {size: 100, type: WidthType.PERCENTAGE},
                    })

                    ,

                    new Paragraph({
                        children: [new TextRun({
                            text: "Culture Report Summary", bold: true, size: 24,
                        })]
                    }),


                    new Table({
                        rows: [new TableRow({
                            children: [new TableCell({
                                children: [new Paragraph('Description')],
                            }), new TableCell({
                                children: [new Paragraph('Count / Percentage')],
                            }),], tableHeader: true,
                        }), new TableRow({
                            children: [new TableCell({
                                children: [new Paragraph('Culture Positive Milk')],
                            }), new TableCell({
                                children: [new Paragraph(`${reportData?.culturePositiveMilk || '0'} ml / ${reportData?.culturePositiveMilkPercentage || 0} % `)],
                            }),],
                        }), new TableRow({
                            children: [new TableCell({
                                children: [new Paragraph('Culture Negitive Milk')],
                            }), new TableCell({
                                children: [new Paragraph(`${reportData?.cultureNegativeMilk || '0'} ml / ${reportData?.cultureNegativeMilkPercentage || 0} % `)],
                            }),],
                        }),

                        ],
                        borders: {top: {size: 2}, bottom: {size: 2}, left: {size: 1}, right: {size: 1}},
                        width: {size: 100, type: WidthType.PERCENTAGE},
                    }), new Paragraph({
                        children: [new TextRun({
                            text: "Milk Dispense Summary", bold: true, size: 24,
                        })]
                    }),


                    new Table({
                        rows: [new TableRow({
                            children: [new TableCell({
                                children: [new Paragraph('Description')],
                            }), new TableCell({
                                children: [new Paragraph('ML')],
                            }),], tableHeader: true,
                        }), new TableRow({
                            children: [new TableCell({
                                children: [new Paragraph('Total Milk Dispense')],
                            }), new TableCell({
                                children: [new Paragraph(`${reportData?.totalMilkDespense || '0'} ml `)],
                            }),],
                        }), new TableRow({
                            children: [new TableCell({
                                children: [new Paragraph('Culture Pre term milk dispense')],
                            }), new TableCell({
                                children: [new Paragraph(`${reportData?.sumTotalPreTermRequisitedMilk || '0'} ml  `)],
                            }),],
                        }), new TableRow({
                            children: [new TableCell({
                                children: [new Paragraph('Culture Term milk dispense')],
                            }), new TableCell({
                                children: [new Paragraph(`${reportData?.sumTotalTermRequisitedMilk || '0'} ml  `)],
                            }),],
                        }), new TableRow({
                            children: [new TableCell({
                                children: [new Paragraph('Culture Colostrum  milk dispense')],
                            }), new TableCell({
                                children: [new Paragraph(`${reportData?.sumTotalColstormRequisitedMilk || '0'} ml  `)],
                            }),],
                        }),

                        ],
                        borders: {top: {size: 2}, bottom: {size: 2}, left: {size: 1}, right: {size: 1}},
                        width: {size: 100, type: WidthType.PERCENTAGE},
                    }),


                    new Paragraph({
                        children: [new TextRun({
                            text: "Milk Dispense Summary According to Baby Status", bold: true, size: 24,
                        })]
                    }),

                    new Table({
                        rows: [new TableRow({
                            children: [new TableCell({
                                children: [new Paragraph("Baby  Status")], width: {size: 50, type: WidthType.PERCENTAGE}
                            }), new TableCell({
                                children: [new Paragraph("ML")], width: {size: 50, type: WidthType.PERCENTAGE}
                            })], tableHeader: true
                        }), ...(reportData?.totalMilkByStatus?.length > 0 ? reportData?.totalMilkByStatus?.map((item) => new TableRow({
                            children: [new TableCell({
                                children: [new Paragraph(item.babyStatus)]
                            }), new TableCell({
                                children: [new Paragraph(`${item.totalRequisitedMilk} ml `)]
                            })]
                        })) : [new TableRow({
                            children: [new TableCell({
                                children: [new Paragraph('No data available')],
                            }), new TableCell({
                                children: [new Paragraph('N/A')],
                            }),],
                        }),]),], borders: {top: {size: 2}, bottom: {size: 2}, left: {size: 1}, right: {size: 1}}, // Table border
                        width: {size: 100, type: WidthType.PERCENTAGE},

                    }),


                    new Paragraph({
                        children: [new TextRun({
                            text: "Recipient Summary Diagnosis Wise", bold: true, size: 24,
                        })]
                    }),

                    new Table({
                        rows: [new TableRow({
                            children: [new TableCell({
                                children: [new Paragraph("Diagnosis")], width: {size: 50, type: WidthType.PERCENTAGE}
                            }), new TableCell({
                                children: [new Paragraph("Count")], width: {size: 50, type: WidthType.PERCENTAGE}
                            })], tableHeader: true
                        }), ...(reportData?.diagnosisCounts?.length > 0 ? reportData?.diagnosisCounts?.map((item) => new TableRow({
                            children: [new TableCell({
                                children: [new Paragraph(item.diagnosis)]
                            }), new TableCell({
                                children: [new Paragraph(`${item.count} `)]
                            })]
                        })) : [new TableRow({
                            children: [new TableCell({
                                children: [new Paragraph('No data available')],
                            }), new TableCell({
                                children: [new Paragraph('N/A')],
                            }),],
                        }),]),


                        ], borders: {top: {size: 2}, bottom: {size: 2}, left: {size: 1}, right: {size: 1}}, // Table border
                        width: {size: 100, type: WidthType.PERCENTAGE},

                    }),

                    new Paragraph({
                        children: [new TextRun({
                            text: "Recipient Summary Indication  Wise", bold: true, size: 24,
                        })]
                    }),

                    new Table({
                        rows: [new TableRow({
                            children: [new TableCell({
                                children: [new Paragraph("Indication")], width: {size: 50, type: WidthType.PERCENTAGE}
                            }), new TableCell({
                                children: [new Paragraph("Count")], width: {size: 50, type: WidthType.PERCENTAGE}
                            })], tableHeader: true
                        }), ...(reportData?.indicationCounts?.length > 0 ? reportData?.indicationCounts?.map((item) => new TableRow({
                            children: [new TableCell({
                                children: [new Paragraph(item.indications)]
                            }), new TableCell({
                                children: [new Paragraph(`${item.count} `)]
                            })]
                        })) : [new TableRow({
                            children: [new TableCell({
                                children: [new Paragraph('No data available')],
                            }), new TableCell({
                                children: [new Paragraph('N/A')],
                            }),],
                        }),]),


                        ], borders: {top: {size: 2}, bottom: {size: 2}, left: {size: 1}, right: {size: 1}}, // Table border
                        width: {size: 100, type: WidthType.PERCENTAGE},

                    }),


                ],
            },],
        });

        // Generate the .docx file
        const blob = await Packer.toBlob(doc);

        // Download the file
        saveAs(blob, "amritkosh_report.docx");
    };


    const generateNewDocumentSecond = async () => {
        // Ensure reportData exists
        if (!reportData) {
            console.error('Report data is missing.');
            return;
        }

        // Create a new Document
        const doc = new Document({
            sections: [{
                children: [// Title of the report
                    new Paragraph({
                        children: [new TextRun({
                            text: "Amrit Kosh Report", bold: true, size: 32, underline: true,
                        })], alignment: AlignmentType.CENTER, spacing: {after: 400},
                    }),

                    // Single table for all data
                    new Table({
                        rows: [// Table header
                            new TableRow({
                                children: [new TableCell({
                                    children: [new Paragraph({
                                        alignment: AlignmentType.CENTER, children: [new TextRun({
                                            text: "Description", bold: true, size: 24,
                                        })]
                                    })], width: {size: 50, type: WidthType.PERCENTAGE}, margins: {
                                        top: 200, // 200 twips = 10 points = 0.14 inches
                                        bottom: 200, left: 200, right: 200,
                                    }
                                }), new TableCell({
                                    children: [new Paragraph({
                                        alignment: AlignmentType.CENTER, children: [new TextRun({
                                            text: 'Count / ML', bold: true, size: 24,
                                        })]
                                    })], width: {size: 50, type: WidthType.PERCENTAGE}, margins: {
                                        top: 200, // 200 twips = 10 points = 0.14 inches
                                        bottom: 200, left: 200, right: 200,
                                    }
                                }),], tableHeader: true, alignment: AlignmentType.CENTER, borders: {
                                    top: {size: 2, color: "000000"},
                                    bottom: {size: 2, color: "000000"},
                                    left: {size: 2, color: "000000"},
                                    right: {size: 2, color: "000000"},


                                }
                            }),

                            // Mother Willing to Donate
                            new TableRow({
                                children: [new TableCell({children: [new Paragraph('Mother Willing to Donate')]}), new TableCell({
                                    children: [new Paragraph(`${reportData?.totalMother || 'N/A'}`)], margins: {
                                        top: 200, // 200 twips = 10 points = 0.14 inches
                                        bottom: 200, left: 200, right: 200,
                                    },
                                }),], borders: {
                                    top: {size: 2, color: "000000"},
                                    bottom: {size: 2, color: "000000"},
                                    left: {size: 2, color: "000000"},
                                    right: {size: 2, color: "000000"},


                                }
                            }),

                            // Total Eligible Donor
                            new TableRow({
                                children: [new TableCell({children: [new Paragraph('Total Eligible Donor')]}), new TableCell({
                                    children: [new Paragraph(`${reportData?.eligibleMother || 'N/A'}`)], margins: {
                                        top: 200, // 200 twips = 10 points = 0.14 inches
                                        bottom: 200, left: 200, right: 200,
                                    },
                                }),], borders: {
                                    top: {size: 2, color: "000000"},
                                    bottom: {size: 2, color: "000000"},
                                    left: {size: 2, color: "000000"},
                                    right: {size: 2, color: "000000"},


                                }
                            }),

                            // Disqualified Donor
                            new TableRow({
                                children: [new TableCell({children: [new Paragraph('Disqualified Donor')]}), new TableCell({
                                    children: [new Paragraph(`${reportData?.disQualifiedMother || 'N/A'}`)], margins: {
                                        top: 200, // 200 twips = 10 points = 0.14 inches
                                        bottom: 200, left: 200, right: 200,
                                    },
                                }),], borders: {
                                    top: {size: 2, color: "000000"},
                                    bottom: {size: 2, color: "000000"},
                                    left: {size: 2, color: "000000"},
                                    right: {size: 2, color: "000000"},


                                }
                            }),

                            // Section Header: Donor According to Donation House
                            new TableRow({
                                children: [new TableCell({
                                    children: [new Paragraph({
                                        alignment: AlignmentType.CENTER, children: [new TextRun({
                                            text: 'Donor According to Donation House', bold: true
                                        })]

                                    })], columnSpan: 2,

                                    margins: {
                                        top: 200, // 200 twips = 10 points = 0.14 inches
                                        bottom: 200, left: 200, right: 200,
                                    },


                                }),],
                            }),

                            // Donor According to Donation House Data
                            ...(reportData?.donationHouse?.length > 0 ? reportData.donationHouse.map((item) => new TableRow({
                                children: [new TableCell({
                                    children: [new Paragraph(item._id || 'N/A')], margins: {
                                        top: 200, // 200 twips = 10 points = 0.14 inches
                                        bottom: 200, left: 200, right: 200,
                                    },
                                }), new TableCell({
                                    children: [new Paragraph(`${item.count}`)], margins: {
                                        top: 200, // 200 twips = 10 points = 0.14 inches
                                        bottom: 200, left: 200, right: 200,
                                    },
                                }),],
                            })) : [new TableRow({
                                children: [new TableCell({
                                    children: [new Paragraph({
                                        text: 'No Data Found !!!', alignment: AlignmentType.CENTER
                                    })]

                                }, {
                                    columnSpan: 2, margins: {
                                        top: 200, // 200 twips = 10 points = 0.14 inches
                                        bottom: 200, left: 200, right: 200,
                                    },
                                }),],
                            })]),

                            // Section Header: Donor Age Wise
                            new TableRow({
                                children: [new TableCell({
                                    children: [new Paragraph({
                                        alignment: AlignmentType.CENTER, children: [new TextRun({
                                            text: 'Donor Age Wise', bold: true
                                        })]
                                    })], columnSpan: 2, margins: {
                                        top: 200, // 200 twips = 10 points = 0.14 inches
                                        bottom: 200, left: 200, right: 200,
                                    }
                                }),],
                            }),

                            // Donor Age Wise Data
                            new TableRow({
                                children: [new TableCell({
                                    children: [new Paragraph('Donor Under Twenty Years')], margins: {
                                        top: 200, // 200 twips = 10 points = 0.14 inches
                                        bottom: 200, left: 200, right: 200,
                                    },
                                }), new TableCell({
                                    children: [new Paragraph(`${reportData?.donorUnderTwenty || '0'}`)], margins: {
                                        top: 200, // 200 twips = 10 points = 0.14 inches
                                        bottom: 200, left: 200, right: 200,
                                    },
                                }),],
                            }), new TableRow({
                                children: [new TableCell({
                                    children: [new Paragraph('Donor Between Twenty and Thirty' + ' Five Years')],
                                    margins: {
                                        top: 200, // 200 twips = 10 points = 0.14 inches
                                        bottom: 200, left: 200, right: 200,
                                    },
                                }), new TableCell({
                                    children: [new Paragraph(`${reportData?.donorBetweenTwentyAndThirtyYears || '0'}`)],
                                    margins: {
                                        top: 200, // 200 twips = 10 points = 0.14 inches
                                        bottom: 200, left: 200, right: 200,
                                    },
                                }),],
                            }), new TableRow({
                                children: [new TableCell({
                                    children: [new Paragraph('Donor Above Thirty Five Years')], margins: {
                                        top: 200, // 200 twips = 10 points = 0.14 inches
                                        bottom: 200, left: 200, right: 200,
                                    },
                                }), new TableCell({children: [new Paragraph(`${reportData?.donorAboveThirtyFiveYears || '0'}`)]}),],
                            }),

                            // Section Header: Milk Collection
                            new TableRow({
                                children: [new TableCell({
                                    children: [new Paragraph({
                                        alignment: AlignmentType.CENTER, children: [new TextRun({
                                            text: 'Milk Collection', bold: true
                                        })]

                                    })], columnSpan: 2, margins: {
                                        top: 200, // 200 twips = 10 points = 0.14 inches
                                        bottom: 200, left: 200, right: 200,
                                    },
                                }),],
                            }),

                            // Milk Collection Data
                            new TableRow({
                                children: [new TableCell({
                                    children: [new Paragraph('Total Milk Collected')], margins: {
                                        top: 200, // 200 twips = 10 points = 0.14 inches
                                        bottom: 200, left: 200, right: 200,
                                    },
                                }), new TableCell({
                                    children: [new Paragraph(`${reportData?.totalMilkCollected || '0'} ml`)], margins: {
                                        top: 200, // 200 twips = 10 points = 0.14 inches
                                        bottom: 200, left: 200, right: 200,
                                    },
                                }),],
                            }), new TableRow({
                                children: [new TableCell({
                                    children: [new Paragraph('Pre Term Milk Collected')], margins: {
                                        top: 200, // 200 twips = 10 points = 0.14 inches
                                        bottom: 200, left: 200, right: 200,
                                    },
                                }), new TableCell({
                                    children: [new Paragraph(`${reportData?.milkCollectedAccordingToGestationalAge?.Preterm || '0'} ml`)],
                                    margins: {
                                        top: 200, // 200 twips = 10 points = 0.14 inches
                                        bottom: 200, left: 200, right: 200,
                                    },
                                }),],
                            }), new TableRow({
                                children: [new TableCell({
                                    children: [new Paragraph('Term Milk Collected')], margins: {
                                        top: 200, // 200 twips = 10 points = 0.14 inches
                                        bottom: 200, left: 200, right: 200,
                                    },
                                }), new TableCell({
                                    children: [new Paragraph(`${reportData?.milkCollectedAccordingToGestationalAge?.Term || '0'} ml`)],
                                    margins: {
                                        top: 200, // 200 twips = 10 points = 0.14 inches
                                        bottom: 200, left: 200, right: 200,
                                    },
                                }),],
                            }), new TableRow({
                                children: [new TableCell({
                                    children: [new Paragraph('Milk Collected From <20 years')], margins: {
                                        top: 200, // 200 twips = 10 points = 0.14 inches
                                        bottom: 200, left: 200, right: 200,
                                    },
                                }), new TableCell({
                                    children: [new Paragraph(`${reportData?.milkCollectedUnderTwentyYears || '0'} ml`)],
                                    margins: {
                                        top: 200, // 200 twips = 10 points = 0.14 inches
                                        bottom: 200, left: 200, right: 200,
                                    },
                                }),],
                            }), new TableRow({
                                children: [new TableCell({
                                    children: [new Paragraph('Milk Collected From >= 20 and <' + ' 35 years')],
                                    margins: {
                                        top: 200, // 200 twips = 10 points = 0.14 inches
                                        bottom: 200, left: 200, right: 200,
                                    },

                                }), new TableCell({
                                    children: [new Paragraph(`${reportData?.milkCollectedBetweenTwentyAndThirtyYears || '0'} ml`)],
                                    margins: {
                                        top: 200, // 200 twips = 10 points = 0.14 inches
                                        bottom: 200, left: 200, right: 200,
                                    },
                                }),],
                            }), new TableRow({
                                children: [new TableCell({
                                    children: [new Paragraph('Milk Collected From > 35 years')], margins: {
                                        top: 200, // 200 twips = 10 points = 0.14 inches
                                        bottom: 200, left: 200, right: 200,
                                    },
                                }), new TableCell({
                                    children: [new Paragraph(`${reportData?.milkCollectedAboveThirytFive || '0'} ml`)],

                                    margins: {
                                        top: 200, // 200 twips = 10 points = 0.14 inches
                                        bottom: 200, left: 200, right: 200,
                                    },
                                }),],
                            }),

                            // Section Header: Donor According to Donation House
                            new TableRow({
                                children: [new TableCell({
                                    children: [new Paragraph({

                                        alignment: AlignmentType.CENTER, // Center alignment for the paragraph
                                        children: [

                                            new TextRun({
                                            text: 'Donor Child Admitted Wise', bold: true, // Make the text bold
                                        }),],
                                    }),], columnSpan: 2, // Span the column across 2 cells
                                    margins: {
                                        top: 200, // 200 twips = 10 points = 0.14 inches
                                        bottom: 200, left: 200, right: 200,
                                    },
                                }),],
                            }),

                            // Donor According to Donation House Data
                            ...(reportData?.donorChildAccordingToAdmitted?.length > 0 ? reportData.donorChildAccordingToAdmitted.map((item) => new TableRow({
                                children: [new TableCell({
                                    children: [new Paragraph(item._id || 'N/A')], margins: {
                                        top: 200, // 200 twips = 10 points = 0.14 inches
                                        bottom: 200, left: 200, right: 200,
                                    },
                                }), new TableCell({
                                    children: [new Paragraph(`${item.count}`)], margins: {
                                        top: 200, // 200 twips = 10 points = 0.14 inches
                                        bottom: 200, left: 200, right: 200,
                                    },
                                }),],
                            })) : [new TableRow({
                                children: [new TableCell({
                                    children: [new Paragraph({
                                        text: 'No Data Found !!!', alignment: AlignmentType.CENTER
                                    })]
                                }, {columnSpan: 2}),],
                            })]), // Section Header: Donor According to Donation House
                            new TableRow({
                                children: [new TableCell({
                                    children: [new Paragraph({
                                        alignment: AlignmentType.CENTER, children: [new TextRun({
                                            text: 'Donor Child Condition Wise', bold: true
                                        })]
                                    })], columnSpan: 2, margins: {
                                        top: 200, // 200 twips = 10 points = 0.14 inches
                                        bottom: 200, left: 200, right: 200,
                                    },
                                }),],
                            }),

                            // Donor According to Donation House Data
                            ...(reportData?.donorChildAccordingToStatus?.length > 0 ? reportData.donorChildAccordingToStatus.map((item) => new TableRow({
                                children: [new TableCell({
                                    children: [new Paragraph(item._id || 'N/A')], margins: {
                                        top: 200, // 200 twips = 10 points = 0.14 inches
                                        bottom: 200, left: 200, right: 200,
                                    },
                                }), new TableCell({
                                    children: [new Paragraph(`${item.totalDonors}`)], margins: {
                                        top: 200, // 200 twips = 10 points = 0.14 inches
                                        bottom: 200, left: 200, right: 200,
                                    },
                                }),],
                            })) : [new TableRow({
                                children: [new TableCell({
                                    children: [new Paragraph({
                                        text: 'No Data Found !!!', alignment: AlignmentType.CENTER
                                    })]
                                }, {columnSpan: 2}),],
                            })]),

                            new TableRow({
                                children: [new TableCell({
                                    children: [new Paragraph({
                                        alignment: AlignmentType.CENTER, children: [new TextRun({
                                            text: 'Donor Child Feeding Status Wise', bold: true
                                        })]
                                    })], columnSpan: 2, margins: {
                                        top: 200, // 200 twips = 10 points = 0.14 inches
                                        bottom: 200, left: 200, right: 200,
                                    },
                                }),],
                            }),

                            // Donor According to Donation House Data
                            ...(reportData?.donorChildAccordingToFeedingStatus?.length > 0 ? reportData.donorChildAccordingToFeedingStatus.map((item) => new TableRow({
                                children: [new TableCell({
                                    children: [new Paragraph(item._id || 'N/A')], margins: {
                                        top: 200, // 200 twips = 10 points = 0.14 inches
                                        bottom: 200, left: 200, right: 200,
                                    },
                                }), new TableCell({
                                    children: [new Paragraph(`${item.count}`)], margins: {
                                        top: 200, // 200 twips = 10 points = 0.14 inches
                                        bottom: 200, left: 200, right: 200,
                                    },
                                }),],
                            })) : [new TableRow({
                                children: [new TableCell({
                                    children: [new Paragraph({
                                        text: 'No Data Found !!!', alignment: AlignmentType.CENTER
                                    })]
                                }, {columnSpan: 2}),],
                            })]),

                            new TableRow({
                                children: [new TableCell({
                                    children: [new Paragraph({
                                        alignment: AlignmentType.CENTER, children: [new TextRun({
                                            text: 'Disqualified Donor Reason wise', bold: true
                                        })]
                                    })], columnSpan: 2, margins: {
                                        top: 200, // 200 twips = 10 points = 0.14 inches
                                        bottom: 200, left: 200, right: 200,
                                    },
                                }),],
                            }),

                            // Milk Collection Data
                            new TableRow({
                                children: [new TableCell({
                                    children: [new Paragraph('Due to HIV Positive')], margins: {
                                        top: 200, // 200 twips = 10 points = 0.14 inches
                                        bottom: 200, left: 200, right: 200,
                                    },
                                }), new TableCell({
                                    children: [new Paragraph(`${reportData?.disQualifiedHIV || '0'} `)], margins: {
                                        top: 200, // 200 twips = 10 points = 0.14 inches
                                        bottom: 200, left: 200, right: 200,
                                    },
                                }),],
                            }), new TableRow({
                                children: [new TableCell({
                                    children: [new Paragraph('Due to HBSAG Positive')], margins: {
                                        top: 200, // 200 twips = 10 points = 0.14 inches
                                        bottom: 200, left: 200, right: 200,
                                    },
                                }), new TableCell({
                                    children: [new Paragraph(`${reportData?.disQualifiedHBSAG || '0'} `)], margins: {
                                        top: 200, // 200 twips = 10 points = 0.14 inches
                                        bottom: 200, left: 200, right: 200,
                                    },
                                }),],
                            }), new TableRow({
                                children: [new TableCell({
                                    children: [new Paragraph('Due to VDRL Positive')], margins: {
                                        top: 200, // 200 twips = 10 points = 0.14 inches
                                        bottom: 200, left: 200, right: 200,
                                    },
                                }), new TableCell({
                                    children: [new Paragraph(`${reportData?.disQualifiedVDRL || '0'} `)], margins: {
                                        top: 200, // 200 twips = 10 points = 0.14 inches
                                        bottom: 200, left: 200, right: 200,
                                    },
                                }),],
                            }),

                            new TableRow({
                                children: [new TableCell({
                                    children: [new Paragraph({
                                        alignment: AlignmentType.CENTER, children: [new TextRun({
                                            text: 'Donor Child Condition Wise', bold: true
                                        })]
                                    })], columnSpan: 2, margins: {
                                        top: 200, // 200 twips = 10 points = 0.14 inches
                                        bottom: 200, left: 200, right: 200,
                                    },

                                }),],
                            }),

                            // Milk Collection Data
                            new TableRow({
                                children: [new TableCell({
                                    children: [new Paragraph('Total Milk Pasteurized')], margins: {
                                        top: 200, // 200 twips = 10 points = 0.14 inches
                                        bottom: 200, left: 200, right: 200,
                                    },
                                }), new TableCell({
                                    children: [new Paragraph(`${reportData?.totalMilkPasturized || '0'} ml `)],
                                    margins: {
                                        top: 200, // 200 twips = 10 points = 0.14 inches
                                        bottom: 200, left: 200, right: 200,
                                    },
                                }),],
                            }), new TableRow({
                                children: [new TableCell({
                                    children: [new Paragraph('Total Pre term Milk Pasteurized')], margins: {
                                        top: 200, // 200 twips = 10 points = 0.14 inches
                                        bottom: 200, left: 200, right: 200,
                                    },
                                }), new TableCell({
                                    children: [new Paragraph(`${reportData?.totalPreTermPasturized || '0'} ml `)],
                                    margins: {
                                        top: 200, // 200 twips = 10 points = 0.14 inches
                                        bottom: 200, left: 200, right: 200,
                                    },
                                }),],
                            }), new TableRow({
                                children: [new TableCell({
                                    children: [new Paragraph('Total Term Milk Pasteurized')], margins: {
                                        top: 200, // 200 twips = 10 points = 0.14 inches
                                        bottom: 200, left: 200, right: 200,
                                    },
                                }), new TableCell({
                                    children: [new Paragraph(`${reportData?.totalTermPasturized || '0'} ml `)],
                                    margins: {
                                        top: 200, // 200 twips = 10 points = 0.14 inches
                                        bottom: 200, left: 200, right: 200,
                                    },
                                }),],
                            }), new TableRow({
                                children: [new TableCell({
                                    children: [new Paragraph('Total Colostrum Milk Pasteurized')], margins: {
                                        top: 200, // 200 twips = 10 points = 0.14 inches
                                        bottom: 200, left: 200, right: 200,
                                    },
                                }), new TableCell({
                                    children: [new Paragraph(`${reportData?.totalColstormPasturized || '0'} ml `)],
                                    margins: {
                                        top: 200, // 200 twips = 10 points = 0.14 inches
                                        bottom: 200, left: 200, right: 200,
                                    },
                                }),],
                            }),

                            new TableRow({
                                children: [new TableCell({
                                    children: [new Paragraph({
                                        alignment: AlignmentType.CENTER, children: [new TextRun({
                                            text: 'Culture Result', bold: true
                                        })]
                                    })], columnSpan: 2, margins: {
                                        top: 200, // 200 twips = 10 points = 0.14 inches
                                        bottom: 200, left: 200, right: 200,
                                    },
                                }),],
                            }),

                            // Milk Collection Data
                            new TableRow({
                                children: [new TableCell({
                                    children: [new Paragraph('Positive Culture')], margins: {
                                        top: 200, // 200 twips = 10 points = 0.14 inches
                                        bottom: 200, left: 200, right: 200,
                                    },
                                }), new TableCell({
                                    children: [new Paragraph(`${reportData?.culturePositiveMilk || '0'} ml , ${reportData?.culturePositiveMilkPercentage || '0'} % `)],
                                    margins: {
                                        top: 200, // 200 twips = 10 points = 0.14 inches
                                        bottom: 200, left: 200, right: 200,
                                    },
                                }),],
                            }), new TableRow({
                                children: [new TableCell({
                                    children: [new Paragraph('Negative Culture')], margins: {
                                        top: 200, // 200 twips = 10 points = 0.14 inches
                                        bottom: 200, left: 200, right: 200,
                                    },
                                }), new TableCell({
                                    children: [new Paragraph(`${reportData?.cultureNegativeMilk || '0'} ml , ${reportData?.cultureNegativePercentage || '0'} %`)],
                                    margins: {
                                        top: 200, // 200 twips = 10 points = 0.14 inches
                                        bottom: 200, left: 200, right: 200,
                                    },
                                }),],
                            }),

                            new TableRow({
                                children: [new TableCell({
                                    children: [

                                        new Paragraph({
                                        alignment: AlignmentType.CENTER, children: [new TextRun({
                                            text: 'Milk Requsition', bold: true
                                        })]
                                    })], columnSpan: 2, margins: {
                                        top: 200, // 200 twips = 10 points = 0.14 inches
                                        bottom: 200, left: 200, right: 200,
                                    },
                                }),],
                            }),

                            // Milk Collection Data
                            new TableRow({
                                children: [new TableCell({
                                    children: [new Paragraph('Total Milk Dispense')], margins: {
                                        top: 200, // 200 twips = 10 points = 0.14 inches
                                        bottom: 200, left: 200, right: 200,
                                    },
                                }), new TableCell({
                                    children: [new Paragraph(`${reportData?.totalMilkDespense || '0'} ml `)], margins: {
                                        top: 200, // 200 twips = 10 points = 0.14 inches
                                        bottom: 200, left: 200, right: 200,
                                    },
                                }),],
                            }), new TableRow({
                                children: [new TableCell({
                                    children: [new Paragraph('Total Pre term milk dispense')], margins: {
                                        top: 200, // 200 twips = 10 points = 0.14 inches
                                        bottom: 200, left: 200, right: 200,
                                    },
                                }), new TableCell({
                                    children: [new Paragraph(`${reportData?.sumTotalPreTermRequisitedMilk || '0'} ml `)],
                                    margins: {
                                        top: 200, // 200 twips = 10 points = 0.14 inches
                                        bottom: 200, left: 200, right: 200,
                                    },
                                }),],
                            }), new TableRow({
                                children: [new TableCell({
                                    children: [new Paragraph('Total Term milk dispense')], margins: {
                                        top: 200, // 200 twips = 10 points = 0.14 inches
                                        bottom: 200, left: 200, right: 200,
                                    },
                                }), new TableCell({
                                    children: [new Paragraph(`${reportData?.sumTotalTermRequisitedMilk || '0'} ml `)],
                                    margins: {
                                        top: 200, // 200 twips = 10 points = 0.14 inches
                                        bottom: 200, left: 200, right: 200,
                                    },
                                }),],
                            }), new TableRow({
                                children: [new TableCell({
                                    children: [new Paragraph('Total Colostrum milk dispense')], margins: {
                                        top: 200, // 200 twips = 10 points = 0.14 inches
                                        bottom: 200, left: 200, right: 200,
                                    },
                                }), new TableCell({
                                    children: [new Paragraph(`${reportData?.sumTotalColstormRequisitedMilk || '0'} ml `)],
                                    margins: {
                                        top: 200, // 200 twips = 10 points = 0.14 inches
                                        bottom: 200, left: 200, right: 200,
                                    },
                                }),],
                            }),

                            new TableRow({
                                children: [new TableCell({
                                    children: [new Paragraph({
                                        alignment: AlignmentType.CENTER, children: [new TextRun({
                                            text: 'Milk Dispense According to Baby Status\n', bold: true
                                        })]
                                    })], columnSpan: 2, margins: {
                                        top: 200, // 200 twips = 10 points = 0.14 inches
                                        bottom: 200, left: 200, right: 200,
                                    },
                                }),],
                            }),

                            // Donor According to Donation House Data
                            ...(reportData?.totalMilkByStatus?.length > 0 ? reportData.totalMilkByStatus.map((item) => new TableRow({
                                children: [new TableCell({
                                    children: [new Paragraph(item.babyStatus || 'N/A')], margins: {
                                        top: 200, // 200 twips = 10 points = 0.14 inches
                                        bottom: 200, left: 200, right: 200,
                                    },
                                }), new TableCell({
                                    children: [new Paragraph(`${item.totalRequisitedMilk} ml`)], margins: {
                                        top: 200, // 200 twips = 10 points = 0.14 inches
                                        bottom: 200, left: 200, right: 200,
                                    },
                                }),],
                            })) : [new TableRow({
                                children: [new TableCell({
                                    children: [new Paragraph({
                                        text: 'No Data Found !!!', alignment: AlignmentType.CENTER
                                    })]
                                }, {columnSpan: 2}),],
                            })]), new TableRow({
                                children: [new TableCell({
                                    children: [

                                        new Paragraph({
                                        alignment: AlignmentType.CENTER, children: [new TextRun({
                                            text: 'Recipient Diagnosis Wise', bold: true
                                        })]
                                    })], columnSpan: 2, margins: {
                                        top: 200, // 200 twips = 10 points = 0.14 inches
                                        bottom: 200, left: 200, right: 200,
                                    },
                                }),],
                            }),

                            // Donor According to Donation House Data
                            ...(reportData?.diagnosisCounts?.length > 0 ? reportData.diagnosisCounts.map((item) => new TableRow({
                                children: [new TableCell({
                                    children: [new Paragraph(item.diagnosis || 'N/A')], margins: {
                                        top: 200, // 200 twips = 10 points = 0.14 inches
                                        bottom: 200, left: 200, right: 200,
                                    },
                                }), new TableCell({
                                    children: [new Paragraph(`${item.count}`)], margins: {
                                        top: 200, // 200 twips = 10 points = 0.14 inches
                                        bottom: 200, left: 200, right: 200,
                                    },
                                }),],
                            })) : [new TableRow({
                                children: [new TableCell({
                                    children: [new Paragraph({
                                        text: 'No Data Found !!!', alignment: AlignmentType.CENTER
                                    })]
                                }, {columnSpan: 2}),],
                            })]), new TableRow({
                                children: [new TableCell({
                                    children: [new Paragraph({
                                        alignment: AlignmentType.CENTER, children: [new TextRun({
                                            text: 'Recipient Indication Wise', bold: true
                                        })]
                                    })], columnSpan: 2, margins: {
                                        top: 200, // 200 twips = 10 points = 0.14 inches
                                        bottom: 200, left: 200, right: 200,
                                    },
                                }),],
                            }),

                            // Donor According to Donation House Data
                            ...(reportData?.indicationCounts?.length > 0 ? reportData.indicationCounts.map((item) => new TableRow({
                                children: [new TableCell({
                                    children: [new Paragraph(item.indications || 'N/A')], margins: {
                                        top: 200, // 200 twips = 10 points = 0.14 inches
                                        bottom: 200, left: 200, right: 200,
                                    },
                                }), new TableCell({
                                    children: [new Paragraph(`${item.count}`)], margins: {
                                        top: 200, // 200 twips = 10 points = 0.14 inches
                                        bottom: 200, left: 200, right: 200,
                                    },
                                }),],
                            })) : [new TableRow({
                                children: [new TableCell({
                                    children: [new Paragraph({
                                        text: 'No Data Found !!!', alignment: AlignmentType.CENTER
                                    })]
                                }, {columnSpan: 2}),],
                            })]),


                        ], borders: {
                            top: {size: 2, color: "000000"},
                            bottom: {size: 2, color: "000000"},
                            left: {size: 2, color: "000000"},
                            right: {size: 2, color: "000000"},
                        }, width: {size: 100, type: WidthType.PERCENTAGE},

                    }),],
            }],
        });

        // Generate the .docx file
        const blob = await Packer.toBlob(doc);

        // Download the file
        saveAs(blob, "amritkosh_report_single_table.docx");
    };

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

                <button disabled={isSearchLoading}
                        className={'bg-blue-600 px-4 py-2 rounded-lg text-white' + ' disabled:bg-gray-300 disabled:cursor-not-allowed'}
                        onClick={() => handleSearch()}>{isSearchLoading ? "searching ..." : 'Search'}</button>
                <button
                    className={'bg-red-600 px-4 py-2 rounded-lg text-white disabled:bg-gray-300' + ' disabled:cursor-not-allowed'}
                    onClick={() => handleReset()}
                    disabled={isReseting}>{isReseting ? "resetting ..." : 'Reset'}</button>
            </div>
        </div>
        <div className={'flex items-center gap-5 mt-5 justify-end'}>
            <button className={'bg-blue-600 px-6 py-2 rounded-lg text-white'}
                    onClick={() => generateNewDocumentSecond()}>Download Word File
            </button>
            <button className={'bg-blue-600 px-6 py-2 rounded-lg text-white'}
                    onClick={() => toPDF()}>Download PDF
            </button>

        </div>
        <div ref={targetRef} className={'printMargin p-10 page-break'}>
            <table className={'w-full  print:px-10 print:py-5 '}>
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
                {reportData?.donationHouse?.length > 0 ? reportData?.donationHouse?.map((item, index) => {
                    return (<tr key={index} className={'w-full'}>
                        <td className={'tableBorder'}>{item._id}</td>
                        <td className={'tableBorder'}>{item.count}</td>
                    </tr>)
                }) : <tr>
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
                }) : <tr>
                    <td className={'tableBorder text-center text-gray-500'} colSpan={2}>No Data Found !!!</td>
                </tr>}

                <tr>
                    <td className="tableBorder text-center font-bold " colSpan={2}>Donor Child Condition Wise</td>
                </tr>
                {reportData?.donorChildAccordingToStatus?.length > 0 ? reportData?.donorChildAccordingToStatus?.map((item, index) => {
                    return (<tr key={index}>
                        <td className="tableBorder">{item._id}</td>
                        <td className="tableBorder">{item.totalDonors}</td>
                    </tr>)
                }) : <tr>
                    <td className={'tableBorder text-center text-gray-500'} colSpan={2}>No Data Found !!!</td>
                </tr>}
                <tr>
                    <td className="tableBorder text-center font-bold" colSpan={2}>Donor Child Feeding Status Wise</td>
                </tr>
                {reportData?.donorChildAccordingToFeedingStatus?.length > 0 ? reportData?.donorChildAccordingToFeedingStatus?.map((item, index) => {
                    return (<tr key={index}>
                        <td className="tableBorder">{item._id}</td>
                        <td className="tableBorder">{item.count}</td>
                    </tr>)
                }) : <tr>
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
                    <td className="tableBorder text-center font-bold" colSpan={2}>Milk Dispense According to Baby
                        Status
                    </td>
                </tr>
                {reportData?.totalMilkByStatus?.length > 0 ? reportData?.totalMilkByStatus?.map((item, index) => {
                    return (<tr key={index}>
                        <td className="tableBorder">{item.babyStatus}</td>
                        <td className="tableBorder">{item.totalRequisitedMilk}{" "}ml</td>
                    </tr>)
                }) : <tr>
                    <td className={'tableBorder text-center text-gray-500'} colSpan={2}>No Data Found !!!</td>
                </tr>}
                <tr>
                    <td className="tableBorder text-center font-bold" colSpan={2}> Recipient Diagnosis Wise</td>
                </tr>
                {reportData?.diagnosisCounts?.length > 0 ? reportData?.diagnosisCounts?.map((item, index) => {
                    return (<tr key={index}>
                        <td className="tableBorder">{item.diagnosis}</td>
                        <td className="tableBorder">{item.count}{" "}</td>
                    </tr>)
                }) : <tr>
                    <td className={'tableBorder text-center text-gray-500'} colSpan={2}>No Data Found !!!</td>
                </tr>}
                <tr>
                    <td className="tableBorder text-center font-bold" colSpan={2}> Recipient Indication Wise</td>
                </tr>
                {reportData?.indicationCounts?.length > 0 ? reportData?.indicationCounts?.map((item, index) => {
                    return (<tr key={index}>
                        <td className="tableBorder">{item.indications}</td>
                        <td className="tableBorder">{item.count}{" "}</td>
                    </tr>)
                }) : <tr>
                    <td className={'tableBorder text-center text-gray-500'} colSpan={2}>No Data Found !!!</td>
                </tr>}
                </tbody>
            </table>
        </div>
    </div>);
}

export default ReportPage;