import { WrapperProps } from "@/types";
import classNames from "classnames";

interface CardProps extends WrapperProps {
  section?: boolean;
}

export function Card({ children, className, section }: CardProps) {
  return (
    <div
      className={classNames(
        "card shadow-md",
        { "divide-y ": section },
        className
      )}
    >
      {children}
    </div>
  );
}
