import { Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import Home from "../pages/Home/Home";
import Appbar from "../components/Appbar/Appbar";
import Profile from "../pages/Profile/Profile";
import AllUsers from "../components/AllUsers/AllUsers";
import Chat from "../pages/Chat/Chat";

const Router = () => {
	const {
		modal: { isSidebarVisible }
	} = useSelector(state => state);


	return (
		<>
			<div className={isSidebarVisible ? "sidebar visible" : "sidebar"}>
				<AllUsers />
			</div>
			<Appbar />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/user/:id" element={<Profile />} />
				<Route path="/chat" element={<Chat />} />
			</Routes>
		</>
	);
};

export default Router;
