export default function Button({ children , isSubmitting }) {
  return (
    <div>
      <button className="text-white bg-red-600 hover:bg-[#004a89] px-8 py-2 rounded-lg " type="submit" disabled={isSubmitting}  >
        {children}
      </button>
    </div>
  );
}
