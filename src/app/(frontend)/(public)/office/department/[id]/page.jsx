'use client'
import React , {useState,useEffect} from 'react'
import {
    GetDepartmentById
} from 'src/services/apiService/officeService/office'
import { useParams } from 'next/navigation';
import Department from '../page';
export default function DepartmentEdit() {
    const {id} = useParams()
    const [apiData,setApiData] = useState({});
    useEffect(()=>{
        const fetchData = async () =>{
            const response = await GetDepartmentById(id);
            if(response?.status == 200){
                setApiData(response?.data)
            }
        }
        fetchData()
    },[id])
  return (
    <div>
      <Department clickedIdData={apiData} />
    </div>
  )
}
