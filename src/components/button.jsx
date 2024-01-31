export default function Button({ children }) {
  return (
    <div>
      <button className="text-white bg-red-600 hover:bg-[#004a89] px-8 py-2 rounded-lg ">
        {children}
      </button>
    </div>
  );
}
