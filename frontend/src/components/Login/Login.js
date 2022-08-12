import React, { useState } from "react";

function Login({ setIsRegistering }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <div className="flex justify-center content-center ">
      <form className="flex flex-col h-[28em] bg-slate-700 w-[24em] rounded-md mt-36">
        <div className="flex flex-col p-7 mt-10">
          <label htmlFor="login-email" className="text-slate-200 ml-1">
            Email
          </label>
          <input
            type="email"
            id="login-email"
            placeholder="johndoe@example.com"
            value={email}
            className="bg-slate-500 rounded-md h-12 p-2 my-2"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="flex flex-col px-7 ">
          <label htmlFor="login-email" className="text-slate-200 ml-1">
            Password
          </label>
          <input
            type="password"
            id="login-password"
            placeholder="A strong one please"
            value={password}
            className="bg-slate-500 rounded-md h-12 p-2 my-2"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="flex flex-col px-7 mt-7">
          <button className="flex justify-center content-center bg-slate-800 h-12 text-slate-200 rounded-md pt-2 text-xl">
            Login
          </button>
          <p className="text-slate-200 flex justify-center content-center mt-4 text-lg">
            Don't have an account?{" "}
            <span
              onClick={() => setIsRegistering(false)}
              className="hover:cursor-pointer underline"
            >
              Register
            </span>
          </p>
        </div>
      </form>
    </div>
  );
}

export default Login;
