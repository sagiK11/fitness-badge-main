import classNames from "classnames";
import React from "react";

interface FileInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

export function FileInput({ className, ...props }: FileInputProps) {
  return (
    <input
      type="file"
      className={classNames("file-input", className)}
      {...props}
    />
  );
}
