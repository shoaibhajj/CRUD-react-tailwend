import { Button, Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { ReactNode, useState } from "react";

interface IProp {
  isOpen: boolean;
  close: () => void;
  open: () => void;
  title?: string;
  children: ReactNode;
}

const Modal = ({ isOpen, close, open, title, children }: IProp) => {
  return (
    <>
      <Button
        onClick={open}
        className="rounded-md bg-indigo-600 py-2 px-4 text-sm font-medium text-white "
      >
        Open dialog
      </Button>

      <Dialog
        open={isOpen}
        as="div"
        className="relative z-10 focus:outline-none"
        onClose={close}
        __demoMode
      >
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel
              transition
              className="w-full max-w-md rounded-xl bg-white p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
            >
              {title && (
                <DialogTitle
                  as="h3"
                  className="text-xl/7 font-medium text-black"
                >
                  {title}
                </DialogTitle>
              )}

              {/* <p className="mt-2 text-sm/6 text-white/50">
                Your payment has been successfully submitted. We’ve sent you an
                email with all of the details of your order.
              </p> */}
              <div className="mt-4">{children}</div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  );
};
export default Modal;
