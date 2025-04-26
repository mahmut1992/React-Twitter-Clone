import { onAuthStateChanged } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { auth } from "../../firebase";
import { toast } from "react-toastify";
import Pageloader from "../loader/Pageloader";

const Protected = () => {
  const [user, setuser] = useState(undefined);

  // oturumu açık olan kullanıcının verilerini al

  useEffect(() => {
    // Kuulanıcı oturum verisine abone ol
    const unsub = onAuthStateChanged(auth, (activeUser) => {
      setuser(activeUser);
    });
    // sayfadan ayrılınca aboneliği durdur
    return () => unsub();
  }, []);
  if (user === undefined) return <Pageloader />;

  // kullanıcın oturumu kapalı ise logine yönlendir

  if (user === null || user?.emailVerified === false) {
    if (user?.emailVerified === false)
      toast.info("Mail adresiniz doğrulanamadı");
    return <Navigate to="/" replace />;
  }

  return <Outlet context={user} />;
};

export default Protected;
