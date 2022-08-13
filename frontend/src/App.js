import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { login } from "./features/userSlice.js";
import Backdrop from "./components/Backdrop/Backdrop";
import Auth from "./pages/Auth/Auth";
import Loading from "./components/Loading/Loading";
//redux
import { useDispatch, useSelector } from "react-redux";
import Router from "./routes";

const App = () => {
  const dispatch = useDispatch();

  //login
	useEffect(() => {
		const user = Cookies.get("user");
		user && dispatch(login(JSON.parse(user)));
	}, [dispatch]);

  const {
    user: { id },
    modal: { isLoading },
  } = useSelector((state) => state);
  return (
    <div className={"app dark"}>
      <div className="container">{id ? <Router /> : <Auth />}</div>
      <Backdrop show={isLoading}>
        <Loading />
      </Backdrop>
    </div>
  );
  
};

export default App;
