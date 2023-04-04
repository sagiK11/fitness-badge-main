import { WrapperProps } from "@/types";
import classNames from "classnames";
import Link from "next/link";

interface ButtonProps
  extends WrapperProps,
    Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "children"> {
  href?: string;
  iconEnd?: React.ReactNode;
}

export function Button({
  children,
  as = "button",
  className,
  iconEnd,
  ...props
}: ButtonProps) {
  let Component = as;
  if (props.href) {
    Component = Link;
  }

  return (
    <Component className={classNames(className, "btn gap-1")} {...props}>
      {children}
      {iconEnd}
    </Component>
  );
}
