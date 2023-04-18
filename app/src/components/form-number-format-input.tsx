import { useFormContext, Controller } from "react-hook-form";
import {
  NumberFormatInput,
  NumberFormatInputProps,
} from "./number-format-input";
import debounce from "debounce";
import { NumberFormatValues, SourceInfo } from "react-number-format";

interface FormInputProps extends NumberFormatInputProps {
  name: string;
  debounceTime?: number;
}

type onChange = (...event: any[]) => void;

export function FormNumberFormatInput({
  name,
  debounceTime,
  ...props
}: FormInputProps) {
  const { control, trigger } = useFormContext();

  const debounced = (onChange: onChange) =>
    debounce((values: NumberFormatValues, source: SourceInfo) => {
      trigger(name);
      onChange(source.event);
    }, debounceTime || 1000);

  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <NumberFormatInput
          {...props}
          {...field}
          onValueChange={
            debounceTime ? debounced(field.onChange) : field.onChange
          }
        />
      )}
    />
  );
}
