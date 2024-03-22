import React from "react";
import classNames from "classnames";
export interface Option {
  label: string;
  value: any;
  disable?: boolean;
}

export interface SelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options: Option[];
  className?: string;
}
export const Select = React.forwardRef(
  (
    { options, className, defaultValue, placeholder, ...rest }: SelectProps,
    ref: any
  ) => {
    return (
      <select
        {...rest}
        className={classNames(
          "select select-bordered w-full bg-none",
          className
        )}
        defaultValue={placeholder}
        ref={ref}
      >
        {placeholder && (
          <option hidden value={placeholder}>
            {placeholder}
          </option>
        )}
        {options.map(({ label, value }) => {
          return (
            <option key={value} value={value}>
              {label}
            </option>
          );
        })}
      </select>
    );
  }
);

Select.displayName = "Select";
