import { WrapperProps } from "@/types";
import classNames from "classnames";

type Size = "md" | "lg";

interface CardBodyProps extends WrapperProps {
  size?: Size;
  hover?: boolean;
}
const SIZE_MAP: Record<Size, string> = {
  md: "p-3",
  lg: "p-6",
};

export function CardBody({
  children,
  className,
  size = "md",
  hover,
}: CardBodyProps) {
  return (
    <div
      className={classNames("card-body", className, SIZE_MAP[size], {
        "hover:bg-gray-100 transition-all duration-200": !!hover,
      })}
    >
      {children}
    </div>
  );
}
