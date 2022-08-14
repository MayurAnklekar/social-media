import React from 'react';
import { useSelector } from 'react-redux';
import ChatCard from '../../components/ChatCard/ChatCard';
import './chat.css';

const Chat = () => {
	const {
		message: { chats },
	} = useSelector(state => state);

	return (
		<main className='chat__page'>
			<section className='chat__page__cards'>
				{chats.map(chat => (
					<ChatCard chat={chat} key={chat._id} />
				))}
			</section>
		</main>
	);
};

export default Chat;
