"use client";
import React, { useEffect, useState } from "react";
import TableBorder from "src/components/TableDesign";
import { useForm } from "react-hook-form";
import {
  giveAccess,
  getOneUser,
  GetAllModule,
} from "../../../../../services/apiService/officeService/office";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { urls } from "src/services/apiHelpers";
import axios from "axios";
export default function AccessManager() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm({});
  const userInfo =
    typeof localStorage !== "undefined"
      ? JSON.parse(localStorage.getItem("user"))
      : { username: "Softech" };
  const router = useRouter();
  const { id } = useParams();
  const [oneuser, setOneuser] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const { data, status } = await getOneUser(id);
      if (status === 200) {
        setOneuser(data?.assignedModule);
      }
    }
    fetchData();
  }, [id]);

  const [allModule, setAllModule] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const response = await GetAllModule();
      if (response?.status === 200) {
        console.log(response?.data);
        setAllModule(
          response?.data?.map((model) => {
            return {
              title: model.title,
              isChecked: oneuser.find((item) => item.title === model.title)
                ? true
                : false,
            };
          })
        );
      }
    }
    if (oneuser) {
      fetchData();
    }
  }, [oneuser]);

  const logoutHandler = async () => {
    try {
      const { data } = await axios.get(`${urls.logout}`);
      if (data.success === true) {
        localStorage.removeItem("user");
        router.push("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmit = async () => {
    const data = {
      allModule,
      userId: id,
    };
    const response = await giveAccess(data);
    if (response?.status === 200) {
      try {
        const { data } = await axios.get(`${urls.logout}`);
        if (data.success === true) {
          localStorage.removeItem("user");
          router.push("/login");
        }
      } catch (error) {
        console.log(error);
      }
    }
    console.log(data, "response");
  };

  const handleCheckboxChange = (index) => {
    setAllModule((prevModels) =>
      prevModels.map((model, i) =>
        i === index ? { ...model, isChecked: !model.isChecked } : model
      )
    );
  };

  return (
    <div className="mx-10">
      <TableBorder title={"Access Manager"}>
        <form action="" onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-4 gap-4 mt-12">
            {allModule?.map((item, index) => {
              return (
                <div className="flex gap-3 items-center" key={index}>
                  <label htmlFor="" className="text-2xl capitalize ">
                    {item.title}
                  </label>
                  <input
                    type="checkbox"
                    name=""
                    id=""
                    checked={item.isChecked}
                    className=" h-6 w-6"
                    onChange={() => handleCheckboxChange(index)}
                  />
                </div>
              );
            })}
          </div>
          <div className="flex justify-end">
            <button
              className="bg-green-600 text-white rounded-md shadow-md px-4 py-2"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Granting access ..." : "Grant Access"}
            </button>
          </div>
        </form>
      </TableBorder>
    </div>
  );
}
