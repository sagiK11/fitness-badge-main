import {
  NumberFormatValues,
  NumericFormat,
  NumericFormatProps,
  SourceInfo,
} from "react-number-format";
import { Input } from "./input";
import React from "react";
import debounce from "debounce";

export interface NumberFormatInputProps extends NumericFormatProps {
  debounceTime?: number;
}

export const NumberFormatInput = React.forwardRef(
  (props: NumberFormatInputProps, ref: any) => {
    const { debounceTime, onChange, ...rest } = props;

    const debounced = (onChange: any) =>
      debounce((values: NumberFormatValues, source: SourceInfo) => {
        onChange(source.event);
      }, debounceTime || 1000);

    return (
      <NumericFormat
        customInput={Input}
        {...rest}
        onValueChange={debounceTime ? debounced(onChange) : rest.onValueChange}
        allowNegative={false}
        decimalScale={2}
        getInputRef={(el: HTMLInputElement) => {
          if (ref?.current) {
            ref.current = el;
          }
        }}
      />
    );
  }
);

NumberFormatInput.displayName = "NumberFormatInput";
