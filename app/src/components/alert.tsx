import { WrapperProps } from "@/types";
import classNames from "classnames";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { AiOutlineStop, AiOutlineWarning } from "react-icons/ai";

type Variant = "success" | "error" | "warning" | "info";
type AlertProps = WrapperProps & {
  variant?: Variant;
};

export function Alert({ variant = "info", children }: AlertProps) {
  return (
    <div
      className={classNames("alert shadow-lg", {
        "alert-error": variant === "error",
        "alert-warning": variant === "warning",
        "alert-success": variant === "success",
        "alert-info": variant === "info",
      })}
    >
      <div>
        <AlertIcon variant={variant} />
        <span>{children}</span>
      </div>
    </div>
  );
}

const AlertIcon = ({
  variant,
  size = 20,
}: {
  variant: Variant;
  size?: number;
}) => {
  if (variant === "error") return <AiOutlineStop size={size} />;
  if (variant === "warning") return <AiOutlineWarning size={size} />;
  if (variant === "success") return <AiOutlineCheckCircle size={size} />;
  if (variant === "info") return <AiOutlineInfoCircle size={size} />;
  return null;
};
