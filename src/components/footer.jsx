export default function Footer() {
  const date = new Date().getFullYear();
  return (
    <>
      <p className=" bottom-5 bg-white  w-full text-center -z-10">
        <span> Copyright ©️ {date}. All right reserved | </span>
        <span>
          Designed and Developed by{" "}
          <span className="text-red-600">Softech Foundation</span>
        </span>
      </p>
    </>
  );
}
