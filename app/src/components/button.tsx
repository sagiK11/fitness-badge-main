import { WrapperProps } from "@/types";
import classNames from "classnames";
import Link from "next/link";

interface ButtonProps
  extends WrapperProps,
    Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "children"> {
  href?: string;
  iconStart?: React.ReactNode;
  iconEnd?: React.ReactNode;
}

export function Button({
  children,
  as = "button",
  className,
  iconStart,
  iconEnd,
  ...props
}: ButtonProps) {
  let Component = as;
  if (props.href) {
    Component = Link;
  }

  return (
    <Component className={classNames(className, "btn gap-1")} {...props}>
      {iconStart}
      {children}
      {iconEnd}
    </Component>
  );
}
