const NoSSR = dynamic(() => import("../components/no-ssr"), { ssr: false });

const TableDesign = ({title,children})=>{
  return (
    <>
      <div className="border-2 rounded-lg border-[#004a89] pt-4 px-4 relative my-10 w-full ">
        <label className=" font-bold lg:font-medium text-xl mb-2 absolute -top-5 left-20 bg-[#004a89]  p-2 rounded-md tracking-wider text-white ">
          {title}
        </label>
        <div className="component-content py-4 px-4">{children}</div>
      </div>
    </>
  );
}
export default TableDesign
