import { WrapperProps } from "@/types";
import classNames from "classnames";

interface TabsProps extends WrapperProps {}

export function Tabs({ children, className }: TabsProps) {
  return <div className={classNames("tabs", className)}>{children}</div>;
}
