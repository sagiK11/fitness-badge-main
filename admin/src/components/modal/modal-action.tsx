import { WrapperProps } from "@/types";

export function ModalAction({ children }: WrapperProps) {
  return <div className="modal-action">{children}</div>;
}
