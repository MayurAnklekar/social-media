import { useDispatch, useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home/Home";
import Appbar from "../components/Appbar/Appbar";

const Router = () => {
  return (
    <>
      <Appbar />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </>
  );
};

export default Router;
