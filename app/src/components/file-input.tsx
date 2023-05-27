import classNames from "classnames";
import React from "react";

interface FileInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  label?: string;
  alt?: string;
}

export function FileInput({ className, label, alt, ...props }: FileInputProps) {
  return (
    <div className="form-control w-full max-w-xs">
      <label className="label">
        {label && <span className="label-text">{label}</span>}
        {alt && <span className="label-text-alt">{alt}</span>}
      </label>
      <input
        type="file"
        className={classNames("file-input", className)}
        {...props}
      />
    </div>
  );
}
