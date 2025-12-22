import { X } from "lucide-react";
import { ReactElement } from "react";

interface ModalProps {
  children: ReactElement;
  title: string;
  open: boolean;
  onClose: () => void;
}

function Modal({ children, title, open, onClose }: ModalProps) {
  return (
    <>
      {open && (
        <div className="fixed inset-0 z-10 flex justify-center items-center">
          <div
            className="absolute inset-0 bg-slate-400 opacity-90"
            onClick={onClose}
          />
          <div className="relative rounded-lg max-h-[90vh] flex w-full max-w-2xl bg-white relative opacity-100 z-10">
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
