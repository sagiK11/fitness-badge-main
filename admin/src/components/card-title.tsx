import { WrapperProps } from "@/types";
import classNames from "classnames";

interface CardTitleProps extends WrapperProps {}

export function CardTitle({ children, className }: CardTitleProps) {
  return (
    <div className={classNames("card-title p-3", className)}>{children}</div>
  );
}
