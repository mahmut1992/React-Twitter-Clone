import React, { useRef, useState } from "react";
import Modal from "../modal";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../firebase";
import { toast } from "react-toastify";

const ForgotPassword = ({ show }) => {
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef();
  const handleClick = () => {
    const email = inputRef.current.value;
    sendPasswordResetEmail(auth, email)
      .then(() => {
        toast.success(`${email} adresine şifre sıfırlama linki gönderildi`);
        setIsOpen(false);
      })
      .catch(() => {
        toast.error("Girilen mail hatalı");
      });
  };

  return show ? (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="text-end tex-sm text-gray-500 hover:text-gray-400 mt-2 cursor-pointer "
        type="button"
      >
        Şifremi mi unuttun
      </button>
      <Modal isOpen={isOpen} close={() => setIsOpen(false)}>
        <div className="flex flex-col gap-3">
          <h1 className="text-3xl">Şifreni mi Unuttun?</h1>
          <p className="text-zinc-400">
            Email adresine bir şifre sıfırlama bağlantısı göndericez
          </p>
          <input ref={inputRef} type="email" className="input mt-10" />
          <button
            onClick={handleClick}
            type="button"
            className="bg-white hover:bg-gray-300 transition text-black rounded-full mt-8 py-1 cursor-pointer"
          >
            Şifre sıfırlama mailini gönder
          </button>
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="bg-zinc-400 hover:bg-zinc-500 transition text-black rounded-full mt-3 py-1 cursor-pointer"
          >
            İptal
          </button>
        </div>
      </Modal>
    </>
  ) : (
    <div className="h-[32px] w-1 " />
  );
};

export default ForgotPassword;
