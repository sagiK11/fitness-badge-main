import { NumericFormat, NumericFormatProps } from "react-number-format";
import { Input } from "./input";
import React from "react";

export interface NumberFormatInputProps extends NumericFormatProps {}

export const NumberFormatInput = React.forwardRef(
  (props: NumberFormatInputProps, ref: any) => {
    return (
      <NumericFormat
        customInput={Input}
        {...props}
        allowNegative={false}
        decimalScale={2}
        getInputRef={(el: HTMLInputElement) => (ref.current = el)}
      />
    );
  }
);

NumberFormatInput.displayName = "NumberFormatInput";
