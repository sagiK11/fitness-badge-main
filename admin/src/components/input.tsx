import classNames from "classnames";
import React from "react";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

export const Input = React.forwardRef(
  ({ className, ...props }: InputProps, ref: any) => {
    return (
      <input
        type="text"
        className={classNames("input w-full", className)}
        ref={ref}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";
