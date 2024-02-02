'use client'
import Image from "next/image";
import { HiOutlineBars3 } from "react-icons/hi2";
import axios from 'axios'
import { useRouter } from "next/navigation";
export default function Navbar() {
  const router = useRouter()
  const logoutHandler = async(e)=>{
    e.preventDefault()
    try {
      const response = await axios.get('/api/user/logout');
      
      if(response.status === 200){
        router.push('/login')
      }
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className="shadow-xl sticky  inset-0 z-50 flex  items-center justify-between bg-white ">
      {/* <div className="">
        <HiOutlineBars3 />
      </div> */}
      <div className="pl-10">
        <Image
          height={200}
          width={200}
          alt="logo"
          src={"/assets/images/logopng.png"}
          className="w-[75px] py-3"
        />
      </div>
      <div>
        <button className="bg-red-600 py-1.5 px-3 rounded-md shadow-md text-white font-bold" onClick={(e)=>logoutHandler(e)} >
          Logout
        </button>
      </div>
    </div>
  );
}
