import { WrapperProps } from "@/types";
import classNames from "classnames";
import Link from "next/link";

type Size = "none" | "md" | "lg";

interface CardBodyProps extends WrapperProps {
  size?: Size;
  hover?: boolean;
  href?: string;
}
const SIZE_MAP: Record<Size, string> = {
  none: "p-0",
  md: "p-3",
  lg: "p-6",
};

export function CardBody({
  children,
  className,
  size = "md",
  hover,
  as = "div",
  ...rest
}: CardBodyProps) {
  let Component = as;

  if (rest.href) {
    Component = Link;
  }

  return (
    <Component
      className={classNames("card-body", className, SIZE_MAP[size], {
        "hover:bg-gray-100 transition-all duration-200": !!hover,
      })}
      {...rest}
    >
      {children}
    </Component>
  );
}
