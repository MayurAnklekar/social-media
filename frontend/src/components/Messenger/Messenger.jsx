import React, {useState, useRef, useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { sendIcon } from "../../assets";
import { addMessages, clearMessage } from "../../features/messageSlice";
import { dp } from "../../assets";
import "./messenger.css";

const Messenger = ({chats}) => {
	
	const {
		user: { id },
		message: { messages, conversationID, to },
		socket: { socket },
	} = useSelector(state => state);

	const scroll = useRef();

	useEffect(() => {
		if (scroll.current) scroll.current.scrollTop = scroll.current.scrollHeight;
	}, [messages]);

	
	const [value, setValue] = useState("");
	

	const dispatch = useDispatch();

	const userDetails = chats?.find(chat => chat._id === conversationID)?.userDetails || {};

	const submitHandler = async (e) => {
		e.preventDefault();
		const message = value.trim();
		socket.emit("send message", message, to, conversationID, id);
		dispatch(addMessages({ text: message, send: true }));
		setValue("");
	};

	const getTime = (message) => {
		const createdAt = new Date(message.createdAt);
		return `${createdAt.getHours()}:${
			createdAt.getMinutes() > 9 ? createdAt.getMinutes() : "0" + createdAt.getMinutes()
		}`;
	};

	return (
		<section className="chat__page__messenger">
			{conversationID ? (
				<>
					<header>
						<img src={userDetails?.profileImage || dp} alt="chatIcon" className="chat__page__dp" />
						<div>
							<h3>{userDetails?.name}</h3>
						</div>
					</header>
					<main ref={scroll}>
						<div className="messenger">
							{messages.map((message, i)=>{
								return (
									<div key={i} className={message.send ? "chat__sent" : "chat__recieve"}>
										<p className="message">{message.text}
										<span className="time">{getTime(message)}</span>
										</p>
									</div>
								)
							})}
						</div>
					</main>
					<footer>
						<form onSubmit={submitHandler} className="flex py-3 px-4 gap-4 bg-slate-600 rounded-lg justify-between">
							<input
								type="text"
								className="w-full"
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
