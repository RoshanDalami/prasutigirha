"use client";
import { useState, useEffect } from "react";
import Button from "src/components/button";
import FormBorder from "src/components/reusableForm";
import { IoClose } from "react-icons/io5";
import { useForm } from "react-hook-form";
import { urls } from "src/services/apiHelpers";
import axios from "axios";
import { useRouter } from "next/navigation";
import {
  getOffice,
  createDepartment,
  getDepartment,
  createPost,
} from "src/services/apiService/officeService/office";
export default function Department({ clickedIdData }) {
  const router = useRouter();
  const [openModel, setOpenModel] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
    setValue,
  } = useForm();
  const userInfo =
    typeof localStorage !== "undefined"
      ? JSON.parse(localStorage.getItem("userInfo"))
      : "";

  const [officeList, setOfficeList] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const { data, status } = await getOffice();
      if (status === 200) {
        setOfficeList(data);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    if (clickedIdData) {
      setValue("id", clickedIdData?._id);
      setValue("departmentName", clickedIdData?.departmentName);
      setValue("officeId", clickedIdData?.officeId);
    }
  }, [clickedIdData, setValue]);

  const onSubmit = async (data) => {
    data = {
      ...data,
      officeId: JSON.parse(data.officeId),
      userId: userInfo?._id,
    };

    try {
      const response = await createDepartment(data);
      console.log(response, "response");
      if (response.status === 200) {
        router.push("/office/departmentList");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const addPost = async (data) => {
    data = {
      ...data,
      departmentId: JSON.parse(data.departmentId),
      userId: userInfo?._id,
    };
    try {
      const response = await createPost(data);
      console.log(response, "response");
      if (response.status === 200) {
        router.push("/office/departmentList");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const [departmentList, setDepartmentList] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const { data, status } = await getDepartment();
      if (status === 200) {
        setDepartmentList(data);
      }
    }
    fetchData();
  }, []);
  const departmentOptions = departmentList?.map((item, index) => {
    return (
      <option key={index} value={item.departmentId}>
        {item.departmentName}
      </option>
    );
  });

  const handleModel = (e) => {
    e.preventDefault();
    setOpenModel(!openModel);
  };
  const handleClose = (e) => {
    setOpenModel(false);
  };
  return (
    <>
      <div>
        <div className="">
        </div>
        <form
          className="mx-10 relative"
          onSubmit={handleSubmit((data) => onSubmit(data))}
        >
          <FormBorder title={"Department"}>
            <div className="md:grid-cols-2 grid grid-cols-1 gap-4 text-lg">
              <div className="grid">
                <label htmlFor="">
                  Name <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Department Name"
                  className="inputStyle"
                  {...register("departmentName")}
                />
                {errors?.departmentName && (
                  <p className="errorMessages">
                    {errors?.departmentName.message}
                  </p>
                )}
              </div>
              <div className="flex flex-col">
                <label htmlFor="">
                  Select Office <span className="text-red-600">*</span>
                </label>
                <select className="inputStyle" {...register("officeId")}>
                  {officeList?.map((item, index) => {
                    return (
                      <option key={index} value={item.officeId} selected>
                        {item.office_name}
                      </option>
                    );
                  })}
                </select>
                {errors?.officeId && (
                  <p className="errorMessages">{errors?.officeId.message}</p>
                )}
              </div>
            </div>
            <div className="text-lg font-bold my-5">
              <Button isSubmitting={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Submit"}
              </Button>
            </div>
          </FormBorder>
        </form>
      </div>
    </>
  );
}
