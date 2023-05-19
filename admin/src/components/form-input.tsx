import { Input, InputProps } from "./input";
import { useFormContext } from "react-hook-form";

interface FormInputProps extends InputProps {
  name: string;
}
export function FormInput({ name, ...props }: FormInputProps) {
  const { register } = useFormContext();
  return <Input {...register(name)} {...props} />;
}
