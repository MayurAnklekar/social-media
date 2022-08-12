
import React from "react";
import Backdrop from "./components/Backdrop/Backdrop";
import Auth from "./components/Auth/Auth";
import Loading from "./components/Loading/Loading";
//redux
import { useDispatch, useSelector } from "react-redux";

const App = () => {
  return (
    <div className={"app dark"}>
      <Backdrop show={true}>
         <Loading/>
			</Backdrop>
      <div>
        <Auth />
      </div>
    </div>
  );
};


export default App;