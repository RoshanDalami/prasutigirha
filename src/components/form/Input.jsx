import React from "react";
import ErrorResponse from "./ErrorResponse";

export default function InputField({
  controllerField,
  formField,
  errors,
  isSubmitting,
}) {
  return (
    <React.Fragment>
      <label
        htmlFor={formField.name}
        className="block uppercase mb-2 text-sm font-medium text-gray-700"
      >
        {formField.label}
      </label>
      <input
        {...controllerField}
        {...formField}
        disabled={isSubmitting}
        color={errors[formField.name] ? "danger" : "primary"}
        className={`w-full px-3 py-2 mb-2 border ${
          errors[formField.name] ? "border-red-500" : "border-gray-300"
        } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
      />
      {errors[formField.name] && (
        <ErrorResponse>{errors[formField.name].message}</ErrorResponse>
      )}
    </React.Fragment>
  );
}
