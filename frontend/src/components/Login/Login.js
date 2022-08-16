import React, { useState } from "react";
import ReactCardFlip from "react-card-flip";
import { useDispatch } from "react-redux";
import { login } from "../../features/userSlice";
import { setIsLoading } from "../../features/modalSlice";
import { loginService } from "../../services/authServices";
import { registerService } from "../../services/authServices";
import "./Login.css";

const initialForm = { name: "", password: "", email: "", dob: "" };

function Login({ setIsRegistering }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [click, setClick] = useState(false);
  const [form, setForm] = useState(initialForm);
  const dispatch = useDispatch();

  const loginHandler = async e => {
		e.preventDefault();
		dispatch(setIsLoading(true));
    try{
      const data = await loginService({email, password});
		    if (data) dispatch(login(data));
    }catch(e){
      console.log(e);
    }
		
		dispatch(setIsLoading(false));
	};

  const registerHandler = async e => {
		e.preventDefault();
		dispatch(setIsLoading(true));
    try{
      const data = await registerService(form);
		  if (data) dispatch(login(data));
    }catch(e){
      console.log(e.message);

    }
    dispatch(setIsLoading(false));
		
		
	};

  const updateForm = (key, e) => {
    setForm((form) => ({ ...form, [key]: e.target.value }));
  };

  function handleClick() {
    setClick(!click);
  }
  return (
    <ReactCardFlip isFlipped={click} flipDirection="horizontal">
      <div className="flex justify-center content-center mt-36 backdrop-blur-lg">
        <form onSubmit={loginHandler} className="flex flex-col h-[28em] md:bg-slate-700 w-[24em] rounded-md shadow-2xl ">
          <div className="flex flex-col p-7 mt-10">
            <label htmlFor="login-email" className="text-slate-200 ml-1 ">
              Email
            </label>
            <input
              required
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
              required
              minlength="6"
              id="login-password"
              placeholder="A strong one please"
              value={password}
              className="bg-slate-500 rounded-md h-12 p-2 my-2"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="flex flex-col px-7 mt-7">
            <button type="submit" className="flex justify-center content-center bg-slate-800 h-12 text-slate-200 rounded-md pt-2 text-xl">
              Login
            </button>
            <p className="text-slate-200 flex justify-center content-center mt-4 text-lg">
              Don't have an account?{" "}
              <span
                onClick={() => {
                  setIsRegistering(false);
                  handleClick();
                }}
                className="hover:cursor-pointer underline"
              >
                Register
              </span>
            </p>
          </div>
        </form>
      </div>

      <div className="flex justify-center content-center mt-20 backdrop-blur-lg">
        <form onSubmit={registerHandler} className="flex flex-col h-[38em] md:bg-slate-700 w-[24em] rounded-md  shadow-2xl ">
          <div className="flex flex-col p-7 mt-10">
            <label htmlFor="login-email" className="text-slate-200 ml-1">
              Email
            </label>
            <input
              type="email"
              id="login-email"
              placeholder="johndoe@example.com"
              className="bg-slate-500 rounded-md h-12 p-2 mt-2"
              value={form.email}
              required
              onChange={(e) => updateForm("email", e)}
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
              minlength="2"
              className="bg-slate-500 rounded-md h-12 p-2 "
              value={form.name}
              required
              onChange={(e) => updateForm("name", e)}
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
              required
              value={form.dob}
              onChange={(e) => updateForm("dob", e)}
            />
          </div>

          <div className="flex flex-col px-7 mt-4">
            <label htmlFor="login-email" className="text-slate-200 ml-1">
              Password
            </label>
            <input
              type="password"
              id="login-password"
              minlength="6"
              placeholder="A strong one please"
              className="bg-slate-500 rounded-md h-12 p-2 my-2"
              required
              value={form.password}
              onChange={(e) => updateForm("password", e)}
            />
          </div>

          <div className="flex flex-col px-7 mt-3">
            <button type="submit" className="flex justify-center content-center bg-slate-800 h-12 text-slate-200 rounded-md pt-2 text-xl">
              Register
            </button>
            <p className="text-slate-200 flex justify-center content-center mt-4 text-lg">
              Aready have an account?{" "}
              <span
                onClick={() => {
                  setIsRegistering(true);
                  handleClick();
                }}
                className="hover:cursor-pointer underline"
              >
                {" "}
                Login
              </span>
            </p>
          </div>
        </form>
      </div>
    </ReactCardFlip>
  );
}

export default Login;
