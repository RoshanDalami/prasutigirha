'use client'
import { useState , useEffect } from 'react'
import React  from 'react'
import Employee from '../page'
import {GetEmployeeById} from 'src/services/apiService/officeService/office'
import { useParams } from 'next/navigation'
export default function EmployeeEdit() {
    const {id} = useParams();
    const [apiData,setApiData] = useState({})
    useEffect(()=>{
        const fetchData = async () =>{
            const response = await GetEmployeeById(id);
            if(response?.status === 200){
                setApiData(response?.data)
            }
        }
        fetchData()
    },[id])
  return (
    <div>
      <Employee clickedIdData = {apiData} />
    </div>
  )
}
