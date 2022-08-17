import React, { useEffect } from "react";
import Cookies from "js-cookie";
import { login } from "./features/userSlice.js";
import Backdrop from "./components/Backdrop/Backdrop";
import Auth from "./pages/Auth/Auth";
import { setSocket } from "./features/socketSlice";
import Loading from "./components/Loading/Loading";
//redux
import { addMessages } from "./features/messageSlice.js";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "./features/usersSlice.js";
import Router from "./routes";
import "./app.css";
import SERVER_URI from "./serverUri";
import { setPosts } from "./features/postSlice";
import { io } from "socket.io-client";
import { addOnline } from "./features/usersSlice.js";

const App = () => {
  const dispatch = useDispatch();

  const {
    user: { id },
    socket: { socket },
    modal: { isLoading },
    message: { to, conversationID },
  } = useSelector((state) => state);

  //login
  useEffect(() => {
    const user = Cookies.get("user");
    user && dispatch(login(JSON.parse(user)));
  }, [dispatch]);

  //get users and chats and init socket

  useEffect(() => {
    if (id) {
      const query = `id=${id}`;
      dispatch(getUsers());
      dispatch(setPosts());
      dispatch(setSocket(io(SERVER_URI, { query })));
    }
  }, [id, dispatch]);

  useEffect(() => {
    if (socket) {
      socket
        .off("receive message")
        .on("receive message", (message, senderID) => {
          senderID === to && dispatch(addMessages({ text: message }));
        });
    }
  }, [dispatch, socket, to, conversationID]);

  useEffect(() => {
    if (socket) {
      socket.on("usersOnline", (users) => dispatch(addOnline(users)));
    }
  }, [socket, dispatch]);

  return (
    <div className={"app dark"}>
      {id ? (
        <div className="container ">
          <Router />
        </div>
      ) : (
        <div className="container img">
          <Auth />
        </div>
      )}

      <Backdrop show={isLoading}>
        <Loading />
      </Backdrop>
    </div>
  );
};

export default App;
