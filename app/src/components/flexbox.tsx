import { WrapperProps } from "@/types";
import classNames from "classnames";

export function FlexBox({ className, children }: WrapperProps) {
  return <div className={classNames("flex", className)}>{children}</div>;
}
