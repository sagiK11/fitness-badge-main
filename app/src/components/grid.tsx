import { WrapperProps } from "@/types";
import classNames from "classnames";

interface GridProps extends WrapperProps {}

export function Grid({ children, className }: GridProps) {
  return <div className={classNames("grid", className)}>{children}</div>;
}
