const RadioInput = ({ label }) => {
  return (
    <div className="grid gap-2">
      <label htmlFor="">{label}:</label>
      <div className="flex gap-4">
        <div className="flex gap-1">
          <input type="radio" />
          <label>Yes</label>
        </div>
        <div className="flex gap-1">
          <input type="radio" />
          <label>No</label>
        </div>
      </div>
    </div>
  );
};
export default RadioInput;
