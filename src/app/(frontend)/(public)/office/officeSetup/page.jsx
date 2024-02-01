"use client";
import Button from "src/components/button";
import FormBorder from "src/components/reusableForm";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { urls } from "src/services/apiHelpers";
import axios from "axios";
import { useRouter } from "next/navigation";
export default function Office() {
  const { register, handleSubmit, watch } = useForm();
  const watchFields = watch();
  const router = useRouter()
  //state
  const [state, setState] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const { status, data } = await axios.get(`${urls.getStates}`);
      if (status === 200) {
        setState(data);
      }
    };
    fetchData();
  }, []);
  const stateOptions = state?.map((item, index) => {
    return (
      <option key={index} value={item.stateId}>
        {item.stateName}
      </option>
    );
  });

  //district
  const [district, setDistrict] = useState([]);
  useEffect(() => {
    if(watchFields?.stateId){
      const fetchData = async () => {
        const {data,status} = await axios.get(`${urls.getDistrict}?stateId=${watchFields?.stateId}`);
        if(status === 200){
          setDistrict(data)
        }
      };
      fetchData();
    }
  }, [watchFields?.stateId]);
  const districtOptions = district?.map((item, index) => {
    return (
      <option key={index} value={item.districtId}>
        {item.districtName}
      </option>
    );
  });
  //palika
  const [palika, setPalika] = useState([]);
  useEffect(()=>{
    if(watchFields?.districtId){

      const fetchData=async()=>{
        const {status,data}=await axios.get(`${urls.getPalika}?districtId=${watchFields?.districtId}`)
        if(status === 200){
          setPalika(data)
        }
      }
      fetchData()
    }
  },[watchFields?.districtId])
  const paliakOptions = palika?.map((item, index) => {
    return (
      <option key={index} value={item.palikaId}>
        {item.palikaName}
      </option>
    );
  });

  const onSubmit = async(data)=>{
    try {
      const response = await axios.post(`${urls.createOffice}`,data)
      if(response.status === 200){
        router.push('/')
      }
    } catch (error) {
       console.log(error)
    }
  }
  return (
    <>
      <form className="mx-10" onSubmit={handleSubmit((data)=>onSubmit(data))} >
        <FormBorder title={"Office Setup"}>
          <div className="grid grid-cols-1 md:grid-cols-2 text-lg gap-4">
            <div className="grid">
              <label htmlFor="">
                Name <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                className="inputStyle"
                placeholder="Office Name"
                {...register("office_name")}
              />
            </div>
            <div className="grid">
              <label htmlFor="">
                Code <span className="text-red-600">*</span>
              </label>
              <input
                type="number"
                className="inputStyle"
                placeholder="Office Code"
                {...register("office_code")}
              />
            </div>
            <div className="grid">
              <label htmlFor="">
                Address <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                className="inputStyle"
                placeholder="Address"
                {...register("office_address")}
              />
            </div>
            <div className="grid">
              <label htmlFor="">
                Phone <span className="text-red-600">*</span>
              </label>
              <input
                type="Number"
                className="inputStyle"
                placeholder="Phone"
                {...register("office_phone")}
              />
            </div>
            <div className="grid">
              <label htmlFor="">
                Email <span className="text-red-600">*</span>
              </label>
              <input
                type="email"
                className="inputStyle"
                placeholder="Email"
                {...register("office_email")}
              />
            </div>
            <div className="grid">
              <label htmlFor="">
                State <span className="text-red-600">*</span>
              </label>
              <select className="inputStyle" {...register("stateId",{valueAsNumber:true})}>
                <option selected disabled value={""}>
                  --Select State--
                </option>
                {stateOptions}
              </select>
            </div>
            <div className="grid">
              <label htmlFor="">
                District <span className="text-red-600">*</span>
              </label>
              <select className="inputStyle" {...register("districtId",{valueAsNumber:true})}>
                <option selected disabled>
                  --Select District--
                </option>
                {districtOptions}
              </select>
            </div>
            <div className="grid">
              <label htmlFor="">
                Palika <span className="text-red-600">*</span>
              </label>
              <select className="inputStyle" {...register("palikaId",{valueAsNumber:true})}>
                <option selected disabled>
                  --Select Palika--
                </option>
                {paliakOptions}
              </select>
            </div>
          </div>
          <div className="my-5 font-bold text-lg">
            <Button>Submit</Button>
          </div>
        </FormBorder>
      </form>
    </>
  );
}
