import Image from "next/image";

export default function DashboardCard({ number, title, imageSrc }) {
  return (
    <>
      <div className="flex  ">
        <div
          className={`flex  justify-between  items-center border-2 rounded-md  border-[#004a89] py-4 px-4 relative  gap-14  `}
        >
          <div className="leading-10">
            <p className="text-gray-600">{title}</p>
            <p className="text-[#004a89] text-xl font-extrabold">{number}</p>
          </div>
          <div>
            <Image
              height={100}
              width={100}
              alt="logo-img"
              // src={"/assets/images/mother.png"}
              src={imageSrc}
              className="w-[50px]"
            />
          </div>
        </div>
      </div>
    </>
  );
}
