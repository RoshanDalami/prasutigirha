import InputField from "./Input";
import SelectField from "./Select";

const FormRender = ({ controllerField, formField, errors, isSubmitting }) => {
  switch (formField.type) {
    case "text":
      return (
        <InputField
          controllerField={controllerField}
          formField={formField}
          errors={errors}
          isSubmitting={isSubmitting}
        />
      );
    case "textarea":
      return (
        <InputField
          controllerField={controllerField}
          formField={formField}
          errors={errors}
          isSubmitting={isSubmitting}
        />
      );
    case "select":
      return (
        <SelectField
          controllerField={controllerField}
          formField={formField}
          errors={errors}
          isSubmitting={isSubmitting}
        />
      );
    default:
      return (
        <InputField
          controllerField={controllerField}
          formField={formField}
          errors={errors}
          isSubmitting={isSubmitting}
        />
      );
  }
};

export default FormRender;
