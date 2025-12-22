import { X } from "lucide-react";
import { ReactElement } from "react";

interface ModalProps {
  children: ReactElement;
  title: string;
  open: boolean;
  onClose: () => void;
  size: "sm" | "md" | "lg"
}

const sizeStyle = {
  "sm" : "max-w-lg",
  "md" : "max-w-xl",
  "lg" : "max-w-2xl"
}

function Modal({ children, title, open, onClose , size }: ModalProps) {
  return (
    <>
      {open && (
        <div className="fixed inset-0 z-10 flex justify-center items-center">
          <div
            className="absolute inset-0 bg-slate-400 opacity-90"
            onClick={onClose}
          />
          <div className={`relative rounded-lg max-h-[90vh] flex w-full ${sizeStyle[size]} bg-white relative opacity-100 z-10` }>
            <div className="insideModal w-full">
              <div className="top flex justify-between items-center border-b border-slate-200 py-4 px-6" >
                <div className="title font-semibold text-lg">{title}</div>
                <button
                  onClick={onClose}
                  className="icon text-zinc-600 cursor-pointer"
                >
                  <X size={20} />
                </button>
              </div>
              <div className="inputs p-6">{children}</div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Modal;
