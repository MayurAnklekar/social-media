import React, { useState } from "react";

function Register({ setIsRegistering }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <div className="flex justify-center content-center ">
      <form className="flex flex-col h-[38em] bg-slate-700 w-[24em] rounded-md mt-20">
        <div className="flex flex-col p-7 mt-10">
          <label htmlFor="login-email" className="text-slate-200 ml-1">
            Email
          </label>
          <input
            type="email"
            id="login-email"
            placeholder="johndoe@example.com"
            className="bg-slate-500 rounded-md h-12 p-2 mt-2"
          />
        </div>

        <div className="flex flex-col px-7 ">
          <label htmlFor="login-email" className="text-slate-200 ml-1">
            Username
          </label>
          <input
            type="username"
            id="login-password"
            placeholder="john doe"
            className="bg-slate-500 rounded-md h-12 p-2 "
          />
        </div>

        <div className="flex flex-col px-7 mt-4">
          <label htmlFor="login-email" className="text-slate-200 ml-1">
            Date of birth
          </label>
          <input
            type="date"
            id="dob"
            placeholder="john doe"
            className="bg-slate-500 rounded-md h-12 p-2 my-2 text-slate-400"
          />
        </div>

        <div className="flex flex-col px-7 mt-4">
          <label htmlFor="login-email" className="text-slate-200 ml-1">
            Password
          </label>
          <input
            type="password"
            id="login-password"
            placeholder="A strong one please"
            className="bg-slate-500 rounded-md h-12 p-2 my-2"
          />
        </div>

        <div className="flex flex-col px-7 mt-3">
          <button className="flex justify-center content-center bg-slate-800 h-12 text-slate-200 rounded-md pt-2 text-xl">
            Register
          </button>
          <p className="text-slate-200 flex justify-center content-center mt-4 text-lg">
            Aready have an account?{" "}
            <span
              onClick={() => setIsRegistering(true)}
              className="hover:cursor-pointer underline"
            >
              {" "}
              Login
            </span>
          </p>
        </div>
      </form>
    </div>
  );
}

export default Register;
