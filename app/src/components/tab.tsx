import { WrapperProps } from "@/types";
import classNames from "classnames";

interface TabProps extends WrapperProps {}

export function Tab({ children, className }: TabProps) {
  return <div className={classNames("tab", className)}>{children}</div>;
}
