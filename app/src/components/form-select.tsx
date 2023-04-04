import { FormField } from "@/types";
import { useFormContext } from "react-hook-form";
import { Select, SelectProps } from "./select";

interface FormSelectProps extends FormField, Omit<SelectProps, "name"> {}

export function FormSelect({ name, ...props }: FormSelectProps) {
  const { register } = useFormContext();
  return <Select {...props} {...register(name)} />;
}
