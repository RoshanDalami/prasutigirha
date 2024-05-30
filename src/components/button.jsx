export default function Button({ children, isSubmitting, volume , date,aa }) {
  return (
    <div>
      <button
        className="text-white bg-red-600 hover:bg-[#004a89] px-8 py-2 rounded-lg disabled:bg-gray-300  disabled:cursor-not-allowed "
        type="submit"
        disabled={isSubmitting || volume || date > aa ? true:false}
      >
        {children}
      </button>
    </div>
  );
}
