import React, {useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { sendIcon } from "../../assets";
import "./messenger.css";

const Messenger = () => {
	const {
		message: {  conversationID },
	} = useSelector((state) => state);

	const [value, setValue] = useState("");

	const dispatch = useDispatch();


	const submitHandler = async (e) => {
		e.preventDefault();
		console.log(value)
		setValue("");
	};

	return (
		<section className="chat__page__messenger">
			{conversationID ? (
				<>
					<footer>
						<form onSubmit={submitHandler} className="flex py-3 px-4 gap-4 bg-slate-600 rounded-lg justify-between">
							<input
								type="text"
								placeholder="Type a message..."
								value={value}
								onChange={(e) => setValue(e.target.value)}
							/>
							<button type="submit" aria-label="submit">
								<img src={sendIcon} alt="send" />
							</button>
						</form>
					</footer>
				</>
			) : (
				<h4>Select a conversation</h4>
			)}
		</section>
	);
};

export default Messenger;
