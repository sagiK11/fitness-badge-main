import React from "react";

type ModalProps = {
  children: React.ReactNode;
  header?: string;
  id: string;
};

export function Modal({ children, header, id }: ModalProps) {
  return (
    <>
      <input type="checkbox" id={id} className="modal-toggle" />
      <div className="modal modal-bottom sm:modal-middle">
        <div className="modal-box relative w-11/12 max-w-5xl sm:self-start mt-20">
          <label
            htmlFor={id}
            className="btn btn-sm btn-circle absolute right-2 top-2 bg-transparent text-black border-0 hover:text-white"
          >
            ✕
          </label>

          {header && <h3 className="font-bold text-lg">{header}</h3>}
          <div className="py-3">{children}</div>
        </div>
      </div>
    </>
  );
}
