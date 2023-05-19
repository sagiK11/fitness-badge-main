import { WrapperProps } from "@/types";

export function ModalAction({ children }: WrapperProps) {
  return <div className="modal-action border-t pt-2 ">{children}</div>;
}
