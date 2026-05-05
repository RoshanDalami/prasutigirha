export default function TableBorder({ title, children, title2 }) {
  return (
    <div className="border-2 rounded-lg border-[#004a89] pt-4 px-4 relative my-10 w-full ">
      <label className=" font-bold  text-xl mb-2 absolute -top-5 left-20  bg-[#004a89] p-2 rounded-md tracking-wider text-white ">
        {title}
      </label>
      <label className="  absolute -top-5 right-20    rounded-md ">
        {title2}
      </label>
      <div className="component-content py-4">{children}</div>
    </div>
  );
}
