import { WrapperProps } from "@/types";
import { cls } from "@/utils";

export function ModalAction({ children, className }: WrapperProps) {
  return <div className={cls("modal-action", className)}>{children}</div>;
}
