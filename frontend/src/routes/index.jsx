import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home/Home";
import Appbar from "../components/Appbar/Appbar";
import Profile from "../pages/Profile/Profile";

const Router = () => {
	return (
		<>
			<Appbar />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/user/:id" element={<Profile />} />
			</Routes>
		</>
	);
};

export default Router;
