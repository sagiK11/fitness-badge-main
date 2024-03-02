import { WrapperProps } from "@/types";
import classNames from "classnames";

interface CardProps
  extends WrapperProps,
    Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
  section?: boolean;
  [x: string]: any;
}

export function Card({
  children,
  className,
  section,
  as = "div",
  ...rest
}: CardProps) {
  const Component = as;
  return (
    <Component
      className={classNames(
        "card shadow-md border border-gray-700 bg-base-300",
        { "divide-y divide-gray-600": section },
        className
      )}
      {...rest}
    >
      {children}
    </Component>
  );
}
