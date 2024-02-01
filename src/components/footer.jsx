export default function Footer() {
  const date = new Date().getFullYear();
  return (
    <>
      <p>
        <span> Copyright ©️ {date}. All right reserved | </span>
        <span>
          Designed and Developed by{" "}
          <span className="text-red-600">Softech Foundation</span>
        </span>
      </p>
    </>
  );
}
