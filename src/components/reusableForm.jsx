import React from "react";
export default function FormBorder({ title, children, className }) {
  return (
    <div
      className={`border-2 rounded-lg shadow-md border-[#004a89] pt-4 px-4 relative mt-10  ${className} `}
    >
      <label className=" font-bold text-base xl:text-xl mb-2 absolute -top-5 left-20  bg-[#004a89] p-2 rounded-md tracking-wider text-white ">
        {title}
      </label>
      <div className="component-content py-4">{children}</div>
    </div>
  );
}
