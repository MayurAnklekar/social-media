import React from "react";
// import Backdrop from "./components/Backdrop/Backdrop";
import Auth from "./components/Auth/Auth";

const App = () => {
  return (
    <div className={"app "}>
      {/* <Backdrop show={true}>
			</Backdrop> */}
      <div>
        <Auth />
      </div>
    </div>
  );
};

export default App;
