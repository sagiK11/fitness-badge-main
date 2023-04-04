import { WrapperProps } from "@/types";
import React from "react";
import classNames from "classnames";

interface TypographyProps extends WrapperProps {
  bold?: boolean;
}

export function Typography({
  as = "p",
  className,
  children,
  bold,
}: TypographyProps) {
  const Component = as;
  return (
    <Component className={classNames(className, { "font-bold": !!bold })}>
      {children}
    </Component>
  );
}
