import React, { useEffect, useState } from "react";
import Backdrop from './components/Backdrop/Backdrop'
import Loading from "./components/Loading/Loading";

//redux
import { useDispatch, useSelector } from "react-redux";


const App = () => {
    const dispatch = useDispatch()
    return (
        <div className={"app dark"}>
			<Backdrop show={true}>
                <Loading/>
			</Backdrop>
		</div>
    )
}

export default App