import classNames from "classnames";
import { UseFormReturn, FormProvider } from "react-hook-form";

interface FormProps extends React.FormHTMLAttributes<HTMLFormElement> {
  methods: UseFormReturn<any>;
}

export function Form({ children, className, methods, ...props }: FormProps) {
  return (
    <FormProvider {...methods}>
      <form className={classNames(className)} {...props}>
        {children}
      </form>
    </FormProvider>
  );
}
