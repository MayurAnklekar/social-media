import React from "react";
import Loading from '../Loading/Loading';
import "./Backdrop.module.css";

const Backdrop = ({ children, show, onClose = () => {} }) => {
	const closeModal = e => {
		const isBackdrop = e.target.firstChild?.classList?.contains("backdrop__content");
		if (isBackdrop) onClose();
	};
	return (
		<div className={show ? "backdrop show" : "backdrop"} onClick={closeModal}>
			<div className="backdrop__content gradient-border">
                <Loading show={show}/>
            </div>
		</div>
	);
};

export default Backdrop;
