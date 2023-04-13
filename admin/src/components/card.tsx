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
        "card shadow-md",
        { "divide-y ": section },
        className
      )}
      {...rest}
    >
      {children}
    </Component>
  );
}
