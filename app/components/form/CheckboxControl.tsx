import { Controller } from "react-hook-form";
import { type SpectrumCheckboxProps, Checkbox } from "@adobe/react-spectrum";

export function CheckboxControl(props: SpectrumCheckboxProps) {
  const { name, children, isDisabled } = props;

  return (
    <Controller
      name={name ?? ""}
      defaultValue=""
      render={({ field, fieldState: { error } }) => (
        <Checkbox
          isSelected={field.value}
          aria-label={name}
          isDisabled={isDisabled}
          validationState={error && "invalid"}
          {...field}
        >
          {children}
        </Checkbox>
      )}
    />
  );
}
