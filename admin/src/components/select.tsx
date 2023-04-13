import React from "react";
import classNames from "classnames";

export interface Option {
  label: string;
  value: any;
  disable?: boolean;
  selected?: boolean;
}

export interface SelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options: Option[];
  className?: string;
}

export const Select = React.forwardRef(
  ({ options, className, ...rest }: SelectProps, ref: any) => {
    return (
      <select
        {...rest}
        className={classNames(
          "select select-bordered w-full bg-none",
          className
        )}
        ref={ref}
      >
        {options.map(({ label, value, ...rest }) => {
          return (
            <option key={value} value={value} {...rest}>
              {label}
            </option>
          );
        })}
      </select>
    );
  }
);

Select.displayName = "Select";
