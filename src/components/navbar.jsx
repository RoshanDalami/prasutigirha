import Image from "next/image";
import { HiOutlineBars3 } from "react-icons/hi2";

export default function Navbar() {
  return (
    <div className="shadow-xl sticky  inset-0 z-50 bg-white ">
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
    </div>
  );
}
