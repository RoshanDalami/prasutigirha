
import { useEffect, useState } from "react";
import FormBorder from "./reusableForm";
import { useForm } from "react-hook-form";
import { FaStethoscope } from "react-icons/fa";
import axios from "axios";
import { urls } from "src/services/apiHelpers";

const educationList = [
  {id:1,name:"School Level"},
  {id:2,name:"High School"},
  {id:3,name:"Bachelor Degree"},
  {id:4,name:"Master Degree"},
  {id:5,name:"Doctorate"},
  {id:6,name:"Other"},
]
export default async function Stepper1() {

  const [gestiationlData, setGestiationalData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const { data, status } = await axios.get("/api/dropdown/gestational");
      if (status === 200) {
        setGestiationalData(data);
      }
    };
    fetchData();
  }, []);
  

  //mode of delivery
  const [deliveryList,setDeliveryList]=useState([]);
  useEffect(()=>{
    const fetchData = async()=>{
      const {data,status} = await axios.get(urls.getDelivery)
      if(status === 200){
        setDeliveryList(data)
      }
    }
    fetchData()
  },[])

//   //mode of delivery options 
  const deliveryOptions = deliveryList?.map((item,index)=>{
   return(
    <option key={index} value={item.deliveryId}>
      {item.deliveryName}
    </option>
   )
  })
//   //education option
  const educationOptions = educationList?.map((item,index)=>{
    return(
      <option key={index} value={item.name} >
        {item.name}
      </option>
    )
  })
//   //parity
  const [parityList,setParityList]=useState([]);
  useEffect(()=>{
    async function fetchData(){
      const {data,status} = await axios.get(urls.getParity)
      if(status === 200){
        setParityList(data)
      }
    }
    fetchData()
  },[])
// //parity options
  const parityOptions = parityList?.map((item,index)=>{
    return(
      <option key={index} value={item.parityId}>
        {item.parityName}
      </option>
    )
  })

  //ethnicity
  const[ethnicityList,setEthnicityList]=useState([]);
  useEffect(()=>{
    async function fetchData(){
      const {data,status} = await axios.get(urls.getEthnicity) 
      if(status === 200){
        setEthnicityList(data)
      }
    }
    fetchData()
  },[])
//ethnicityOptions
  const ethnicityOptions = ethnicityList?.map((item,index)=>{
    return(
      <option key={index} value={item.ethnicityName}>
        {item.ethnicityName}
      </option>
    )
  })


  return (
    <>
      <form>
        <FormBorder title={"Add Donor Records"}>
          <div className="md:grid-cols-2 grid text-lg gap-4">
            <div className="grid">
              <label>
                {" "}
                Hospital Registration Number
                <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                placeholder="Enter Hospital Registration Number"
                className="inputStyle"
              />
            </div>
            <div className="grid">
              <label>
                {" "}
                Date<span className="text-red-600">*</span>
              </label>
              <input type="date" placeholder="" className="inputStyle" />
            </div>
            <div className="grid">
              <label>
                {" "}
                Time<span className="text-red-600">*</span>
              </label>
              <input type="time" placeholder="" className="inputStyle" />
            </div>
            <div className="grid">
              <label>
                {" "}
                Donor Full Name<span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                placeholder="Enter Donar Full Name"
                className="inputStyle"
              />
            </div>
            <div className="grid">
              <label>
                {" "}
                Donor Age<span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                placeholder="Enter Donar Age"
                className="inputStyle"
              />
            </div>
            <div className="grid">
              <label>
                {" "}
                Education<span className="text-red-600">*</span>
              </label>
              <select className="inputStyle">
                <option selected disabled>--Select Education--</option>
                {educationOptions}
              </select>
            </div>
            <div className="grid">
              <label>
                {" "}
                Ethnicity<span className="text-red-600">*</span>
              </label>
              <select className="inputStyle">
                <option selected disabled>--Select Ethnicity--</option>
                {ethnicityOptions}
              </select>
            </div>
            <div className="grid">
              <label>
                {" "}
                Address<span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                placeholder="Enter Address"
                className="inputStyle"
              />
            </div>
            <div className="grid">
              <label>
                {" "}
                Contact Number<span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                placeholder="Enter Contact Number"
                className="inputStyle"
              />
            </div>
            <div className="grid">
              <label>
                {" "}
                Present Age of Child (DOL)
                <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                placeholder="Enter Present Age of Child"
                className="inputStyle"
              />
            </div>
            <div className="grid">
              <label>
                {" "}
                Gestational Age ( WOG)<span className="text-red-600">*</span>
              </label>
              <select className="inputStyle">
                <option selected disabled>
                  -- Select Gestiational --
                </option>
                {gestiationlData?.map((item, index) => {
                  return (
                    <option key={index} value={item.gestationalId}>
                      {item.gestationalName}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="grid">
              <label>
                {" "}
                Mode Of Delivery<span className="text-red-600">*</span>
              </label>
              <select className="inputStyle">
                <option selected disabled>--Select Mode of Delivery--</option>
                {deliveryOptions}
              </select>
            </div>
            <div className="grid">
              <label>
                {" "}
                Parity<span className="text-red-600">*</span>
              </label>
              <select className="inputStyle">
                <option>--Select Parity--</option>
                {parityOptions}
              </select>
            </div>
          </div>
        </FormBorder>
      </form>
    </>
  );
}


