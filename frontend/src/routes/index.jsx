import { useDispatch, useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import Home from '../pages/Home/Home'


const Router = () => {
	return (
		<>
			<Routes>
				<Route path="/" element={<Home />} />
			</Routes>
		</>
	);
};

export default Router;