export default function Button({ children , isSubmitting , volume }) {
  return (
    <div>
      <button className="text-white bg-red-600 hover:bg-[#004a89] px-8 py-2 rounded-lg " type="submit" disabled={isSubmitting || volume}  >
        {children}
      </button>
    </div>
  );
}
