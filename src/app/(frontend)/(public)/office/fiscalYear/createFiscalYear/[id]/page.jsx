'use client'
import React, { useState, useEffect } from 'react'
import Fiscal from '../page';
import { getFiscalYearById } from 'src/services/apiService/officeService/office'
import { useRouter } from 'next/navigation';
import { useParams } from 'next/navigation';
export default function EditFiscalYear() {
    const router = useRouter();
    const {id} = useParams()
    const [apiData,setApiData] = useState([]);
    useEffect(()=>{
        async function fetchData(){
            const response = await getFiscalYearById(id);
            if(response?.status === 200){
                setApiData(response?.data)
            }
        }
        fetchData()
    },[id])
  return (
    <div>
      <Fiscal clickedIdData={apiData} />
    </div>
  )
}
