import React from "react";
import ErrorResponse from "./ErrorResponse";

export default function SelectField({
  controllerField,
  formField,
  errors,
  isSubmitting,
}) {
  return (
    <React.Fragment>
      <label
        htmlFor={formField.name}
        className="block text-sm font-medium text-gray-700 mb-2"
      >
        {formField.label}  <span className="text-red-500 text-base "> *</span>
        {formField.required && (
          <span className="text-red-500 text-base "> *</span>
        )}
      </label>
      <select
        {...controllerField}
        {...formField}
        disabled={isSubmitting}
        className={`w-full px-3 py-2 mb-2 border ${
          errors[formField.name] ? "border-red-500" : "border-gray-300"
        } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
      >
        <option value=""selected>
          {formField.defaultValue}
        </option>
        {formField?.options?.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {errors[formField.name] && (
        <ErrorResponse>{errors[formField.name].message}</ErrorResponse>
      )}
    </React.Fragment>
  );
}
