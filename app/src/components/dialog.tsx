import { cls } from "@/utils";
import React from "react";

type DialogProps = React.PropsWithChildren<{
  id: string;
  classNames?: {
    dialog?: string;
    holder?: string;
  };
}>;

export function showModal(id: string) {
  const dialog = window.document.getElementById(`modal-${id}`);
  if (
    dialog &&
    "showModal" in dialog &&
    typeof dialog.showModal === "function"
  ) {
    dialog.showModal();
  }
}

export function Dialog({ id, classNames, children }: DialogProps) {
  return (
    <dialog
      id={`modal-${id}`}
      className={cls("modal modal-bottom sm:modal-middle", classNames?.dialog)}
    >
      <div className={cls("modal-box", classNames?.holder)}>{children}</div>
    </dialog>
  );
}
