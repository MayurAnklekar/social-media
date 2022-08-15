import React from 'react'
import { useDispatch, useSelector } from "react-redux";
import { dp } from "../../assets";

const ChatCard = ({ chat }) => {
    const { userDetails } = chat;
    const {
        message: { conversationID },
        user: { id },
    } = useSelector(state => state);

    const active = conversationID === chat._id;

    const dispatch = useDispatch();
    return (
        <article className={active ? "active chatcard" : "chatcard"}>
            <img src={userDetails.profileImage || dp} alt="" className="roundimage" />
            
        </article>
    )
}

export default ChatCard