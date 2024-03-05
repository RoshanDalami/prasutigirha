"use client";
import { useState, useEffect } from "react";
import Button from "src/components/button";
import FormBorder from "src/components/reusableForm";
import { IoClose } from "react-icons/io5";
import { useForm } from "react-hook-form";
import { urls } from "src/services/apiHelpers";
import axios from "axios";
import { useRouter } from "next/navigation";
export default function Department() {
  const router = useRouter();
  const [openModel, setOpenModel] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm();
  const userInfo =
    typeof localStorage !== "undefined"
      ? JSON.parse(localStorage.getItem("userInfo"))
      : "";

  const [officeList, setOfficeList] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const { data, status } = await axios.get(`${urls.getOffice}`);
      if (status === 200) {
        setOfficeList(data);
      }
    }
    fetchData();
  }, []);

  const onSubmit = async (data) => {
    data = {
      ...data,
      officeId: JSON.parse(data.officeId),
      userId: userInfo?._id,
    };

    try {
      const response = await axios.post(`${urls.createDepartment}`, data);
      console.log(response, "response");
      if (response.status === 200) {
        router.push("/");
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
      const response = await axios.post(`${urls.createPost}`, data);
      console.log(response, "response");
      if (response.status === 200) {
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const [departmentList, setDepartmentList] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const { data, status } = await axios.get(`${urls.getDepartment}`);
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
          {openModel && (
            <div className="absolute z-50 inset-0 bg-black/40 w-[100%]   min-h-screen flex md:items-center py-20 justify-center">
              <div className="w-full md:px-0 md:w-2/4 px-5">
                <div className=" bg-white rounded-md shadow-md relative ">
                  <IoClose
                    className=" absolute hover:scale-125 right-2 text-2xl top-1 rounded-full "
                    onClick={handleClose}
                  />
                  <form
                    className="flex items-center justify-center "
                    onSubmit={handleSubmit((data) => addPost(data))}
                  >
                    <div className="grid w-full mx-5 my-4 gap-4">
                      <div className="grid grid-cols-2 gap-3">
                        <div className="grid gap-2">
                          <label className="text-lg font-bold">
                            {" "}
                            Post Name
                          </label>
                          <input
                            type="text"
                            placeholder="Enter Post Names"
                            className="inputStyle"
                            {...register("postName")}
                          />
                        </div>
                        <div className="grid gap-2">
                          <label className="text-lg font-bold">
                            {" "}
                            Select Department{" "}
                          </label>
                          <select
                            className="inputStyle"
                            {...register("departmentId")}
                          >
                            <option selected value={""} disabled>
                              --Select Department--
                            </option>
                            {departmentOptions}
                          </select>
                        </div>
                      </div>
                      <div className="flex justify-end">
                        <Button>
                          {isSubmitting ? "Submitting..." : "Add"}
                        </Button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          )}
        </div>
        <form
          className="mx-10 relative"
          onSubmit={handleSubmit((data) => onSubmit(data))}
        >
          <FormBorder title={"Department"}>
            <div className="flex justify-end  ">
              <div className=" absolute -top-4 right-8 ">
                <button
                  className="bg-[#004a89] hover:bg-red-600 py-2 px-2 rounded-md text-white font-bold"
                  onClick={handleModel}
                >
                  Add Post
                </button>
              </div>
            </div>
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
                <select
                  className="inputStyle"
                  {...register("officeId")}
                >
                  <option value={""} selected disabled>
                    --Select Office--
                  </option>
                  {officeList?.map((item, index) => {
                    return (
                      <option key={index} value={item.officeId}>
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
              <Button isSubmitting={isSubmitting} >{isSubmitting ? "Submitting..." : "Submit"}</Button>
            </div>
          </FormBorder>
        </form>
      </div>
    </>
  );
}
