import React, { useState } from "react";
import EmailInput from "./EmailInput";
import PasswordInput from "./PasswordInput";
import ForgotPassword from "./ForgotPassword";
import AuthToggle from "./AuthToggle";
import Button from "./Button";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../../firebase";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const navigate = useNavigate();
  // kaydolma modunda mıyız
  const [isSign, setIsSign] = useState(false);

  // form gönderilince çalışacak func
  const handleSubmit = async (e) => {
    e.preventDefault();

    // inputlardaki veriyi al

    const formData = new FormData(e.target);

    const { email, password } = Object.fromEntries(formData.entries());

    try {
      if (isSign) {
        // kaydol modunda : yeni hesap oluştur
        const res = await createUserWithEmailAndPassword(auth, email, password);

        // doğrulama e-postası gönder

        await sendEmailVerification(res.user);

        // giriş yapma moduna git
        setIsSign(false);

        // bildirim
        toast.success(`${email} adresine doğrulama e postası gönderildi`);
      } else {
        // giriş modunda : oturum aç
        const res = await signInWithEmailAndPassword(auth, email, password);

        // mailini doğrulamış ise bildirim gönder
        if (!res.user.emailVerified) {
          return toast.info("Lütfen mailinizi doğrulayın");
        }

        // bildirim
        toast.info("Hesaba Giriş yapıldı");
        navigate("/feed");
      }
      // formu temizle

      e.target.reset();
    } catch (error) {
      toast.error("Hataaa" + error.code);
    }
  };
  return (
    <form onSubmit={handleSubmit} className="flex flex-col">
      <EmailInput />
      <PasswordInput />
      <ForgotPassword show={!isSign} />
      <Button isSign={isSign} />
      <AuthToggle isSign={isSign} setIsSign={setIsSign} />
    </form>
  );
};

export default LoginForm;
