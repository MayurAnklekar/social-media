import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home/Home";
import Appbar from "../components/Appbar/Appbar";
import SinglePost from "../pages/SinglePost/SinglePost";

const Router = () => {
  return (
    <>
      <Appbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/post/:id" element={<SinglePost />} />
      </Routes>
    </>
  );
};

export default Router;
