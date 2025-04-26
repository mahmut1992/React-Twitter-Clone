import React from "react";
import GoogleButton from "../../components/login-form/GoogleButton";
import LoginForm from "../../components/login-form";

const Login = () => {
  return (
    <div className="h-screen bg-[#242424] text-white grid place-items-center px-4 ">
      <div className="bg-black py-16 px-28 rounded-lg flex flex-col gap-10 sm:w-[80%] max-w[550px] ">
        <div className="flex justify-center">
          <img src="/x-logo.webp" alt="x-logo-image" className="h-[60px] " />
        </div>
        <h1 className="text-xl md:text-2xl font-bold text-center">
          Twitter'a Giriş Yap
        </h1>
        <GoogleButton />
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;
