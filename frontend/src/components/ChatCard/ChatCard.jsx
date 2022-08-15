import React from 'react'
import { useDispatch, useSelector } from "react-redux";
import { dp } from "../../assets";
import { clearMessage, setChatID, setMessages, setReceiverID } from "../../features/messageSlice";
import { useNavigate } from "react-router-dom";
import { fetchMessagesService } from "../../services/messageServices";
import "./chatcard.css";

const ChatCard = ({ chat }) => {
    const { userDetails } = chat;
    const {
        message: { conversationID },
        user: { id },
    } = useSelector(state => state);

    const active = conversationID === chat._id;

    const navigate = useNavigate();

    const setChat = () => {
        dispatch(setReceiverID(userDetails._id));
		dispatch(clearMessage());
		dispatch(setChatID(chat._id));
		if (window.innerWidth < 801) navigate("/chat/messenger");
		fetchMessagesService({ chatId: chat._id }).then(data => {
			dispatch(setMessages({ messages: data.messages, id }));
		});
    }

    const dispatch = useDispatch();
    return (
        <article className={active ? "active chatcard" : "chatcard"} onClick={setChat}>
            <div className="chatcard__dp">
                <img src={userDetails.profileImage || dp} alt="" className="roundimage" />
            </div>
            <div>
				<h2>{userDetails.name || "User"}</h2>
				<p>{chat.lastMessage || "Send a hi..."}</p>
			</div>
        </article>
    )
}

export default ChatCard