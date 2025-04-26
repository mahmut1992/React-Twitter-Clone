// Higher Order Component - HOC
// Farklı component veya jsx elementlerini children prop u olarak alır
// HOC sayesinde içeriği prop olarak göndererek kod tekrarını azaltırız

import { IoMdClose } from "react-icons/io";

const Modal = ({ children, isOpen, close }) => {
  return (
    isOpen && (
      <div
        onClickCapture={close}
        className="fixed bg-zinc-800/50 inset-0 backdrop-blur-md z-[999] grid place-items-center"
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className="bg-black py-10 px-8 w-3/4 max-w-[500px] rounded-md "
        >
          <div className="flex justify-end">
            <button type="button" onClick={close}>
              <IoMdClose className="text-3xl transition hover:text-gray-500 cursor-pointer" />
            </button>
          </div>
          {children}
        </div>
      </div>
    )
  );
};

export default Modal;
