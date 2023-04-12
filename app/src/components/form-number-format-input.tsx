import { useFormContext, Controller } from "react-hook-form";
import {
  NumberFormatInput,
  NumberFormatInputProps,
} from "./number-format-input";

interface FormInputProps extends NumberFormatInputProps {
  name: string;
}

export function FormNumberFormatInput({ name, ...props }: FormInputProps) {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <NumberFormatInput
          {...props}
          {...field}
          onValueChange={field.onChange}
        />
      )}
    />
  );
}
