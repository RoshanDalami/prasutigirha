'use client'
import React ,{useState , useEffect} from 'react'
import CreatePost from '../page'
import {
    GetPostById
} from 'src/services/apiService/officeService/office'
import { useParams } from 'next/navigation'

export default function EditPostList() {
    const {id} = useParams();
    const [apiData,setApiData] = useState({});
    useEffect(()=>{
        const fetchData = async () =>{
            const response = await GetPostById(id);
            if(response?.status == 200){
                setApiData(response?.data)
            }
        }
        fetchData()
    },[id])
    console.log(apiData,'response')
  return (
    <div>
      <CreatePost clickedDataId={apiData} />
    </div>
  )
}
