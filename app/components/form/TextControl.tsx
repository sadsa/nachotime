import { Controller } from "react-hook-form";
import { type SpectrumTextFieldProps, TextField } from "@adobe/react-spectrum";

export function TextControl(props: SpectrumTextFieldProps) {
  const { name, label, type, isDisabled } = props;

  return (
    <Controller
      name={name ?? ""}
      defaultValue=""
      render={({ field, fieldState: { error } }) => (
        <TextField
          label={label}
          aria-label={name}
          type={type}
          isDisabled={isDisabled}
          validationState={error && "invalid"}
          errorMessage={error?.message}
          {...field}
        />
      )}
    />
  );
}
