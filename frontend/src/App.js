import React, { useEffect } from "react";
import Cookies from "js-cookie";
import { login } from "./features/userSlice.js";
import Backdrop from "./components/Backdrop/Backdrop";
import Auth from "./pages/Auth/Auth";
import Loading from "./components/Loading/Loading";
//redux
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "./features/usersSlice.js";
import Router from "./routes";
import "./app.css";
import { setPosts } from "./features/postSlice";

const App = () => {
  const dispatch = useDispatch();

  const {
    user: { id },
    modal: { isLoading },
  } = useSelector((state) => state);

  //login
  useEffect(() => {
    const user = Cookies.get("user");
    user && dispatch(login(JSON.parse(user)));
  }, [dispatch]);

  //get users and chats and init socket

  useEffect(() => {
    if (id) {
      dispatch(setPosts());
      // const query = `id=${id}`;
      dispatch(getUsers());
    }
  }, [id, dispatch]);

  return (
    <div className={"app dark"}>
      <div className="container img">{id ? <Router /> : <Auth />}</div>
      <Backdrop show={isLoading}>
        <Loading />
      </Backdrop>
    </div>
  );
};

export default App;
