import React, { useState } from "react";
import Login from "../../components/Login/Login";
// import Register from "../Register/Register";
import "./auth.css";

function Auth() {
  const [isRegistering, setIsRegistering] = useState(true);

  return (
    <div>
      <div className="flex lg:flex-row justify-center lg:justify-around">
        <img
          src={require("../../components/images/camera.jpeg")}
          alt="camera img"
          className="object-contain h-screen rounded-tl-[400px] rounded-br-[110px] shadow-xl img"
        />

        <Login setIsRegistering={setIsRegistering} />

        {/* {isRegistering ? (
          <Login setIsRegistering={setIsRegistering} setClick={setClick} />
        ) : (
          <Register setIsRegistering={setIsRegistering} />
        )} */}

        {/* <Register setIsRegistering={setIsRegistering} /> */}
      </div>
    </div>
  );
}

export default Auth;
